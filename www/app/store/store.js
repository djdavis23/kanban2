import User from "../models/User.js";


//store singleton
let store;

//program state data
let state = {
  user: {},
  boards: [],
  activeBoard: {},
  activeLists: [],
  activeTasks: {}
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

//private functions to set state properties
function setState(prop, data) {
  state[prop] = data;
  console.log(state);
}

function addActiveTask(listId, tasks) {
  state.activeTasks[listId] = tasks
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
        setState('activeBoard', {})
        setState('activeLists', [])
        setState('activeTasks', {})
        drawBoards()
      })
      .catch(err => console.error(err))
  }

  createBoard(newBoard, drawBoards) {
    api.post('/boards', newBoard)
      .then(res => this.getBoards(drawBoards))
      .catch(err => console.error(err))
  }

  deleteBoard(boardId, drawBoards) {
    api.delete(`/boards/${boardId}`)
      .then(res => this.getBoards(drawBoards))
      .catch(err => console.error(err))
  }

  setActiveBoard(boardId, drawActiveBoard) {
    api.get(`/boards/${boardId}`)
      .then(res => {
        setState('activeBoard', res.data)
        setState('activeTasks', {})
        drawActiveBoard()
      })
      .catch(err => console.error(err))
  }

  //LIST METHODS
  getListsByBoard(boardId, drawLists) {
    api.get(`/lists/by-board/${boardId}`, drawLists)
      .then(res => {
        setState('activeLists', res.data)
        res.data.forEach(list => {
          this.getTasksByList(list._id, drawLists)
        })
      })
      .catch(err => console.error(err))
  }



  //TASK METHODS
  getTasksByList(listId, drawLists) {
    api.get(`/tasks/by-list/${listId}`)
      .then(res => {
        addActiveTask(listId, res.data)
        drawLists()
      })
      .catch(err => console.error(err))
  }
}