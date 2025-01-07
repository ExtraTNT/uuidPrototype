import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getEventMock } from "../../../Mock/Event";
import { getBandMock } from "../../../Mock/Band";
import { getSetlistMock } from "../../../Mock/SetList";
import { getLocationMock } from "../../../Mock/Location";
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
  Radio,
} from "@mantine/core";
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
} from "@tabler/icons-react";
import { helpText } from "../../../utils/wheelchairMap";
import { getUserRatingMock } from "../../../Mock/UserRating";
import { getAccountMock } from "../../../Mock/Account";
import { getLoggedInContextMock } from "../../../Mock/LoggedInContextMock";
import { useLayoutEffect, useState } from "react";
import { notifications } from "@mantine/notifications";
import {
  checkIcon,
  warnIcon,
  xIcon,
} from "../../../components/NotificationIcons";
import { set } from "../../../services/localObjectStorage";

export const EventDetail = () => {
  const navigate = useNavigate();
  const loc = useLocation();

  // scroll to top of page after a page transition.
  useLayoutEffect(() => {
    document.documentElement.scrollTo({ top: 0, left: 0 });
  }, [loc.pathname]);

  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  const { id } = useParams();
  const event = getEventMock().filter((e) => e.id === id)[0];
  const band = getBandMock().filter((b) => b.id === event.band)[0];
  const setlist = getSetlistMock().filter((s) => s.id === event.setlist)[0];
  const location = getLocationMock().filter((l) => l.id === event.location)[0];
  const reviews = getUserRatingMock().filter((r) =>
    location.ratings.includes(r.id)
  );
  const account = getAccountMock();
  const [reloadKey, setReloadKey] = useState(0);
  const forceReload = () => setReloadKey((prevKey) => prevKey + 1);

  const iconStyle = { width: rem(16), height: rem(16) };

  const myPlaces = account.tickets
    .filter((t) => t.split(".")[0] === id)
    .map((v) => Number.parseInt(v.split(".")[1]));

  function getSeatTooltip(
    accessibilityRating: number,
    taken: boolean,
    mine: boolean
  ): string {
    if (mine) return "Your seat";
    if (taken) return "Seat taken by someone";
    if (!getLoggedInContextMock().loggedIn)
      return "Seat free - log in to see additional accessibility information";
    const accessibility = account.wheelchair;
    if (
      (accessibility === 1 && accessibilityRating === 1) ||
      (accessibility === 2 && accessibilityRating === 2)
    )
      return "Seat free, but not recommended as a first choice, as it is harder to reach";

    if (accessibilityRating >= accessibility) return "Seat free";

    return "Seat free, but not accessible to you based on your given account settings";
  }

  function getFoodToiletTooltip(
    accessibilityRating: number,
    type: string
  ): string {
    if (!getLoggedInContextMock().loggedIn)
      return type + " - log in to see additional accessibility information";
    const accessibility = account.wheelchair;
    if (
      (accessibility === 1 && accessibilityRating === 1) ||
      (accessibility === 2 && accessibilityRating === 2)
    )
      return type + " - Not easy to reach for you";

    if (accessibilityRating >= accessibility)
      return type + " - Easy to reach for you";

    return type + " - Unreachable to you";
  }

  const getSeatBuyTooltip = (
    accessibilityRating: number,
    taken: boolean,
    mine: boolean,
    selected: boolean
  ) => {
    if (mine) return "You already bought tickets for this seat";
    if (selected) return "Seat currently selected by you";
    if (taken) return "Seat taken by someone";
    if (!getLoggedInContextMock().loggedIn)
      return "Seat free - log in to see additional accessibility information";
    const accessibility = account.wheelchair;
    if (accessibility <= 1 && accessibility >= 3)
      return "Seat for wheelchair users only";
    if (
      (accessibility === 1 && accessibilityRating === 1) ||
      (accessibility === 2 && accessibilityRating === 2)
    )
      return "Seat free, but not recommended as a first choice, as it is harder to reach";

    if (accessibilityRating >= accessibility) return "Seat free";

    return "Seat free, but not accessible to you based on your given account settings";
  };

  function getColor(accessibilityRating: number): string {
    if (!getLoggedInContextMock().loggedIn) return "green";
    const accessibility = account.wheelchair;
    if (accessibility <= 1 && accessibilityRating >= 3) return "orange";
    if (accessibility === 1 && accessibilityRating === 1) return "orange";
    if (accessibility === 2 && accessibilityRating === 2) return "orange";

    if (accessibilityRating >= accessibility) return "green";

    return "red";
  }

  const [email, setEmail] = useState<string>("");

  const [passwd, setPasswd] = useState<string>("");

  const register = () => {
    notifications.show({
      title: "Error",
      message:
        "This is a demo, you can't create a new account, use the account " +
        account.email +
        " with the password " +
        account.password,
      icon: xIcon,
      color: "red",
      position: "top-center",
    });
  };
  const login = () => {
    if (account.email === email && account.password === passwd) {
      set("loggedInContext", { loggedIn: true });
      forceReload();
      notifications.show({
        title: "Logged In",
        message: "You are now logged in, enjoy",
        icon: checkIcon,
        color: "teal",
        position: "top-center",
      });
    } else {
      notifications.show({
        title: "Wrong Email or Password",
        message:
          "Wrong email or password, as we are in demo mode, use the email " +
          account.email +
          " with the password " +
          account.password,
        icon: xIcon,
        color: "red",
        position: "top-center",
      });
    }
  };
  const getCost = () => (selectedSeats.length + standingTickets) * event.price;

  const [active, setActive] = useState(0);
  const [highestStepVisited, setHighestStepVisited] = useState(active);

  const handleStepChange = (nextStep: number) => {
    const isOutOfBounds = nextStep > 4 || nextStep < 0;

    if (isOutOfBounds) {
      return;
    }

    setActive(nextStep);
    setHighestStepVisited((hSC) => Math.max(hSC, nextStep));
  };

  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [standingTickets, setStandingTickets] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("bill");

  const shouldAllowSelectStep = (step: number) =>
    highestStepVisited >= step && active !== step && active !== 4;

  const buy = () => {
    selectedSeats.forEach((s) => {
      account.tickets.push(event.id + "." + s);
    });
    event.seatsTaken.push(...selectedSeats);
    for (let i = 0; i < standingTickets; i++) {
      account.tickets.push(event.id + ".s");
    }
    let eventMock = getEventMock();

    eventMock = [event, ...eventMock.filter((e) => e.id !== event.id)];

    set("event", eventMock);
    set("account", account);
  };

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
            <Stepper.Step
              label="Overview"
              description="Who plays when where?"
              allowStepSelect={shouldAllowSelectStep(0)}
            >
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
                    handleStepChange(active + 1);
                  }}
                >
                  Buy {(event.price / 100).toFixed()}.
                  {event.price % 100 === 0 ? "-" : event.price % 100}
                </Button>
                <Image src={band.img} w="75%" h="auto" p="md" />
              </Stack>
            </Stepper.Step>
            <Stepper.Step
              label="Pick Seat"
              description="Pick where you want to seat"
              allowStepSelect={shouldAllowSelectStep(1)}
            >
              <Stack justify="flex-start" align="center" p="md">
                <Title w="100%" ta="center">
                  Select your seat(s)
                </Title>
                <Group align="flex-end">
                  {location.standingPlaces && (
                    <Tooltip
                      openDelay={250}
                      label={
                        "Standing places can be accessed by people who have / are: " +
                        helpText[location.standignAccessibility]
                      }
                    >
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
                    </Tooltip>
                  )}
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
                                    m.accessibilityRating >= account.wheelchair
                                )
                              )
                            ) ||
                            (standingTickets >= 0 &&
                              location.standignAccessibility >=
                                account.wheelchair)
                          )
                        )
                          notifications.show({
                            title: "No accessible seat selected",
                            message:
                              "You haven't selected any seat you can access based on your profile. For the best expirience it is recommended to get a seat you can access",
                            icon: warnIcon,
                            color: "orange",
                            position: "top-center",
                          });
                        handleStepChange(active + 1);
                      }}
                    >
                      Next
                    </Button>
                  )}
                </Group>
              </Stack>
              <Stack justify="center" align="stretch" w="100%">
                <SimpleGrid
                  cols={{
                    base: 1,
                    "1200px":
                      location.map.length >= 2 ? 2 : location.map.length,
                    "1800px":
                      location.map.length >= 3 ? 3 : location.map.length,
                  }}
                  p="md"
                  w="auto"
                  type="container"
                >
                  {[...location.map].reverse().map((v, i) => (
                    <Stack key={i + "box"} align="center">
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
                                  return;
                                if (selectedSeats.includes(v.number)) {
                                  setSelectedSeats(
                                    selectedSeats.filter((n) => n !== v.number)
                                  );
                                } else {
                                  setSelectedSeats([
                                    v.number,
                                    ...selectedSeats,
                                  ]);
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
                        maw={300}
                        bg={
                          computedColorScheme === "dark" ? "green.9" : "green.2"
                        }
                        style={{ borderRadius: "4pt" }}
                      >
                        <Text w="100%" ta="center">
                          Stage
                        </Text>
                      </Box>
                    </Stack>
                  ))}
                </SimpleGrid>
              </Stack>
            </Stepper.Step>
            <Stepper.Step
              label="Verify Account"
              description="Confirm account or log in"
              allowStepSelect={shouldAllowSelectStep(2)}
            >
              {getLoggedInContextMock().loggedIn ? (
                <Stack justify="flex-start" align="center" p="md">
                  <Title>You are logged in as {account.email}</Title>
                  <Group>
                    <Button
                      variant="outline"
                      onClick={() => {
                        set("loggedInContext", { loggedIn: false });
                        forceReload();
                        notifications.show({
                          title: "Logged Out",
                          message: "You are no longer logged in, enjoy",
                          icon: checkIcon,
                          color: "teal",
                          position: "top-center",
                        });
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
            <Stepper.Step
              label="Pay"
              description="Select your payment option"
              allowStepSelect={shouldAllowSelectStep(3)}
            >
              <Stack justify="flex-start" align="center" p="md">
                <Title w="100%" ta="center">
                  Payment
                </Title>
                <Text>
                  {selectedSeats.length} Seat
                  {selectedSeats.length > 1 ? "s" : ""} + {standingTickets}{" "}
                  Standing ticket = {(getCost() / 100).toFixed()}.
                  {getCost() % 100 === 0 ? "-" : getCost() % 100}
                </Text>
                <Radio.Group
                  name="paymentSystem"
                  label="Payment System"
                  description="Select your payment system"
                  value={paymentMethod}
                  onChange={setPaymentMethod}
                >
                  <Group mt="xs">
                    <Tooltip
                      openDelay={250}
                      label="You will get a bill in your mail within 2 - 5 days"
                    >
                      <Radio value="bill" label="Bill" />
                    </Tooltip>
                    <Tooltip openDelay={250} label="Pay with your creditcard">
                      <Radio value="credit" label="Credit Card" />
                    </Tooltip>
                    <Tooltip
                      openDelay={250}
                      label="You pay directly at the location at the day of the event"
                    >
                      <Radio
                        value="location"
                        label="Directly at the location"
                      />
                    </Tooltip>
                  </Group>
                </Radio.Group>
                <Button
                  variant="outline"
                  onClick={() => {
                    buy();
                    handleStepChange(active + 1);
                  }}
                >
                  Buy
                </Button>
              </Stack>
            </Stepper.Step>
            <Stepper.Completed>
              <Stack justify="flex-start" align="center" p="md">
                <Title w="100%" ta="center">
                  Completed
                </Title>
                <Text>
                  We receved your payment of {(getCost() / 100).toFixed()}.
                  {getCost() % 100 === 0 ? "-" : getCost() % 100} than you for
                  your purchase.
                </Text>

                <Button variant="outline" onClick={() => navigate("/")}>
                  Back to Home
                </Button>
              </Stack>
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
                  <Avatar src={account.avatar} radius="xl" size="lg" />
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
                      return "Very bad accessibility";
                    case 2:
                      return "Bad accessibility";
                    case 3:
                      return "Ok accessibility";
                    case 4:
                      return "Good accessibility";
                    case 5:
                      return "Perfect or almost perfect accessibility";
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
            <Tooltip label="Imagine this being google maps" openDelay={100}>
              <Image
                src={location.streetMap}
                maw="90vw"
                w="auto"
                h="auto"
                mah="70vh"
              />
            </Tooltip>
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
          </Stack>
          {[...location.map].reverse().map((v, i) => (
            <Box key={i + "floor"}>
              <Title key={i + "slvl"} order={2} p="md" w="100%" ta="center">
                Floor {location.map.length - i}
              </Title>
              <Stack justify="center" align="stretch" w="100%">
                <SimpleGrid
                  cols={{ base: 1, "1200px": 2 }}
                  p="md"
                  w="auto"
                  type="container"
                >
                  <Stack align="center" w="100%">
                    {v.map.map((v, i) => (
                      <Group gap="xs" p="xs" key={i + "seatline"}>
                        {v.map((v, i) => (
                          <Box
                            key={v.number + v.type + i + "b"}
                            w={28}
                            p="2"
                            bg={
                              computedColorScheme === "dark" ? "dark" : "blue.2"
                            }
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
                      w="auto"
                      miw={300}
                      bg={
                        computedColorScheme === "dark" ? "green.9" : "green.2"
                      }
                      style={{ borderRadius: "4pt" }}
                    >
                      <Text w="100%" ta="center">
                        Stage
                      </Text>
                    </Box>
                  </Stack>
                  <Center>
                    <Image mah="50vh" w="auto" src={v.img} />
                  </Center>
                </SimpleGrid>
              </Stack>
            </Box>
          ))}
        </Tabs.Panel>
      </Tabs>
    </Box>
  );
};
