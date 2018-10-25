import UserController from "./components/User-Controller.js";

class App {
  constructor() {
    this.controllers = {
      user: new UserController()
    }
  }
}

//@ts-ignore
window.app = new App();