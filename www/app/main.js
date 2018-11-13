import UserController from "./components/User-Controller.js";
import BoardController from "./components/Board-Controller.js";
import ListController from "./components/List-Controller.js";

class App {
  constructor() {
    this.controllers = {
      user: new UserController(),
      board: new BoardController(),
      list: new ListController()
    }
  }
}

//@ts-ignore
window.app = new App();