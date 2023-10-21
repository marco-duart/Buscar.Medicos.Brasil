import { useState, useEffect } from "react"
import { useNavigate, useParams, useLocation } from "react-router-dom"
import { GetUsers } from "../../data/services/users"

const UserDetail = () => {
  /* const params = useParams()
  const id = params.id ? parseInt(params?.id) : 0 */

  const location = useLocation();
  if(location.state.data) {
    console.log(location.state.data)
  }

  return (
    <div>Oi</div>
  )
}

export default UserDetail