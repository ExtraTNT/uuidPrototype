import {
  Avatar,
  Blockquote,
  Box,
  Center,
  Input,
  ScrollArea,
  Stack,
} from "@mantine/core"
import { IconSearch } from "@tabler/icons-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const Home = () => {
  const [search, setSearch] = useState("")

  const navigate = useNavigate()
  return (
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
      <Blockquote color="blue" cite="- UUID Ticket Portal" mt="xl" w="75%">
        We're trying to improfe
      </Blockquote>
    </Box>
  )
}
