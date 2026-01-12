import { getImageById } from "@/lib/server/managers/ImageManager"

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = await params

  if (!id) {
    return new Response(JSON.stringify({ error: 'Missing id' }), { 
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  const image = getImageById(id)

  if (!image) {
    return new Response(JSON.stringify({ error: 'Image not found' }), { 
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  const buffer = typeof image === 'string' 
    ? Buffer.from(image.replace(/^data:image\/\w+;base64,/, ""), 'base64') 
    : image;

  return new Response(buffer, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}