"use client"
import React from 'react'
// import NumberInput from '../ui/NumberInput'
// import { useWebSocket } from '../ws/WebSocket'
// import { useLobby } from '../host/LobbyProvider'

const JoinLobbyInput = () => {
  return <>Fix websocket implementation</>

  // const [code, setCode] = React.useState<number>(0)
  // const { ws } = useWebSocket()
  // const lobby = useLobby()

  // if (!ws) return <></>

  // return (
  //   <>
  //     <NumberInput onChange={(e) => {
  //       setCode(parseInt(e.target.value))
  //     }} value={code} />
  //     <button onClick={() => {
  //       console.log('[JoinLobbyInput] Joining lobby with code:', code)
  //       ws.send(JSON.stringify({
  //         type: 'lobbyJoin',
  //         code
  //       }))

  //       ws.onmessage = (event) => {
  //         const content = JSON.parse(event.data)

  //         if (content.type === 'lobbyJoined') {
  //           console.log("[JoinLobbyInput] Joined lobby with code:", content.code)
  //           lobby.setCode(content.code)
  //         }
  //       }
  //     }}>Join</button>
  //   </>
  // )
}

export default JoinLobbyInput