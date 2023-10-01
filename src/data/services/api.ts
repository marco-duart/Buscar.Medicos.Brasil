import axios from "axios"

export default axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    "Content-Type": "application/json"
  }
  //LEMBRAR
  /* headers: {
    "Content-Type": "application/json",
    "x-api-key": "52a8b954-e25d-4cc5-86e5-c32e92f994bb",
  }, */
})