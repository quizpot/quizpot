import { WebSocketClient } from "@/lib/server/managers/WSClientManager"
import { handlePlayerKick, handleCreateLobby, handleStartLobby } from "../handlers/HostHandlers"
import { handleJoinLobby, handlePlayerSync } from "../handlers/PlayerHandlers"
import { handleQuestionAnswer } from "../handlers/GameHandler"
import { ServerEvents } from "../ServerEvents"
import { ClientEvents } from "@/lib/client/ClientEvents"

interface HandlerContext<T extends keyof ClientEvents> {
  client: WebSocketClient
  ctx: ClientEvents[T]
}

// A dictionary to store our handlers, mapping event names to a list of functions
const handlers: { [K in keyof ClientEvents]?: ((context: HandlerContext<K>) => void)[] } = {}

/**
 * Registers a handler for a specific message type.
 * @param eventName The 'type' of the message to listen for.
 * @param handler The function to execute when the message is received.
 */
export function onEvent<T extends keyof ClientEvents>(eventName: T, handler: (ctx: HandlerContext<T>) => void) {
  if (!handlers[eventName]) {
    handlers[eventName] = []
  }

  // Use a type assertion here because TypeScript can't infer the generic relationship
  (handlers[eventName] as ((context: HandlerContext<T>) => void)[]).push(handler)
}

/**
 * Executes all handlers registered for a given event name.
 * @param eventName The 'type' of the message that was received.
 * @param ctx The data to pass to the handlers (client, payload, etc.).
 */
export function emitEvent<T extends keyof ClientEvents>(eventName: T, ctx: HandlerContext<T>) {
  if (handlers[eventName]) {
    (handlers[eventName] as ((context: HandlerContext<T>) => void)[]).forEach(handler => handler(ctx))
  }
}

/**
 * Sends a structured message (that can be JSON serialized) to a specific WebSocket client.
 *
 * @param client The WebSocketClient instance to send the message to.
 * @param event The event (e.g., 'lobbyCreated', 'quizUpdate').
 * @param ctx The data to be sent with the message. Don't send websocket clients because they can't be JSON serialized!
 */
export function sendEvent<T extends keyof ServerEvents>(client: WebSocketClient, event: T, ctx: ServerEvents[T]) {
  if (!client || client.readyState !== WebSocket.OPEN) {
    console.warn(`Attempted to send message to a closed or non-existent client. Event: ${event} ID: ${client?.id}`)
    return
  }

  try {
    const message = JSON.stringify({
      event,
      ctx,
    })

    client.send(message)
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('circular structure to JSON')) {
      console.error('Circular reference detected in sendEvent:', { event, ctx })
    } else {
      console.error('An unexpected error occurred during JSON serialization:', error)
    }
  }
}

let isInitialized = false

/**
 * Initializes the server-side WebSocket event handlers.
 */
export function initializeServerEventHandlers() {
  if (isInitialized) return

  onEvent('createLobby', handleCreateLobby)
  onEvent('joinLobby', handleJoinLobby)
  onEvent('playerKick', handlePlayerKick)
  onEvent('startLobby', handleStartLobby)
  //onEvent('syncPlayer', handlePlayerSync) deprecated
  onEvent('submitAnswer', handleQuestionAnswer)

  isInitialized = true
  console.log("✅ Server-side WebSocket event handlers initialized.")
}