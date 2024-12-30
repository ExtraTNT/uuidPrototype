import {
  BackgroundImage,
  Box,
  Center,
  Input,
  Title,
  useComputedColorScheme,
} from "@mantine/core"
import { IconSearch } from "@tabler/icons-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const Home = () => {
  const [search, setSearch] = useState("")

  const navigate = useNavigate()

  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  })

  return (
    <BackgroundImage
      src="https://i.pinimg.com/originals/17/0a/d7/170ad7e148e11ba6b224689b8d89b4b7.jpg"
      h="100%"
    >
      <Box h="100%">
        <Center p="xl">
          <Input
            w="50%"
            size="xl"
            radius="xl"
            placeholder="Search - Band, Song, Location, Tour"
            value={search}
            onChange={(event) => setSearch(event.currentTarget.value)}
            leftSection={<IconSearch size={16} />}
            onKeyDown={(e) => {
              console.log(e.key)
              if (e.key.toLocaleLowerCase() === "enter")
                navigate("/store/events/search/" + search)
            }}
          />
        </Center>
        <Center p="xl">
          <Title
            style={{
              fontSize: "8vw",
              textShadow:
                computedColorScheme === "dark"
                  ? "-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000"
                  : "-2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff",
            }}
          >
            {"no restrictions".toUpperCase()}
          </Title>
        </Center>
      </Box>
    </BackgroundImage>
  )
}
