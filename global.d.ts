declare global {
  // eslint-disable-next-line no-var
  var wsClientManager: {
    wsclients: Map<string, WebSocketClient>
  }
}

export {}