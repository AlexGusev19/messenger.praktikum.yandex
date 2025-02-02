const WSHost = 'wss://ya-praktikum.tech';

export class WebSocketTransport {
  intervalID: number;

  socket;

  constructor(userId: string, chatId: string, token: string) {
    this.socket = new WebSocket(
      `${WSHost}/ws/chats/${userId}/${chatId}/${token}`,
    );
    this.addEvents();
    this.getPing(15000);
  }

  sendMessage(message: string) {
    const data = {
      content: message,
      type: 'message',
    };

    this.socket.send(JSON.stringify(data));
  }

  getLastMessages() {
    const data = {
      content: '0',
      type: 'get old',
    };

    this.socket.send(JSON.stringify(data));
  }

  getPing(timer: number) {
    const data = {
      type: 'ping',
    };

    this.intervalID = setInterval(() => {
      this.socket.send(JSON.stringify(data));
    }, timer);
  }

  addEvents() {
    this.socket.addEventListener('open', () => {
      console.log('Соединение установлено');
    });

    this.socket.addEventListener('close', (event) => {
      if (event.wasClean) {
        console.log('Соединение закрыто чисто');
      } else {
        console.log('Обрыв соединения');
      }

      console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    });

    this.socket.addEventListener('message', (event) => {
      console.log('Получены данные', event.data);
    });

    this.socket.addEventListener('error', (event) => {
      console.log('Ошибка', event.message);
    });
  }
}
