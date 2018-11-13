import Store from "../store/store.js"

let store = new Store()

const contentPane = document.getElementById("main-content")

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
            onclick="app.controllers.board.showBoardDetails('${board._id};
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

function drawActiveBoard() {
  console.log("drawing active board")
}




export default class BoardController {

  getBoards() {
    store.getBoards(drawBoards);
  }

  createBoard(e) {
    e.preventDefault()
    let newBoard = {
      title: e.target.title.value,
      description: e.target.description.value
    }
    store.createBoard(newBoard, drawBoards);
    e.target.reset()
  }

  showBoardDetails(boardId) {
    store.setActiveBoard(boardId, drawActiveBoard)
  }


  deleteBoard(boardId) {
    console.log("Deleting Board")
    store.deleteBoard(boardId, drawBoards)
  }



}