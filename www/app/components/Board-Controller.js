import Store from "../store/store.js"

let store = new Store()

const contentPane = document.getElementById("main-content")

function drawBoards() {
  let template = ""

  store.state.boards.forEach(board => {
    template += `      
      <div class="card text-white bg-secondary mb-3" style="max-width: 20rem;">
        <div class="card-header">Created: ${board.created}</div>
        <div class="card-body">
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



}