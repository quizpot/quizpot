import { QuizFile } from "@/lib/QuizFile"
import { createLobby, deleteLobby, LobbySettings } from "@/lib/server/managers/LobbyManager"
import { getWSClientById } from "@/lib/server/managers/WSClientManager"

interface RequestBody { 
  clientId: string, 
  settings: LobbySettings, 
  quizFile: QuizFile 
}

export async function POST(req: Request) {
  const { clientId, settings, quizFile }: RequestBody = await req.json()

  if (!clientId || !quizFile) return new Response(JSON.stringify({ error: 'Missing clientId or quizFile' }), { status: 400 })

  const client = getWSClientById(clientId)

  if (!client) return new Response(JSON.stringify({ error: 'Client not connected' }), { status: 400 })

  try {
    let parsedQuizFile = quizFile;

    if (typeof quizFile === 'string') {
      try {
        parsedQuizFile = JSON.parse(quizFile);
      } catch (e) {
        return new Response(JSON.stringify({ error: 'Invalid JSON format in quizFile' }), { status: 400 });
      }
    }

    const lobby = await createLobby(client, parsedQuizFile, settings)

    return new Response(JSON.stringify({ 
      code: lobby,
      totalQuestions: parsedQuizFile.questions.length,
      theme: parsedQuizFile.theme,
      settings: settings
    }), { 
      status: 200, 
      headers: { 
        'Content-Type': 'application/json' 
      } 
    })
  } catch (e) {
    deleteLobby(client, 'Error creating lobby')

    let message = "Unknown error: Create Lobby Route"

    if (e instanceof Error) message = e.message

    return new Response(JSON.stringify({ error: message }), { status: 400, headers: { 'Content-Type': 'application/json' } })
  }
}    