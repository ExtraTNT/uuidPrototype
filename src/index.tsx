import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "@mantine/core/styles.css"
import "@mantine/charts/styles.css"
import "@mantine/notifications/styles.css"
import "@mantine/dates/styles.css"
import { createTheme, MantineColorsTuple, MantineProvider } from "@mantine/core"
import { Notifications } from "@mantine/notifications"
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

const colors: MantineColorsTuple = [
  "#ecf4ff",
  "#dce4f5",
  "#b9c7e2",
  "#94a8d0",
  "#748dc0",
  "#5f7cb7",
  "#5474b4",
  "#44639f",
  "#3a5890",
  "#2c4b80",
]
const theme = createTheme({
  /** Put your mantine theme override here */
  colors: {
    blue: colors,
  },

  fontFamily:
    "Roboto, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans serif",
  fontFamilyMonospace:
    "Hack NerdFont, Hack NF, Hack Nerd Font, source-code-pro, Menlo, Monaco, Consolas, Courier New, monospace",
})

root.render(
  <React.StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="light">
      <Notifications />
      <App />
    </MantineProvider>
  </React.StrictMode>
)
