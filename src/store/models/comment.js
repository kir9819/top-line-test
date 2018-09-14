export class Comment {
  constructor(text) {
    this.text = text;
    this.id = Comment.getId().toString();
  }

  static getId() {
    let count = 0;
    this.getId = () => {
      count += 1;
      return count;
    };
    count += 1;
    return count;
  }
}

export function WS(dispatch) {
  if (typeof WS.instance === 'object') {
    return WS.instance;
  }

  const instance = this;
  this.connected = false;
  this.queue = [];

  this.connection = new WebSocket('wss://echo.websocket.org');

  this.connection.onopen = () => {
    this.connected = true;
    this.queue.forEach((element) => {
      this.delete(element);
    });
    this.queue = [];
  };

  this.connection.onmessage = (event) => {
    dispatch('confirmDelete', event.data);
  };

  this.connection.onerror = (error) => {
    dispatch('errorDelete', error.message);
  };

  this.delete = (id) => {
    if (!this.connected) {
      this.queue.push(id);
    } else {
      this.connection.send(id);
    }
  };
  return instance;
}
