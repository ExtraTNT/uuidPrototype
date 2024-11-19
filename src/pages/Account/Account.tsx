import {
  Avatar,
  Center,
  Text,
  Stack,
  Group,
  TextInput,
  Box,
  SimpleGrid,
} from "@mantine/core"
import { accountMock } from "../../Mock/Account"
import { useNavigate } from "react-router-dom"

export const Account = () => {
  const navigate = useNavigate()
  return (
    <>
      <Center>
        <Stack align="center" justify="center">
          <Avatar src={accountMock.avatar} size="xl" />
          <Text
            style={{ cursor: "pointer" }}
            onClick={(e) =>
              (window.location.href = "mailto:" + accountMock.email)
            }
          >
            {accountMock.email}
          </Text>
          <Group>
            <TextInput readOnly value={accountMock.name} label="Last Name" />
            <TextInput
              readOnly
              value={accountMock.firstName}
              label="First Name"
            />
          </Group>
        </Stack>
      </Center>
    </>
  )
}
