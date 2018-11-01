import User from "../models/User.js";


//store singleton
let store;

//program state data
let state = {
  user: {}
}

//routers
//@ts-ignore
let auth = axios.create({
  baseURL: "//localhost:3000/auth",
  timeout: 3000
})
//@ts-ignore
let api = axios.create({
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
}