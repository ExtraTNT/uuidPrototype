import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const Store = () => {
  const navigate = useNavigate()

  useEffect(() => navigate("events"), [])

  return <></>
}
