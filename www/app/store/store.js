import User from "../models/User.js";


//store singleton
let store;

//program state data
let state = {
  user: {},
  boards: []
}

//routers
//@ts-ignore
const auth = axios.create({
  baseURL: "//localhost:3000/auth",
  timeout: 3000
})
//@ts-ignore
const api = axios.create({
  baseURL: "//localhost:3000/api",
  timeout: 3000
})

//private function to set state properties
function setState(prop, data) {
  state[prop] = data;
  console.log(state);
}

export default class Store {
  //singleton constructor
  constructor() {
    if (store) {
      return store
    }
    store = this
  }

  //return a copy of the state object
  get state() {
    return { ...state }
  }

  //USER METHODS

  //register new user
  register(creds, setUserStatus, drawButtons, drawForm) {
    auth.post('/register', creds)
      .then(res => {
        setState('user', res.data)
        setUserStatus(true)
        drawButtons()
        drawForm()
      })
      .catch(err => console.log(err))
  }

  login(creds, setUserStatus, drawButtons, drawForm) {
    auth.post('/login', creds)
      .then(res => {
        setState('user', res.data)
        setUserStatus(true)
        drawButtons()
        drawForm()
      })
      .catch(err => console.log(err))
  }

  authenticate(setUserStatus, drawButtons, drawForm) {
    auth.get('/authenticate')
      .then(res => {
        setState('user', res.data)
        setUserStatus(true)
        drawButtons()
        drawForm()
      })
      .catch(err => {
        console.log(err)
        drawButtons()
      })
  }

  logout(setUserStatus, drawButtons, drawForm) {
    auth.delete('/logout')
      .then(res => {
        setState('user', {})
        setUserStatus(false)
        drawButtons()
        drawForm()
      })
      .catch(err => console.log(err))
  }

  //board methods
  getBoards(drawBoards) {
    api.get('/boards')
      .then(res => {
        setState('boards', res.data)
        drawBoards()
      })
      .catch(err => console.error(err))
  }

  createBoard(newBoard, drawBoards) {
    api.post('/boards', newBoard)
  }
}