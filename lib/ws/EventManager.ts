import { WebSocketClient } from "@/lib/managers/WSClientManager"
import { handleQuizUpload } from "./HostHandlers"

interface HandlerContext {
  client: WebSocketClient
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ctx: any
}

// A dictionary to store our handlers, mapping event names to a list of functions
const handlers: { [key: string]: ((context: HandlerContext) => void)[] } = {}

/**
 * Registers a handler for a specific message type.
 * @param eventName The 'type' of the message to listen for.
 * @param handler The function to execute when the message is received.
 */
export function onEvent(eventName: string, handler: (ctx: HandlerContext) => void) {
  if (!handlers[eventName]) {
    handlers[eventName] = []
  }

  handlers[eventName].push(handler)
}

/**
 * Executes all handlers registered for a given event name.
 * @param eventName The 'type' of the message that was received.
 * @param ctx The data to pass to the handlers (client, payload, etc.).
 */
export function emitEvent(eventName: string, ctx: HandlerContext) {
  if (handlers[eventName]) {
    handlers[eventName].forEach(handler => handler(ctx))
  }
}

/**
 * Sends a structured message to a specific WebSocket client.
 *
 * @param client The WebSocketClient instance to send the message to.
 * @param event The event (e.g., 'lobbyCreated', 'quizUpdate').
 * @param ctx The data to be sent with the message.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function sendEvent(client: WebSocketClient, event: string, ctx: any) {
  if (!client || client.readyState !== WebSocket.OPEN) {
    console.warn(`Attempted to send message to a closed or non-existent client. Event: ${event}`)
    return
  }

  // Structure the message object with 'type' and 'payload'
  const message = JSON.stringify({
    event,
    ctx,
  })

  client.send(message)
}

let isInitialized = false

export function initializeServerEventHandlers() {
  if (isInitialized) return

  // Register the quiz upload handler
  onEvent('quizUpload', handleQuizUpload)

  console.log("✅ Server-side WebSocket event handlers initialized.")
  isInitialized = true
}