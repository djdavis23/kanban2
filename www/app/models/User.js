export default class User {

  constructor(userData) {
    this.userId = userData._id
    this.userName = userData.userName
    this.email = userData.email
    this.password = userData.password
    this.created = userData.created
  }
}