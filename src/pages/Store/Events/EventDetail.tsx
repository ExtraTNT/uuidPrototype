import { useNavigate, useParams } from "react-router-dom"
import { getEventMock } from "../../../Mock/Event"
import { getBandMock } from "../../../Mock/Band"
import { getSetlistMock } from "../../../Mock/SetList"
import { getLocationMock } from "../../../Mock/Location"
import {
  Box,
  Image,
  Text,
  rem,
  Stack,
  Tabs,
  Title,
  useComputedColorScheme,
  NavLink,
  Center,
  Group,
  SimpleGrid,
  Rating,
  Tooltip,
  Avatar,
  ScrollArea,
} from "@mantine/core"
import {
  IconArmchair2,
  IconBuildingStore,
  IconDisabled2,
  IconFlagPin,
  IconHandLoveYou,
  IconMap,
  IconMusic,
  IconToiletPaper,
  IconToolsKitchen2,
  IconX,
} from "@tabler/icons-react"
import { helpText } from "../../../utils/wheelchairMap"
import { getUserRatingMock } from "../../../Mock/UserRating"
import { getAccountMock } from "../../../Mock/Account"
import { getLoggedInContextMock } from "../../../Mock/LoggedInContextMock"

export const EventDetail = () => {
  const navigate = useNavigate()
  navigate.toString()
  // TODO: remove, only exists to let my linter shut the fuck up, till i actually implement this shit

  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  })

  const { id } = useParams()
  const event = getEventMock().filter((e) => e.id === id)[0]
  const band = getBandMock().filter((b) => b.id === event.band)[0]
  const setlist = getSetlistMock().filter((s) => s.id === event.setlist)[0]
  const location = getLocationMock().filter((l) => l.id === event.location)[0]
  const reviews = getUserRatingMock().filter((r) =>
    location.ratings.includes(r.id)
  )

  const iconStyle = { width: rem(16), height: rem(16) }

  function getColor(accessibilityRating: number): string {
    if (!getLoggedInContextMock().loggedIn) return "green"
    const accessibility = getAccountMock().wheelchair
    if (accessibility === 1 && accessibilityRating === 1) return "orange"
    if (accessibility === 2 && accessibilityRating === 2) return "orange"

    if (accessibility === 0 || accessibilityRating >= accessibility)
      return "green"

    return "red"
  }

  return (
    <Box h="100%" p="md">
      <Tabs defaultValue="tickets">
        <Tabs.List grow>
          <Tabs.Tab
            value="tickets"
            leftSection={<IconBuildingStore style={iconStyle} />}
          >
            Buy Ticket
          </Tabs.Tab>
          <Tabs.Tab
            value="location"
            leftSection={<IconFlagPin style={iconStyle} />}
          >
            Location
          </Tabs.Tab>
          <Tabs.Tab
            value="accessibility"
            leftSection={<IconDisabled2 style={iconStyle} />}
          >
            Accessibility
          </Tabs.Tab>
          <Tabs.Tab
            value="band"
            leftSection={<IconHandLoveYou style={iconStyle} />}
          >
            Band
          </Tabs.Tab>
          <Tabs.Tab
            value="setlist"
            leftSection={<IconMusic style={iconStyle} />}
          >
            Setlist
          </Tabs.Tab>

          <Tabs.Tab value="map" leftSection={<IconMap style={iconStyle} />}>
            Map
          </Tabs.Tab>

          <Tabs.Tab
            value="seats"
            leftSection={<IconArmchair2 style={iconStyle} />}
          >
            Seats
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="tickets">Ticket tab content</Tabs.Panel>
        {/** TODO: Order things */}

        <Tabs.Panel value="location">
          <Title w="100%" ta="center" p="md">
            {location.name}
          </Title>
          <SimpleGrid cols={{ base: 1, "1600px": 2 }} p="md" type="container">
            <Box p="md">
              <Title order={2}>Description and Contact</Title>
              <Text p="md">{location.detailText}</Text>
              <Text>
                {location.address} {location.city} ({location.country}) -{" "}
                <span
                  style={{ cursor: "pointer" }}
                  onClick={(e) =>
                    (window.location.href = "mailto:" + location.contact)
                  }
                >
                  {location.contact}
                </span>
              </Text>
            </Box>
            <ScrollArea mah={500} h="auto">
              <Title order={2}>User Ratings</Title>
              {reviews.map((v) => (
                <Group wrap="nowrap" p="md">
                  <Avatar src={getAccountMock().avatar} radius="xl" size="lg" />
                  <div>
                    <Rating readOnly value={v.rating} />
                    <Text size="sm" c="dimmed">
                      {v.detail}
                    </Text>
                  </div>
                </Group>
              ))}
            </ScrollArea>
          </SimpleGrid>
          <Stack justify="flex-start" align="center" gap="md" p="md"></Stack>
          <Title px="md" order={2}>
            Images
          </Title>
          <SimpleGrid
            cols={{ base: 1, "1200px": 2, "1800px": 3 }}
            p="md"
            type="container"
          >
            {location.img.map((v) => (
              <Image src={v} w="auto" maw={600} h={400} />
            ))}
          </SimpleGrid>
        </Tabs.Panel>

        <Tabs.Panel value="accessibility">
          <Center>
            <Stack justify="flex-start" w="50%" miw={500} gap="md" p="md">
              <Title w="100%" ta="center">
                {location.name}
              </Title>
              <Title order={2}>Ratings</Title>
              <Tooltip
                openDelay={250}
                label={(() => {
                  switch (location.accessibilityRating) {
                    case 1:
                      return "Very bad accessibility"
                    case 2:
                      return "Bad accessibility"
                    case 3:
                      return "Ok accessibility"
                    case 4:
                      return "Good accessibility"
                    case 5:
                      return "Perfect or almost perfect accessibility"
                  }
                })()}
              >
                <Group>
                  <Text>Accessibility Rating: </Text>
                  <Rating value={location.accessibilityRating} readOnly />
                </Group>
              </Tooltip>
              <Tooltip
                openDelay={250}
                label={
                  "Standing places can be accessed by people who have / are: " +
                  helpText[location.standignAccessibility]
                }
              >
                <Group>
                  <Text>Standing Accessibility: </Text>
                  <Rating value={location.standignAccessibility + 1} readOnly />
                </Group>
              </Tooltip>
              <Title order={2}>Description</Title>
              <Text>{location.accessibilityDetailText}</Text>
              <Title order={2}>Address and Contact</Title>
              <Text w="100%" ta="right">
                {location.address} {location.city} ({location.country})
              </Text>
              <Text w="100%" ta="right">
                {location.contact}
              </Text>
            </Stack>
          </Center>
          <Title order={2} px="md">
            Images
          </Title>
          <SimpleGrid
            cols={{ base: 1, "1200px": 2, "1800px": 3 }}
            p="md"
            type="container"
          >
            {location.img.map((v) => (
              <Image src={v} w="auto" maw={600} h={400} />
            ))}
          </SimpleGrid>
        </Tabs.Panel>

        <Tabs.Panel value="band">
          <SimpleGrid cols={{ base: 1, "1600px": 2 }} p="md" type="container">
            <Image src={band.img} w="100%" h="auto" p="md" />
            <Box p="xl">
              <Title>{band.name.toUpperCase()}</Title>
              <Text>{band.genre}</Text>
              <Text p="md">{band.description}</Text>
              <NavLink
                px="md"
                c="blue"
                py="0"
                w="fit-content"
                href={band.link}
                label={"Band Website"}
              />
            </Box>
          </SimpleGrid>
        </Tabs.Panel>
        <Tabs.Panel value="setlist">
          <Center p="md">
            <Title>
              {band.name} - {setlist.name} - Setlist
            </Title>
          </Center>
          <Stack justify="flex-start" align="center" gap="md">
            {setlist.setlist.map((v) => (
              <Group
                w="25vw"
                miw={350}
                grow
                p="md"
                justify="center"
                align="center"
                bg={computedColorScheme === "dark" ? "dark" : "blue.2"}
                style={{ borderRadius: "8pt" }}
              >
                <Text style={{ textWrap: "nowrap" }}>{v.song}</Text>
                <Text ta="right" style={{ textWrap: "nowrap" }}>
                  {v.time}
                </Text>
              </Group>
            ))}
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="map">
          <Stack justify="flex-start" align="center" gap="md" p="md">
            <Title>{location.name} - Map</Title>
            <Title order={2}>Street Map</Title>
            <Image
              src={location.streetMap}
              maw="90vw"
              w="auto"
              h="auto"
              mah="70vh"
            />
            {location.map.map((v, i) => (
              <>
                <Title key={i + "tlvl"} order={2}>
                  Level {i + 1}
                </Title>
                <Image src={v.img} maw="90vw" w="auto" h="auto" mah="70vh" />
              </>
            ))}
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="seats">
          {/** TODO: Tooltips, show more info */}
          <Stack justify="flex-start" align="center" p="md">
            <Title p="md">{location.name} - Seat Arangement</Title>
            {location.map.map((v, i) => (
              <Box>
                <Title key={i + "slvl"} order={2} p="md" w="100%" ta="center">
                  Level {i + 1}
                </Title>
                {v.map.map((v, i) => (
                  <Group gap="xs" p="xs">
                    {v.map((v, i) => (
                      <Box
                        key={v.number + v.type}
                        w={28}
                        p="2"
                        bg={computedColorScheme === "dark" ? "dark" : "blue.2"}
                        style={{ borderRadius: "4pt" }}
                      >
                        {v.type === "seat" && (
                          <IconArmchair2
                            size={24}
                            color={
                              event.seatsTaken.includes(v.number)
                                ? "gray"
                                : getColor(v.accessibilityRating)
                            }
                          />
                        )}
                        {v.type === "food" && (
                          <IconToolsKitchen2 size={24} color="purple" />
                        )}
                        {v.type === "toilet" && (
                          <IconToiletPaper size={24} color="blue" />
                        )}
                        {v.type === "empty" && <IconX size={24} />}
                        <Text w="100%" ta="center">
                          {v.number === 0 ? "-" : v.number}
                        </Text>
                      </Box>
                    ))}
                  </Group>
                ))}
                <Box
                  key={i + "stage"}
                  w="100%"
                  bg={computedColorScheme === "dark" ? "green.9" : "green.2"}
                  style={{ borderRadius: "4pt" }}
                >
                  <Text w="100%" ta="center">
                    Stage
                  </Text>
                </Box>
              </Box>
            ))}
          </Stack>
        </Tabs.Panel>
      </Tabs>
    </Box>
  )
}
