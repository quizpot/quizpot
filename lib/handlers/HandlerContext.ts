/* eslint-disable @typescript-eslint/no-explicit-any */
import { WebSocketClient } from "../managers/WSClientManager"

export interface HandlerContext {
  client: WebSocketClient
  ctx: any
}