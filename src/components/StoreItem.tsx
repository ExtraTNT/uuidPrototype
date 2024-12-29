import {
  Button,
  Flex,
  Group,
  Image,
  Rating,
  Stack,
  Text,
  Title,
  Tooltip,
  useComputedColorScheme,
} from "@mantine/core"
import { useHover } from "@mantine/hooks"
import { useNavigate } from "react-router-dom"
import { getAccountMock } from "../Mock/Account"
import { getLoggedInContextMock } from "../Mock/LoggedInContextMock"

type ExerciseCardProps = {
  title: string
  location: string
  tour: string
  price: number
  id: string
  img: string
  date: string
  place: string
  country: string
  children?: React.ReactNode
}

export default function StoreItem({
  title,
  id,
  tour,
  location,
  img,
  price,
  date,
  place,
  country,
  children,
}: ExerciseCardProps) {
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  })
  const navigate = useNavigate()

  return (
    <Stack
      bg={computedColorScheme === "dark" ? "dark" : "blue.2"}
      style={{ borderRadius: "8px", cursor: "pointer" }}
      p="lg"
      gap="md"
      align="center"
      onClick={() => navigate("/store/events/" + id)}
    >
      <Image src={img} p="md" w="100%" h={400}></Image>
      <Group grow>
        <Group>
          <Stack gap="md">
            <Title size="xl">
              {title} - {tour}
            </Title>
            <Text>
              {location} - {place} ({country}) - {date}
            </Text>
            <Tooltip
              openDelay={500}
              label={"You already bought this ticket"}
              disabled={
                !(
                  getLoggedInContextMock().loggedIn &&
                  getAccountMock().tickets.includes(id)
                )
              }
            >
              <Button
                onClick={() => navigate("/store/events/" + id)}
                disabled={
                  getLoggedInContextMock().loggedIn &&
                  getAccountMock().tickets.includes(id)
                }
              >
                Buy {(price / 100).toFixed()}.
                {price % 100 == 0 ? "-" : price % 100}
              </Button>
            </Tooltip>
          </Stack>
        </Group>
      </Group>
    </Stack>
  )
}
