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
  state.prop = data;
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
}