import Store from "../store/store.js"

let store = new Store()

const contentPane = document.getElementById("main-content")
const boardHeader = document.getElementById("header-right")

function drawBoards() {
  let template = ""

  store.state.boards.forEach(board => {
    template += ` 
    <div class="col-4">    
      <div class="card mb-3" style="max-width: 20rem;">
        <div class="card-header bg-secondary text-white flexbox">
          <div>Created: ${new Date(board.created).toDateString()}</div>
          <div>
            <i class="fa fa-arrows-alt clickable" aria-hidden="true" 
            onclick="app.controllers.board.showBoardDetails('${board._id}');
            app.controllers.list.getLists('${board._id}')"></i>&nbsp&nbsp
            <i class="fa fa-trash clickable" onclick="app.controllers.board.deleteBoard('${board._id}')" aria-hidden="true"></i>
          </div>
        </div>
        <div class="card-body bg-light text-primary">
          <h4 class="card-title">${board.title}</h4>
          <p class="card-text">${board.description}</p>
        </div>
      </div>
    </div>     
    `
  })
  contentPane.innerHTML = template
}

function drawBoardsHeader() {
  //refactor to draw board header
  let templateHeader = `
   <div class="row">
    <div class="col-8"></div>
    <div class="col-4">
      <h3 class="text-white mt-2">Welcome ${store.state.user.userName}!</h3>
      <button onClick="app.controllers.board.getBoards()" class="btn btn-secondary mt-1">Retrieve Boards</button>
      <button class="btn btn-secondary mt-1" type="button" data-toggle="modal" data-target="#newBoardModal">Create Board</button>
    </div>
   </div>
  `
  boardHeader.innerHTML = templateHeader
}

function drawActiveBoard() {
  let template = `
   <div class="row">
    <div class="col-8 text-white">
      <h3>${store.state.activeBoard.title}</h3>
      <p>${store.state.activeBoard.description}</p>    
    </div>
    <div class="col-4">
      <h3 class="text-white mt-2">Welcome ${store.state.user.userName}!</h3>
      <button class="btn btn-secondary mt-1" type="button" data-toggle="modal" data-target="#newListModal">Add New List</button>
      <button onClick="app.controllers.board.getBoards()" class="btn btn-secondary mt-1">Boards View</button>

    </div>
   </div>
  `
  boardHeader.innerHTML = template
}




export default class BoardController {

  getBoards() {
    store.getBoards(drawBoards, drawBoardsHeader);
  }

  createBoard(e) {
    e.preventDefault()
    let newBoard = {
      title: e.target.title.value,
      description: e.target.description.value
    }
    store.createBoard(newBoard, drawBoards, drawBoardsHeader);
    e.target.reset()
  }

  showBoardDetails(boardId) {
    store.setActiveBoard(boardId, drawActiveBoard)
  }


  deleteBoard(boardId) {
    console.log("Deleting Board")
    store.deleteBoard(boardId, drawBoards, drawBoardsHeader)
  }



}