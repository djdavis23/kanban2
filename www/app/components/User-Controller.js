import Store from "../store/store.js"

let store = new Store()

const userForm = document.getElementById('user-form')
const userButtons = document.getElementById('user-buttons')
var newUser = null;
var loggedIn = false;

function drawUserButtons() {
  let template

  if (!loggedIn) {
    template = `
      <button onClick="app.controllers.user.showLogin()">Login</button>
      <button onClick="app.controllers.user.showRegister()">Register</button>
  `
  }
  else {
    template = `
     <button onClick="app.controllers.user.logout()">Logout</button>
    `
  }
  userButtons.innerHTML = template

}

function drawUserForm() {
  let template
  if (newUser == null) {
    template = ""
  }
  else if (loggedIn) {
    template = `
      <h2 class="text-white">Welcome User!</h2>
    `
  }
  else if (newUser) {
    template = `
    <form onSubmit="app.controllers.user.register(event)" class="mt-4">
      <form-group class="row">
        <div class="col">
          <input type="text" class="form-control" name="userName" placeholder="User Name" required>
        </div>
        <div class="col">
          <input type="email" class="form-control" name="email" placeholder="Email" required>
        </div>
        <div class="col">
          <input type="password" class="form-control" name="password" placeholder="Enter password" required>
        </div>
        <div class="col">
          <input type="password" class="form-control" name="password2" placeholder="Confirm password" required>
        </div>
        <div class="col-2">
          <button class="mt-1" type="submit">Submit</button>
        </div>
      </form-group>
    </form>
    `
  }
  else {
    template = `
    <form onSubmit="app.controllers.user.login(event)" class="mt-4">
      <form-group class="row">    
        <div class="col offset-3">
          <input type="email" class="form-control" name="email" placeholder="Email" required>
        </div>
        <div class="col">
          <input type="password" class="form-control" name="password" placeholder="Enter password" required>
        </div>   
        <div class="col-2">
          <button class="mt-1" type="submit">Submit</button>
        </div>
      </form-group>
    </form>
  `
  }
  userForm.innerHTML = template
}

export default class UserController {

  constructor() {
    drawUserButtons()
  }

  showLogin() {
    newUser = false
    drawUserForm();
  }

  showRegister() {
    newUser = true
    drawUserForm()
  }

  register(e) {
    e.preventDefault()
    loggedIn = true//only if register is successful
    drawUserButtons()
    drawUserForm()
    console.log(e.target.email.value, e.target.password.value)
    e.target.reset()//what is the correct command
  }

  login(e) {
    e.preventDefault()
    loggedIn = true//only do this if login successful
    console.log(e.target.email.value, e.target.password.value)
    drawUserButtons()
    drawUserForm()
    e.target.reset()//what is the correct command
  }

  logout() {
    loggedIn = false;
    newUser = null;
    drawUserButtons()
    drawUserForm()
    console.log("logging out")
  }
}