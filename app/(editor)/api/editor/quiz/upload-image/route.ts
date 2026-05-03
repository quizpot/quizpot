import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { createHash } from 'crypto';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { s3Client } from '@/lib/s3';

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const hash = createHash('sha256').update(buffer).digest('hex');
    
    const bucketName = process.env.S3_BUCKET_NAME ?? 'quiz-images';
    const key = `${hash}-${file.name.replace(/\s+/g, '_')}`;

    await s3Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: buffer,
        ContentType: file.type,
      })
    );

    const publicBase = process.env.NEXT_PUBLIC_S3_PUBLIC_URL || 'http://localhost:8333';
    const url = `${publicBase}/${bucketName}/${key}`;

    return NextResponse.json({ hash, url }, { status: 201 });

  } catch (error) {
    console.error('Upload Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload failed' }, 
      { status: 500 }
    );
  }
}