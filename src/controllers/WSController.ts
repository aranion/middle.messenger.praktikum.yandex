import store, { MessageState } from '../store'
import { WSEvent, WSTransport } from '../utils/WSTransport'

class WSController {
  private sockets: Map<number, WSTransport> = new Map()

  async connect(chatId: number, token: string) {
    const { settings } = store.getState()

    if (this.sockets.has(chatId)) {
      return
    }

    if (!settings.user) {
      throw new Error("WS:connect - 'settings.user' empty")
    }

    const userId = settings.user.id

    const wSTransport = new WSTransport(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`)

    this.sockets.set(chatId, wSTransport)

    await wSTransport.connect()

    this.subscribe(wSTransport, chatId)
    this.fetchOldMessage(chatId)
  }

  sendMEssage(chatId: number, message: string) {
    const socket = this.sockets.get(chatId)

    if (!socket) {
      throw new Error(`Chat id=${chatId} is not connected`)
    }

    socket.send({
      type: 'message',
      content: message
    })
  }

  fetchOldMessage(chatId: number) {
    const socket = this.sockets.get(chatId)

    if (!socket) {
      throw new Error(`Chat id=${chatId} is not connected`)
    }

    socket.send({
      type: 'get old',
      content: '0'
    })
  }

  private onMessage(chatId: number, messages: MessageState | MessageState[]) {
    let messagesToAdd: MessageState[] = []

    if (Array.isArray(messages)) {
      messagesToAdd = messages.reverse()
    } else {
      messagesToAdd.push(messages)
    }

    const currentMessages = (store.getState().messenger.messages || {})[chatId] || []

    messagesToAdd = [...currentMessages, ...messagesToAdd]

    store.set('messenger', { messages: { [chatId]: messagesToAdd } })
  }

  private onClose(chatId: number) {
    this.sockets.delete(chatId)
  }

  private subscribe(transport: WSTransport, chatId: number) {
    transport.on(WSEvent.message, (message: MessageState | MessageState[]) => this.onMessage(chatId, message))
    transport.on(WSEvent.close, () => this.onClose(chatId))
  }
}

export default new WSController()
