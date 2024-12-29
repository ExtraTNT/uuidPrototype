import { get, set } from "../services/localObjectStorage"

export const getLoggedInContextMock = () => {
  const data = get("loggedInContext")
  if (data) return data
  set("loggedInContext", { loggedIn: false })
  return { loggedIn: false }
}
