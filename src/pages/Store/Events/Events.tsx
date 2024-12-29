import { Box, FocusTrap, Center, Input, SimpleGrid } from "@mantine/core"
import { IconSearch } from "@tabler/icons-react"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getBandMock } from "../../../Mock/Band"
import { getEventMock } from "../../../Mock/Event"
import { getLocationMock } from "../../../Mock/Location"
import { getSetlistMock } from "../../../Mock/SetList"
import StoreItem from "../../../components/StoreItem"

export const Events = () => {
  const navigate = useNavigate()

  const { q } = useParams()

  const [search, setSearch] = useState(q ? q : "")
  return (
    <Box h="100%">
      <FocusTrap active>
        <Center p="xl">
          <Input
            w="50%"
            size="xl"
            radius="xl"
            placeholder="Search"
            value={search}
            onChange={(event) => setSearch(event.currentTarget.value)}
            leftSection={<IconSearch size={16} />}
          />
        </Center>
      </FocusTrap>
      <SimpleGrid type="container" cols={{ base: 1, "800px": 2, "1300px": 3 }}>
        {getEventMock()
          .filter((e) => new Date(e.opening) > new Date())
          .filter(
            (i) =>
              getBandMock()
                .filter((j) => j.id === i.band)[0]
                .name?.trim()
                .toLowerCase()
                .includes(search.trim().toLocaleLowerCase()) ||
              getBandMock()
                .filter((j) => j.id === i.band)[0]
                .genre?.trim()
                .toLowerCase()
                .includes(search.trim().toLocaleLowerCase()) ||
              getLocationMock()
                .filter((j) => j.id === i.location)[0]
                .name?.trim()
                .toLowerCase()
                .includes(search.trim().toLocaleLowerCase()) ||
              getSetlistMock()
                .filter((j) => j.id === i.setlist)[0]
                .name.trim()
                .toLowerCase()
                .includes(search.trim().toLowerCase()) ||
              getSetlistMock()
                .filter((j) => j.id === i.setlist)[0]
                .setlist.find((k) =>
                  k.song
                    .trim()
                    .toLowerCase()
                    .includes(search.trim().toLowerCase())
                ) !== undefined
          )
          .map((v) => {
            console.log(
              v,
              getSetlistMock().filter((s) => s.id === v.setlist)
            )
            return (
              <StoreItem
                title={getBandMock().filter((b) => b.id === v.band)[0].name}
                location={
                  getLocationMock().filter((l) => l.id === v.location)[0].name
                }
                tour={
                  getSetlistMock().filter((s) => s.id === v.setlist)[0].name
                }
                price={v.price}
                id={v.id}
                img={getBandMock().filter((b) => b.id === v.band)[0].img}
                date={new Date(v.opening).toDateString()}
              />
            )
          })}
      </SimpleGrid>
    </Box>
  )
}
