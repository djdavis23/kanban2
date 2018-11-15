import Store from "../store/store.js"

let store = new Store()

const userForm = document.getElementById('header-right')
const userButtons = document.getElementById('header-left')
var newUser = null;
var loggedIn = false;

function drawHeaderLeft() {
  let template

  if (!loggedIn) {
    //Draw User login and register buttons
    template = `
      <button onClick="app.controllers.user.showLogin()" class="btn btn-secondary">Login</button>
      <button onClick="app.controllers.user.showRegister()" class="btn btn-secondary">Register</button>
  `
  }
  else {
    //draw logout button
    template = `
     <button onClick="app.controllers.user.logout()" class="btn btn-danger">Logout</button>
    `
  }
  userButtons.innerHTML = template

}

function drawHeaderRight() {
  let template

  if (loggedIn) {
    //draw board buttons
    template = `
     <div class="row">
      <div class="col-8"></div>
      <div class="col-4">
        <h3 class="text-white mt-2">Welcome ${store.state.user.userName}!</h3>
        <button onClick="app.controllers.board.getBoards()" class="btn btn-secondary mt-1">Retrieve Boards</button>
        <button class="btn btn-secondary mt-1" type="button" data-toggle="modal" data-target="#newBoardModal">Create Board</button>
      </div>
     </div>
    `
  }
  else if (newUser == null) {
    //leave blank if no action selected
    template = ""
  }

  else if (newUser) {
    //draw register form for a new user
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
    //draw login form for a new user
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

function setUserStatus(status) {
  loggedIn = status
}

export default class UserController {

  constructor() {
    store.authenticate(setUserStatus, drawHeaderLeft, drawHeaderRight)
  }

  showLogin() {
    newUser = false
    drawHeaderRight();
  }

  showRegister() {
    newUser = true
    drawHeaderRight()
  }

  register(e) {
    e.preventDefault()
    if (e.target.password.value != e.target.password2.value) {
      alert("Password entries do not match")
      return;
    }
    store.register({
      userName: e.target.userName.value,
      email: e.target.email.value,
      password: e.target.password.value
    }, setUserStatus, drawHeaderLeft, drawHeaderRight)
    // e.target.reset()
  }

  login(e) {
    e.preventDefault()
    store.login({
      email: e.target.email.value,
      password: e.target.password.value
    }, setUserStatus, drawHeaderLeft, drawHeaderRight)
    //console.log(e.target.email.value, e.target.password.value)

  }

  logout() {
    store.logout(setUserStatus, drawHeaderLeft, drawHeaderRight);
    newUser = null;
    document.getElementById('main-content').innerHTML = ""
    document.getElementById('detail-pane').innerHTML = ""

    console.log("logging out")
  }
}