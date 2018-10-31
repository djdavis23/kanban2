import Store from "../store/store.js"

let store = new Store()

const loginForm = document.getElementById('user-form')
var newUser = true;

function drawUserForm() {

}

export default class UserController {

  showLogin() {
    newUser = false
    drawUserForm();
  }
}