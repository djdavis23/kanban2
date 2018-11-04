import Store from "../store/store.js"

let store = new Store()

const contentPane = document.getElementById("main-content")

function drawBoards() {
  let template = ""

  store.state.boards.forEach(board => {
    template += `
      <h2>${board.title}</h2>
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