import {
  Box,
  FocusTrap,
  Center,
  Input,
  SimpleGrid,
  Text,
  Collapse,
  Checkbox,
  Flex,
  Tooltip,
} from "@mantine/core"
import { IconFilter, IconSearch } from "@tabler/icons-react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { getBandMock } from "../../../Mock/Band"
import { getEventMock } from "../../../Mock/Event"
import { getLocationMock } from "../../../Mock/Location"
import { getSetlistMock } from "../../../Mock/SetList"
import StoreItem from "../../../components/StoreItem"
import { getLoggedInContextMock } from "../../../Mock/LoggedInContextMock"
import { getAccountMock } from "../../../Mock/Account"
import { useDisclosure } from "@mantine/hooks"

export const Events = () => {
  const { q } = useParams()

  const [search, setSearch] = useState(q ? q : "")
  const [opened, { toggle }] = useDisclosure(false)
  const [count, setCount] = useState(0)

  const [showAll, setShowAll] = useState(false)
  const [ignoringStanding, setIgnoringStanding] = useState(true)

  const searchEvents = (search: string) => {
    const searchLower = search.trim().toLowerCase()

    const bands = new Map(getBandMock().map((band) => [band.id, band]))
    const locations = new Map(
      getLocationMock().map((location) => [location.id, location])
    )
    const setlists = new Map(
      getSetlistMock().map((setlist) => [setlist.id, setlist])
    )

    const wheelchair = getAccountMock().wheelchair

    const loggedIn = getLoggedInContextMock().loggedIn

    const events = getEventMock()
      .sort((a, b) => Number.parseInt(a.band) - Number.parseInt(b.band))
      .filter((event) => new Date(event.opening) > new Date()) // Future events only
      .filter((event) => {
        const location = locations.get(event.location)
        return (
          !loggedIn ||
          showAll ||
          (location &&
            location.standignAccessibility >= wheelchair &&
            !ignoringStanding) ||
          location?.map.some((a) =>
            a.map.some((b) =>
              b.some(
                (c) =>
                  !event.seatsTaken.includes(c.number) &&
                  c.type === "seat" &&
                  c.accessibilityRating >= wheelchair
              )
            )
          )
        )
      })
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

    if (count !== events.length) setCount(events.length)
    return events
  }

  return (
    <Box h="100%">
      <FocusTrap active>
        <Center p="xl">
          <Input
            w="50%"
            style={{ zIndex: 9 }}
            size="xl"
            radius="xl"
            placeholder="Search - Band, Song, Location, Tour"
            value={search}
            onChange={(event) => setSearch(event.currentTarget.value)}
            rightSectionPointerEvents="all"
            leftSection={<IconSearch size={16} />}
            rightSection={
              getLoggedInContextMock().loggedIn ? (
                <Tooltip label="Show additional filters" openDelay={250}>
                  <IconFilter
                    style={{ cursor: "pointer" }}
                    size={24}
                    onClick={() => toggle()}
                  />
                </Tooltip>
              ) : (
                <></>
              )
            }
          />
        </Center>
        <Center>
          <Collapse in={opened}>
            <Flex direction="row" gap="md" pb="md">
              <Tooltip
                label="Check, if you want to seach for events, that don't fulfill your reported accessibility needs"
                openDelay={250}
              >
                <Checkbox
                  checked={showAll}
                  onChange={(e) => setShowAll(!showAll)}
                  label="Show events not accessible to me"
                />
              </Tooltip>
              <Tooltip
                label="Uncheck, if you are disabled, but still want to search for events with standind places"
                openDelay={250}
              >
                <Checkbox
                  checked={ignoringStanding}
                  onChange={(e) => setIgnoringStanding(!ignoringStanding)}
                  label="Ignore accessibility of standing places"
                />
              </Tooltip>
            </Flex>
          </Collapse>
        </Center>
      </FocusTrap>
      <Center>
        <Text pb="md">{count} Events found for you</Text>
      </Center>
      <SimpleGrid type="container" cols={{ base: 1, "800px": 2, "1300px": 3 }}>
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
