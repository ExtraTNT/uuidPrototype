import {
  Button,
  Group,
  Image,
  Stack,
  Text,
  Title,
  Tooltip,
  useComputedColorScheme,
} from "@mantine/core"
import { useNavigate } from "react-router-dom"
import { getAccountMock } from "../Mock/Account"
import { getLoggedInContextMock } from "../Mock/LoggedInContextMock"
import { memo } from "react"

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

export default memo(function StoreItem({
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
  const ticketIncluded = getAccountMock().tickets.includes(id)
  const loggedIn = getLoggedInContextMock().loggedIn

  return (
    <Stack
      bg={computedColorScheme === "dark" ? "dark" : "blue.2"}
      justify="space-between"
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
              disabled={!(loggedIn && ticketIncluded)}
            >
              <Button
                onClick={(e) => {
                  e.stopPropagation()
                  navigate("/store/events/" + id)
                }}
                disabled={loggedIn && ticketIncluded}
              >
                Buy {(price / 100).toFixed()}.
                {price % 100 === 0 ? "-" : price % 100}
              </Button>
            </Tooltip>
          </Stack>
        </Group>
      </Group>
    </Stack>
  )
})
