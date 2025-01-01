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
  Stepper,
  Button,
  TextInput,
  PasswordInput,
  NumberInput,
} from "@mantine/core"
import {
  IconArmchair2,
  IconBuildingStore,
  IconDisabled2,
  IconFlagPin,
  IconHandLoveYou,
  IconLogin,
  IconLogout,
  IconMap,
  IconMusic,
  IconPencil,
  IconToiletPaper,
  IconToolsKitchen2,
  IconX,
} from "@tabler/icons-react"
import { helpText } from "../../../utils/wheelchairMap"
import { getUserRatingMock } from "../../../Mock/UserRating"
import { getAccountMock } from "../../../Mock/Account"
import { getLoggedInContextMock } from "../../../Mock/LoggedInContextMock"
import { useState } from "react"
import { notifications } from "@mantine/notifications"
import {
  checkIcon,
  warnIcon,
  xIcon,
} from "../../../components/NotificationIcons"
import { set } from "../../../services/localObjectStorage"

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
  const [reloadKey, setReloadKey] = useState(0)
  const forceReload = () => setReloadKey((prevKey) => prevKey + 1)

  const iconStyle = { width: rem(16), height: rem(16) }

  const myPlaces = getAccountMock()
    .tickets.filter((t) => t.split(".")[0] === id)
    .map((v) => Number.parseInt(v.split(".")[1]))

  function getSeatTooltip(
    accessibilityRating: number,
    taken: boolean,
    mine: boolean
  ): string {
    if (mine) return "Your seat"
    if (taken) return "Seat taken by someone"
    if (!getLoggedInContextMock().loggedIn)
      return "Seat free - log in to see additional accessibility information"
    const accessibility = getAccountMock().wheelchair
    if (
      (accessibility === 1 && accessibilityRating === 1) ||
      (accessibility === 2 && accessibilityRating === 2)
    )
      return "Seat free, but not recommended as a first choice, as it is harder to reach"

    if (accessibilityRating >= accessibility) return "Seat free"

    return "Seat free, but not accessible to you based on your given account settings"
  }

  function getFoodToiletTooltip(
    accessibilityRating: number,
    type: string
  ): string {
    if (!getLoggedInContextMock().loggedIn)
      return type + " - log in to see additional accessibility information"
    const accessibility = getAccountMock().wheelchair
    if (
      (accessibility === 1 && accessibilityRating === 1) ||
      (accessibility === 2 && accessibilityRating === 2)
    )
      return type + " - Not easy to reach for you"

    if (accessibilityRating >= accessibility)
      return type + " - Easy to reach for you"

    return type + " - Unreachable to you"
  }

  const getSeatBuyTooltip = (
    accessibilityRating: number,
    taken: boolean,
    mine: boolean,
    selected: boolean
  ) => {
    if (mine) return "You already bought tickets for this seat"
    if (selected) return "Seat currently selected by you"
    if (taken) return "Seat taken by someone"
    if (!getLoggedInContextMock().loggedIn)
      return "Seat free - log in to see additional accessibility information"
    const accessibility = getAccountMock().wheelchair
    if (
      (accessibility === 1 && accessibilityRating === 1) ||
      (accessibility === 2 && accessibilityRating === 2)
    )
      return "Seat free, but not recommended as a first choice, as it is harder to reach"

    if (accessibilityRating >= accessibility) return "Seat free"

    return "Seat free, but not accessible to you based on your given account settings"
  }

  function getColor(accessibilityRating: number): string {
    if (!getLoggedInContextMock().loggedIn) return "green"
    const accessibility = getAccountMock().wheelchair
    if (accessibility === 1 && accessibilityRating === 1) return "orange"
    if (accessibility === 2 && accessibilityRating === 2) return "orange"

    if (accessibilityRating >= accessibility) return "green"

    return "red"
  }

  const [email, setEmail] = useState<string>("")

  const [passwd, setPasswd] = useState<string>("")

  const register = () => {
    notifications.show({
      title: "Error",
      message:
        "This is a demo, you can't create a new account, use the account " +
        getAccountMock().email +
        " with the password " +
        getAccountMock().password,
      icon: xIcon,
      color: "red",
      position: "top-center",
    })
  }
  const login = () => {
    const account = getAccountMock()
    if (account.email === email && account.password === passwd) {
      set("loggedInContext", { loggedIn: true })
      forceReload()
      notifications.show({
        title: "Logged In",
        message: "You are now logged in, enjoy",
        icon: checkIcon,
        color: "teal",
        position: "top-center",
      })
    } else {
      notifications.show({
        title: "Wrong Email or Password",
        message:
          "Wrong email or password, as we are in demo mode, use the email " +
          getAccountMock().email +
          " with the password " +
          getAccountMock().password,
        icon: xIcon,
        color: "red",
        position: "top-center",
      })
    }
  }

  const [active, setActive] = useState(0)

  const handleStepChange = (nextStep: number) => {
    const isOutOfBounds = nextStep > 3 || nextStep < 0

    if (isOutOfBounds) {
      return
    }

    setActive(nextStep)
  }

  const [selectedSeats, setSelectedSeats] = useState<Number[]>([])
  const [standingTickets, setStandingTickets] = useState(0)

  return (
    <Box h="100%" p="md" key={reloadKey}>
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

        <Tabs.Panel value="tickets">
          <Stepper
            active={active}
            onStepClick={setActive}
            p="md"
            allowNextStepsSelect={false}
          >
            <Stepper.Step label="Overview" description="Who plays when where?">
              <Stack justify="flex-start" align="center" p="md">
                <Title>
                  {band.name.toUpperCase()} - {setlist.name}
                </Title>

                <Title order={2}>
                  {location.name} - {location.city} ({location.country}) -{" "}
                  {new Date(event.opening).toDateString()}
                </Title>
                <Button
                  onClick={(e) => {
                    handleStepChange(active + 1)
                  }}
                >
                  Buy {(event.price / 100).toFixed()}.
                  {event.price % 100 === 0 ? "-" : event.price % 100}
                </Button>
                <Image src={band.img} w="75%" h="auto" p="md" />
              </Stack>
            </Stepper.Step>
            <Stepper.Step
              label="Pick place"
              description="Pick where you want to seat"
            >
              <Stack justify="flex-start" align="center" p="md">
                <Title w="100%" ta="center">
                  Select your seat(s)
                </Title>

                {(selectedSeats.length >= 1 || standingTickets >= 1) && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      if (
                        getLoggedInContextMock().loggedIn &&
                        !(
                          location.map.some((m) =>
                            m.map.some((m) =>
                              m.some(
                                (m) =>
                                  selectedSeats.includes(m.number) &&
                                  m.accessibilityRating >=
                                    getAccountMock().wheelchair
                              )
                            )
                          ) ||
                          (standingTickets >= 0 &&
                            location.standignAccessibility >=
                              getAccountMock().wheelchair)
                        )
                      )
                        notifications.show({
                          title: "No accessible seat selected",
                          message:
                            "You haven't selected any seat you can access based on your profile. For the best expirience it is recommended to get a seat you can access",
                          icon: warnIcon,
                          color: "orange",
                          position: "top-center",
                        })
                      handleStepChange(active + 1)
                    }}
                  >
                    Next
                  </Button>
                )}
                <NumberInput
                  label="Standing tickets"
                  placeholder="Standing tickets"
                  suffix=" Tickets"
                  value={standingTickets}
                  clampBehavior="strict"
                  onChange={(e) =>
                    setStandingTickets(
                      typeof e === "number" ? e : Number.parseInt(e)
                    )
                  }
                  allowNegative={false}
                  min={0}
                  max={10}
                  mt="md"
                />

                {[...location.map].reverse().map((v, i) => (
                  <Box key={i + "box"}>
                    <Title
                      key={i + "slvl"}
                      order={2}
                      p="md"
                      w="100%"
                      ta="center"
                    >
                      Floor {location.map.length - i}
                    </Title>
                    {v.map.map((v, i) => (
                      <Group gap="xs" p="xs" key={"floorgroup" + i}>
                        {v.map((v, i) => (
                          <Box
                            key={v.number + v.type + i}
                            w={28}
                            p="2"
                            onClick={() => {
                              if (
                                v.type !== "seat" ||
                                event.seatsTaken.includes(v.number)
                              )
                                return
                              if (selectedSeats.includes(v.number)) {
                                setSelectedSeats(
                                  selectedSeats.filter((n) => n !== v.number)
                                )
                              } else {
                                setSelectedSeats([v.number, ...selectedSeats])
                              }
                            }}
                            bg={
                              selectedSeats.includes(v.number)
                                ? "cyan"
                                : computedColorScheme === "dark"
                                ? "dark"
                                : "blue.2"
                            }
                            style={{
                              borderRadius: "4pt",
                              cursor:
                                event.seatsTaken.includes(v.number) ||
                                v.type !== "seat"
                                  ? "default"
                                  : "pointer",
                            }}
                          >
                            {v.type === "seat" && (
                              <Tooltip
                                label={getSeatBuyTooltip(
                                  v.accessibilityRating,
                                  event.seatsTaken.includes(v.number),
                                  myPlaces.includes(v.number),
                                  selectedSeats.includes(v.number)
                                )}
                                openDelay={250}
                              >
                                <IconArmchair2
                                  size={24}
                                  color={
                                    myPlaces.includes(v.number)
                                      ? "cyan"
                                      : event.seatsTaken.includes(v.number)
                                      ? "gray"
                                      : getColor(v.accessibilityRating)
                                  }
                                />
                              </Tooltip>
                            )}
                            {v.type === "food" && (
                              <Tooltip
                                label={getFoodToiletTooltip(
                                  v.accessibilityRating,
                                  "Food"
                                )}
                                openDelay={250}
                              >
                                <IconToolsKitchen2 size={24} color="purple" />
                              </Tooltip>
                            )}
                            {v.type === "toilet" && (
                              <Tooltip
                                label={getFoodToiletTooltip(
                                  v.accessibilityRating,
                                  "Toilet"
                                )}
                                openDelay={250}
                              >
                                <IconToiletPaper size={24} color="blue" />
                              </Tooltip>
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
                      bg={
                        computedColorScheme === "dark" ? "green.9" : "green.2"
                      }
                      style={{ borderRadius: "4pt" }}
                    >
                      <Text w="100%" ta="center">
                        Stage
                      </Text>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Stepper.Step>
            <Stepper.Step
              label="Verify account"
              description="Confirm account or log in"
            >
              {getLoggedInContextMock().loggedIn ? (
                <Stack justify="flex-start" align="center" p="md">
                  <Title>You are logged in as {getAccountMock().email}</Title>
                  <Group>
                    <Button
                      variant="outline"
                      onClick={() => {
                        set("loggedInContext", { loggedIn: false })
                        forceReload()
                        notifications.show({
                          title: "Logged Out",
                          message: "You are no longer logged in, enjoy",
                          icon: checkIcon,
                          color: "teal",
                          position: "top-center",
                        })
                      }}
                      leftSection={<IconLogout size={14} />}
                    >
                      Log Out
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleStepChange(active + 1)}
                    >
                      Next
                    </Button>
                  </Group>
                </Stack>
              ) : (
                <Stack p="md" align="center" justify="center" miw="25%" mt="xl">
                  <TextInput
                    required
                    miw="25%"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    label="Email"
                  />
                  <PasswordInput
                    required
                    miw="25%"
                    value={passwd}
                    onChange={(e) => setPasswd(e.target.value)}
                    label="Password"
                  />
                  <Button
                    m="sm"
                    miw="25%"
                    variant="outline"
                    onClick={login}
                    leftSection={<IconLogin size={14} />}
                  >
                    Login
                  </Button>
                  <Button
                    miw="25%"
                    variant="outline"
                    onClick={register}
                    leftSection={<IconPencil size={14} />}
                  >
                    Register Instead
                  </Button>
                </Stack>
              )}
            </Stepper.Step>
            <Stepper.Step label="Pay" description="Select your payment option">
              Step 3 content: Get full access
              {/** TODO: show price and ask for bill, credit card or at entry */}
            </Stepper.Step>
            <Stepper.Completed>
              Completed, click back button to get to previous step
              {/** TODO: Show summary and add a button to get back to the start page*/}
            </Stepper.Completed>
          </Stepper>
        </Tabs.Panel>

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
                <Group wrap="nowrap" p="md" key={v.id + "rating"}>
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
            {location.img.map((v, i) => (
              <Image key={"img" + i} src={v} w="auto" maw={600} h={400} />
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
            {location.img.map((v, i) => (
              <Image key={"img" + i + "b"} src={v} w="auto" maw={600} h={400} />
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
                key={"setlistgroup" + v.song}
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
                  Floor {i + 1}
                </Title>
                <Image
                  key={i + "img" + 1}
                  src={v.img}
                  maw="90vw"
                  w="auto"
                  h="auto"
                  mah="70vh"
                />
              </>
            ))}
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="seats">
          <Stack justify="flex-start" align="center" p="md">
            <Title p="md">{location.name} - Seat Arangement</Title>
            {[...location.map].reverse().map((v, i) => (
              <Box key={i + "floor"}>
                <Title key={i + "slvl"} order={2} p="md" w="100%" ta="center">
                  Floor {location.map.length - i}
                </Title>
                {v.map.map((v, i) => (
                  <Group gap="xs" p="xs" key={i + "seatline"}>
                    {v.map((v, i) => (
                      <Box
                        key={v.number + v.type + i + "b"}
                        w={28}
                        p="2"
                        bg={computedColorScheme === "dark" ? "dark" : "blue.2"}
                        style={{ borderRadius: "4pt" }}
                      >
                        {v.type === "seat" && (
                          <Tooltip
                            label={getSeatTooltip(
                              v.accessibilityRating,
                              event.seatsTaken.includes(v.number),
                              myPlaces.includes(v.number)
                            )}
                            openDelay={250}
                          >
                            <IconArmchair2
                              size={24}
                              color={
                                myPlaces.includes(v.number)
                                  ? "cyan"
                                  : event.seatsTaken.includes(v.number)
                                  ? "gray"
                                  : getColor(v.accessibilityRating)
                              }
                            />
                          </Tooltip>
                        )}
                        {v.type === "food" && (
                          <Tooltip
                            label={getFoodToiletTooltip(
                              v.accessibilityRating,
                              "Food"
                            )}
                            openDelay={250}
                          >
                            <IconToolsKitchen2 size={24} color="purple" />
                          </Tooltip>
                        )}
                        {v.type === "toilet" && (
                          <Tooltip
                            label={getFoodToiletTooltip(
                              v.accessibilityRating,
                              "Toilet"
                            )}
                            openDelay={250}
                          >
                            <IconToiletPaper size={24} color="blue" />
                          </Tooltip>
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
