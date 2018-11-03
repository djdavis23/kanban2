import UserController from "./components/User-Controller.js";
import BoardController from "./components/Board-Controller.js";

class App {
  constructor() {
    this.controllers = {
      user: new UserController(),
      board: new BoardController()
    }
  }
}

//@ts-ignore
window.app = new App();