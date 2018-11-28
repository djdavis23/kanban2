import User from "../models/User.js";


//store singleton
let store;

//program state data
let state = {
  user: {},
  boards: [],
  activeBoard: {},
  activeLists: [],
  activeTasks: {},
  activeComments: {}
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

function addTasks(listId, tasks) {
  state.activeTasks[listId] = tasks
}

function addComments(taskId, comments) {
  state.activeComments[taskId] = comments
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
  getBoards(drawBoards, drawBoardsHeader) {
    api.get('/boards')
      .then(res => {
        setState('boards', res.data)
        setState('activeBoard', {})
        setState('activeLists', [])
        setState('activeTasks', {})
        drawBoards()
        drawBoardsHeader()
      })
      .catch(err => console.error(err))
  }

  createBoard(newBoard, drawBoards, drawBoardsHeader) {
    api.post('/boards', newBoard)
      .then(res => this.getBoards(drawBoards, drawBoardsHeader))
      .catch(err => console.error(err))
  }

  deleteBoard(boardId, drawBoards, drawBoardsHeader) {
    api.delete(`/boards/${boardId}`)
      .then(res => {
        this.deleteListsByBoard(boardId)
        this.getBoards(drawBoards, drawBoardsHeader)
      })
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
        drawLists()
      })
      .catch(err => console.error(err))
  }

  createList(newList, boardId, drawLists) {
    api.post('/lists', newList)
      .then(res => this.getListsByBoard(boardId, drawLists))
      .catch(err => console.error(err))
  }

  deleteListsByBoard(boardId) {
    console.log("Deleting List for board: ", boardId)
    api.get(`/lists/by-board/${boardId}`)
      .then(res => {
        res.data.forEach(list => {
          this.deleteTasksByList(list._id)
        })
        api.delete(`/lists/by-board/${boardId}`)
          .then(() => setState('activeLists', []))
          .catch(err => console.error(err))
      })
  }

  deleteList(listId, drawLists, drawDetailPane) {
    let boardId = state.activeBoard._id
    api.delete(`/lists/${listId}`)
      .then(() => {
        this.deleteTasksByList(listId, drawDetailPane)
        this.getListsByBoard(boardId, drawLists)
      })
      .catch(err => console.error(err))
  }






  //TASK METHODS
  getTasksByList(listId, drawLists) {
    api.get(`/tasks/by-list/${listId}`)
      .then(res => {
        addTasks(listId, res.data)
        drawLists()
      })
      .catch(err => console.error(err))
  }

  createTask(newTask, listId, drawMainContent) {
    api.post('/tasks', newTask)
      .then(res => this.getTasksByList(listId, drawMainContent))
      .catch(err => console.error(err))
  }

  deleteTask(taskId, listId, drawMain, drawDetails) {
    api.delete(`/tasks/${taskId}`)
      .then(() => {
        this.deleteCommentsByTask(taskId, drawDetails)
        this.getTasksByList(listId, drawMain)
      })
      .catch(err => console.error(err))
  }

  deleteTasksByList(listId, drawDetailPane) {
    console.log("deleting tasks for list id: ", listId)
    api.get(`/tasks/by-list/${listId}`)
      .then(res => {
        res.data.forEach(task => this.deleteCommentsByTask(task._id, drawDetailPane))
        api.delete(`/tasks/by-list/${listId}`)
        delete state.activeTasks[listId]
      })
      .catch(err => console.error(err))

  }

  getTask(taskId, listId) {
    let taskList = state.activeTasks[listId]
    return taskList.find(task => task._id == taskId)
  }

  //COMMENTS METHODS
  getCommentsByTask(taskId, draw) {
    api.get(`/comments/by-task/${taskId}`)
      .then(res => {
        addComments(taskId, res.data)
        draw()
      })
      .catch(err => console.error(err))
  }

  createComment(newComment, taskId, draw) {
    api.post('/comments', newComment)
      .then(res => {
        this.getCommentsByTask(taskId, draw)
      })
      .catch(err => console.error(err))
  }

  deleteComment(commentId, taskId, draw) {
    api.delete(`/comments/${commentId}`)
      .then(() => {
        this.getCommentsByTask(taskId, draw)
      })
      .catch(err => console.error(err))
  }
  deleteCommentsByTask(taskId, draw) {
    console.log("deleting comments for task ", taskId)
    api.delete(`/comments/by-task/${taskId}`)
      .then(() => {
        delete state.activeComments[taskId]
        draw()
      })
  }
}