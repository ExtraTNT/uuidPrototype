import {
  AppShell,
  AppShellFooter,
  Box,
  Burger,
  Flex,
  Group,
  Title,
  Tooltip,
} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { ColorToggler } from "./components/ColorToggler"
import { NavList } from "./components/NavList"
import { CustomRouter } from "./Router/CustomRouter"

export const App = () => {
  const [opened, { toggle }] = useDisclosure()

  return (
    <AppShell
      header={{ height: 60 }}
      h="100vh"
      navbar={{
        width: 400,
        breakpoint: "sm",
        collapsed: { mobile: !opened, desktop: !opened },
      }}
    >
      <AppShell.Header>
        <Group grow justify="space-between" h="100%">
          <Tooltip
            label={(opened ? "Close" : "Open") + " navigation sidebar"}
            openDelay={250}
            offset={{ crossAxis: -250 }}
          >
            <Burger p="md" opened={opened} onClick={toggle} />
          </Tooltip>
          <Flex
            justify="center"
            align="center"
            direction="column"
            wrap="nowrap"
          >
            <Title m="0" p="0" textWrap="nowrap">
              UUID Ticket Portal
            </Title>
          </Flex>
          <Flex justify="flex-end" align="center" direction="row" wrap="nowrap">
            <Box px="md">
              <ColorToggler />
            </Box>
          </Flex>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">{opened && <NavList />}</AppShell.Navbar>
      <AppShell.Main h="100%">
        <CustomRouter />
      </AppShell.Main>
      <AppShellFooter></AppShellFooter>
    </AppShell>
  )
}

export default App
