import { Box, FocusTrap, Center, Input, SimpleGrid } from "@mantine/core"
import { IconSearch } from "@tabler/icons-react"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getBandMock } from "../../../Mock/Band"
import { getEventMock } from "../../../Mock/Event"
import { getLocationMock } from "../../../Mock/Location"
import { getSetlistMock } from "../../../Mock/SetList"
import StoreItem from "../../../components/StoreItem"
import { getLoggedInContextMock } from "../../../Mock/LoggedInContextMock"
import { getAccountMock } from "../../../Mock/Account"

export const Events = () => {
  const navigate = useNavigate()

  const { q } = useParams()

  const [search, setSearch] = useState(q ? q : "")

  const searchEvents = (search: string) => {
    const searchLower = search.trim().toLowerCase()

    const bands = new Map(getBandMock().map((band) => [band.id, band]))
    const locations = new Map(
      getLocationMock().map((location) => [location.id, location])
    )
    const setlists = new Map(
      getSetlistMock().map((setlist) => [setlist.id, setlist])
    )

    return getEventMock()
      .filter((event) => new Date(event.opening) > new Date()) // Future events only
      .filter(
        (event) =>
          !getLoggedInContextMock().loggedIn ||
          locations
            .get(event.location)
            ?.map.some((a) =>
              a.map.some((b) =>
                b.some(
                  (c) =>
                    !c.taken &&
                    c.type === "seat" &&
                    c.accessibilityRating >= getAccountMock().wheelchair
                )
              )
            )
      )
      .filter((event) => {
        const band = bands.get(event.band)
        const location = locations.get(event.location)
        const setlist = setlists.get(event.setlist)

        return (
          (band &&
            (band.name.toLowerCase().includes(searchLower) ||
              band.genre.toLowerCase().includes(searchLower))) ||
          (location &&
            (location.name.toLowerCase().includes(searchLower) ||
              location.city.toLowerCase().includes(searchLower))) ||
          (setlist &&
            (setlist.name.toLowerCase().includes(searchLower) ||
              setlist.setlist.some((s) =>
                s.song.trim().toLowerCase().includes(searchLower)
              )))
        )
      })
  }

  return (
    <Box h="100%">
      <FocusTrap active>
        <Center p="xl">
          <Input
            w="50%"
            size="xl"
            radius="xl"
            placeholder="Search - Band, Song, Location, Tour"
            value={search}
            onChange={(event) => setSearch(event.currentTarget.value)}
            leftSection={<IconSearch size={16} />}
          />
        </Center>
      </FocusTrap>
      <SimpleGrid type="container" cols={{ base: 1, "800px": 2, "1300px": 3 }}>
        {/*
        {getEventMock()
          .filter((e) => new Date(e.opening) > new Date())
          .filter(
            (i) =>
              getBandMock()
                .filter((j) => j.id === i.band)[0]
                .name.trim()
                .toLowerCase()
                .includes(search.trim().toLocaleLowerCase()) ||
              getBandMock()
                .filter((j) => j.id === i.band)[0]
                .genre.trim()
                .toLowerCase()
                .includes(search.trim().toLocaleLowerCase()) ||
              getLocationMock()
                .filter((j) => j.id === i.location)[0]
                .name.trim()
                .toLowerCase()
                .includes(search.trim().toLocaleLowerCase()) ||
              getLocationMock()
                .filter((j) => j.id === i.location)[0]
                .city.trim()
                .toLowerCase()
                .includes(search.trim().toLowerCase()) ||
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
                */}
        {searchEvents(search).map((v) => (
          <StoreItem
            title={getBandMock().filter((b) => b.id === v.band)[0].name}
            location={
              getLocationMock().filter((l) => l.id === v.location)[0].name
            }
            place={getLocationMock().filter((l) => l.id === v.location)[0].city}
            country={
              getLocationMock().filter((l) => l.id === v.location)[0].country
            }
            tour={getSetlistMock().filter((s) => s.id === v.setlist)[0].name}
            price={v.price}
            id={v.id}
            img={getBandMock().filter((b) => b.id === v.band)[0].img}
            date={new Date(v.opening).toDateString()}
          />
        ))}
      </SimpleGrid>
    </Box>
  )
}
