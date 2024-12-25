import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const EventDetail = () => {
  const navigate = useNavigate()

  const { id } = useParams()
  return <>Event detail</>
}
