import { ClientRooms, ServerRooms } from './rooms'

export * from './rooms'

export type AnyClientMessage = ClientRooms.AnyMessage // @TODO: add all
export type AnyServerMessage = ServerRooms.AnyMessage // @TODO: add all
