import { BrowserRouter, Route, Routes } from "react-router-dom"
import { NotFound } from "../pages/NotFound"
import { Home } from "../pages/Home"

import { Store } from "../pages/Store/Store"
import { Account } from "../pages/Account/Account"
import { Events } from "../pages/Store/Events/Events"
import { EventDetail } from "../pages/Store/Events/EventDetail"

export const CustomRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/account">
          <Route path="" element={<Account />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/store">
          <Route path="events" element={<Events />} />
          <Route path="events/:id" element={<EventDetail />} />
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
