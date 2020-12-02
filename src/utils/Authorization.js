//importing
import decode from "jwt-decode"

//class Auth
class Auth {
  constructor() {
    this.authenticated = false
  }

  isUser() {
    const token = localStorage.getItem("jwt")
    try {
      if (token) {
        let decoded = decode(token)
        if (decoded) {
          this.authenticated = true
        }
      }
    } catch (error) {
      return (this.authenticated = false)
    }
    return { auth: this.authenticated }
  }
}

//exporting Auth
export default new Auth()
