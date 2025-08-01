import { randomUUID } from "crypto"

export interface WebSocketClient extends WebSocket {
  id: string
}

/**
 * Persist wsclients in globalThis to avoid Next.js trickery
 */
if (!globalThis.wsClientManager) {
  globalThis.wsClientManager = {
    wsclients: new Map<string, WebSocketClient>(),
  }
}

const wsclients = globalThis.wsClientManager.wsclients

/**
 * Get the number of connected clients
 * @returns number of connected clients
 */
export const getWSClientsSize = () => wsclients.size

/**
 * Get a client by id
 * @param id id of the client
 * @returns client with the given id
 */
export const getWSClientById = (id: string) => wsclients.get(id)

/**
 * Creates a client and adds it to the manager
 * @param ws websocket of this client
 * @returns created client
 */
export const createWSClient = (ws: WebSocket): WebSocketClient => {
  const client = Object.assign(ws, { id: randomUUID() })
  wsclients.set(client.id, client)
  return client
}

/**
 * Safely deletes a client from the manager
 * @param ws websocket of the client to delete
 */
export const deleteWSClient = (ws: WebSocketClient) => {
  wsclients.delete(ws.id)
}