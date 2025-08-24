/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Logs a message to the console only in development mode
 * @param id Identifier of the log (Ex: LobbyManager)
 * @param message Content of the log
 */
export function devLog(id: string, ...message: any[]) {
  if (process.env.NODE_ENV !== 'development') return
  console.log(`[${id}]`, ...message)
}

/**
 * Logs a message to the console in production mode
 * @param id Identifier of the log (Ex: LobbyManager)
 * @param message Content of the log
 */
export function prodLog(id: string, ...message: any[]) {
  if (process.env.NODE_ENV === 'development') return
  console.log(`[${id}]`, ...message)
}

/**
 * Logs a message to the console
 * @param id Identifier of the log (Ex: LobbyManager)
 * @param message Content of the log
 */
export function log(id: string, ...message: any[]) {
  console.log(`[${id}]`, ...message)
}