import { Center, Stack, TextInput, PasswordInput, Button } from "@mantine/core"
import { getAccountMock } from "../../Mock/Account"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { IconLogin, IconPencil } from "@tabler/icons-react"
import { notifications } from "@mantine/notifications"
import { checkIcon, xIcon } from "../../components/NotificationIcons"
import { set } from "../../services/localObjectStorage"

export const Login = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState<string>("")

  const [passwd, setPasswd] = useState<string>("")

  const register = () => {
    navigate("/account/register")
  }
  const login = () => {
    const account = getAccountMock()
    if (account.email === email && account.password === passwd) {
      set("loggedInContext", { loggedIn: true })
      navigate("/")
      notifications.show({
        title: "Logged In",
        message: "You are now logged in, enjoy",
        icon: checkIcon,
        color: "teal",
        position: "top-center",
      })
    } else {
      notifications.show({
        title: "Wrong Email or Password",
        message:
          "Wrong email or password, as we are in demo mode, use the email " +
          getAccountMock().email +
          " with the password " +
          getAccountMock().password,
        icon: xIcon,
        color: "red",
        position: "top-center",
      })
    }
  }

  return (
    <>
      <Center>
        <Stack align="center" justify="center" miw="25%" mt="xl">
          <TextInput
            required
            w="100%"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
          />
          <PasswordInput
            required
            w="100%"
            value={passwd}
            onChange={(e) => setPasswd(e.target.value)}
            label="Password"
          />
          <Button
            m="sm"
            w="100%"
            variant="outline"
            onClick={login}
            leftSection={<IconLogin size={14} />}
          >
            Login
          </Button>
          <Button
            w="100%"
            variant="outline"
            onClick={register}
            leftSection={<IconPencil size={14} />}
          >
            Register Instead
          </Button>
        </Stack>
      </Center>
    </>
  )
}
