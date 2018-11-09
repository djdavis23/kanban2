import Store from "../store/store.js"

let store = new Store()

const contentPane = document.getElementById("main-content")

function drawBoards() {
  let template = ""

  store.state.boards.forEach(board => {
    template += `      
      <div class="card mb-3" style="max-width: 20rem;">
        <div class="card-header bg-secondary text-white flexbox">
          <div>Created: ${new Date(board.created).toDateString()}</div>
          <div><i class="fa fa-arrows-alt clickable" aria-hidden="true" 
          onclick="app.controllers.board.showBoardDetails(board._id)"></i>&nbsp&nbsp
          <span class="clickable" onclick="app.controllers.board.deleteBoard(board._id)">
          <i class="fa fa-trash clickable" aria-hidden="true"></i>          
          </span>
          </div>
        </div>
        <div class="card-body bg-light text-secondary">
          <h4 class="card-title">${board.title}</h4>
          <p class="card-text">${board.description}</p>
        </div>
      </div>
    `
  })

  contentPane.innerHTML = template
}


export default class BoardController {

  getBoards() {
    store.getBoards(drawBoards);
  }

  createBoard(e) {

  }

  showBoardDetails(boardId) {
    console.log("Retrieving board details")
  }

  deleteBoard(boardId) {
    console.log("Deleting Board")
  }



}