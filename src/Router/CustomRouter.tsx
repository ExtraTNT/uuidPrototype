import { BrowserRouter, Route, Routes } from "react-router-dom"
import { NotFound } from "../pages/NotFound"
import { Home } from "../pages/Home"

import { Store } from "../pages/Store/Store"

export const CustomRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/account">
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/store">
          <Route path="events" element={<>events</>} />
          <Route path="events/:id" element={<>event x</>} />
          <Route path="" element={<Store />} />
        </Route>
        <Route path="/">
          <Route path="" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
