import {
  Avatar,
  Center,
  Text,
  Stack,
  Group,
  TextInput,
  Box,
  SimpleGrid,
  Slider,
  Tooltip,
  FileButton,
  ActionIcon,
} from "@mantine/core"
import { DateInput } from "@mantine/dates"
import { getAccountMock, AccountMockType } from "../../Mock/Account"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { helpText } from "../../utils/wheelchairMap"
import { set } from "../../services/localObjectStorage"
import { IconCamera } from "@tabler/icons-react"
import { getBase64 } from "../../utils/base64"

export const Account = () => {
  const navigate = useNavigate()

  const [accountMock, setAccountMock] = useState<AccountMockType>(
    getAccountMock()
  )

  const updateAccount = (
    key:
      | "id"
      | "name"
      | "firstName"
      | "email"
      | "place"
      | "address"
      | "country"
      | "avatar",
    value: string
  ) => {
    let accountPatched = { ...accountMock }
    accountPatched[key] = value
    setAccountMock(accountPatched)
    set("account", accountPatched)
  }
  const updateAccountNumber = (key: "wheelchair" | "plz", value: number) => {
    let accountPatched = { ...accountMock }
    accountPatched[key] = value
    setAccountMock(accountPatched)
    set("account", accountPatched)
  }
  const updateAccountDate = (key: "birthday", value: Date) => {
    let accountPatched = { ...accountMock }
    accountPatched[key] = value
    setAccountMock(accountPatched)
    set("account", accountPatched)
  }
  const updateAvatar = (value: string) => updateAccount("avatar", value)

  return (
    <>
      <Center>
        <Stack align="center" justify="center">
          <Avatar src={accountMock.avatar} size="xl" />
          <Group align="center" style={{ position: "relative" }}>
            <Avatar src={accountMock.avatar} radius="xl" size={100} />
            <FileButton
              onChange={(e) => e && getBase64(e, updateAvatar)}
              accept="image/png,image/jpeg,image/jpg"
            >
              {(props) => (
                <ActionIcon
                  {...props}
                  size="lg"
                  radius="xl"
                  variant="default"
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 5,
                    border: "2px solid white",
                  }}
                >
                  <IconCamera size={24} />
                </ActionIcon>
              )}
            </FileButton>
          </Group>
          <Text
            style={{ cursor: "pointer" }}
            onClick={(e) =>
              (window.location.href = "mailto:" + accountMock.email)
            }
          >
            {accountMock.email}
          </Text>
          <Group>
            <TextInput
              value={accountMock.name}
              onChange={(e) => updateAccount("name", e.target.value)}
              label="Last Name"
            />
            <TextInput
              value={accountMock.firstName}
              onChange={(e) => updateAccount("firstName", e.target.value)}
              label="First Name"
            />
          </Group>
          <Group grow w="100%">
            {
              <DateInput
                value={new Date(accountMock.birthday)}
                onChange={(e) =>
                  e && updateAccountDate("birthday", new Date(e.toISOString()))
                }
                label="Birthday"
              />
            }
            <Tooltip label={helpText[accountMock.wheelchair]} openDelay={1000}>
              <Stack align="stretch" justify="flex-start" gap="sd">
                <Text size="sm" fw={500} display="inline-block">
                  Level of Disability
                </Text>
                <Slider
                  min={0}
                  max={4}
                  pb={"12px"}
                  value={accountMock.wheelchair}
                  onChange={(e) => updateAccountNumber("wheelchair", e)}
                  step={1}
                  marks={[
                    { value: 0, label: "Fully mobile" },
                    { value: 1, label: "Reduced mobility" },
                    { value: 2, label: "Wheelchair, no restrictions" },
                    { value: 3, label: "Wheelchair, restrictions" },
                    { value: 4, label: "Wheelchair, not-mobile" },
                  ]}
                  styles={{ markLabel: { display: "none" } }}
                />
              </Stack>
            </Tooltip>
          </Group>
        </Stack>
      </Center>
    </>
  )
}
