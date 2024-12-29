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
  NumberInput,
  useComputedColorScheme,
  PasswordInput,
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
      | "avatar"
      | "password",
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
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  })

  return (
    <>
      <Center>
        <Stack align="center" justify="center">
          <Group align="center" style={{ position: "relative" }}>
            <Avatar src={accountMock.avatar} radius={75} size={150} />
            <FileButton
              onChange={(e) => e && getBase64(e, updateAvatar)}
              accept="image/png,image/jpeg,image/jpg"
            >
              {(props) => (
                <ActionIcon
                  {...props}
                  size="xl"
                  radius="xl"
                  variant="default"
                  color={computedColorScheme === "light" ? "black" : "white"}
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 5,
                    border:
                      computedColorScheme === "light"
                        ? "2px solid black"
                        : "2px solid white",
                  }}
                >
                  <IconCamera size={24} />
                </ActionIcon>
              )}
            </FileButton>
          </Group>
          <Tooltip label={helpText[accountMock.wheelchair]} openDelay={1000}>
            <Stack align="stretch" justify="flex-start" gap="sd" w="100%">
              <Text size="sm" fw={500} display="inline-block">
                Level of Disability
              </Text>
              <Slider
                min={0}
                max={4}
                w="100%"
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
          <TextInput
            w="100%"
            value={accountMock.email}
            onChange={(e) => updateAccount("email", e.target.value)}
            label="Email"
          />
          <PasswordInput
            w="100%"
            value={accountMock.password}
            onChange={(e) => updateAccount("password", e.target.value)}
            label="Password"
          />
          <Group grow w="100%">
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
            <DateInput
              w="100%"
              value={new Date(accountMock.birthday)}
              onChange={(e) =>
                e && updateAccountDate("birthday", new Date(e.toISOString()))
              }
              label="Birthday"
            />
            <TextInput
              value={accountMock.country}
              onChange={(e) => updateAccount("country", e.target.value)}
              label="Country"
            />
          </Group>
          <Group grow w="100%">
            <NumberInput
              value={accountMock.plz}
              onChange={(e) =>
                updateAccountNumber(
                  "plz",
                  typeof e == "number" ? e : Number.parseInt(e)
                )
              }
              label="PLZ"
              allowDecimal={false}
              hideControls
            />
            <TextInput
              value={accountMock.place}
              onChange={(e) => updateAccount("place", e.target.value)}
              label="Place"
            />
          </Group>
          <TextInput
            w="100%"
            value={accountMock.address}
            onChange={(e) => updateAccount("address", e.target.value)}
            label="Address"
          />
        </Stack>
      </Center>
    </>
  )
}
