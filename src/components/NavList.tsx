import { Avatar, NavLink, ScrollArea, Stack } from "@mantine/core"
import { IconBuildingStore, IconHome2 } from "@tabler/icons-react"
import { getAccountMock } from "../Mock/Account"

export const NavList = () => {
  return (
    <ScrollArea h="100%">
      <Stack>
        <NavLink
          href="/account"
          label={
            getAccountMock().email.length > 33
              ? getAccountMock().email.substring(0, 30) + "..."
              : getAccountMock().email
          }
          leftSection={<Avatar radius="xl" src={getAccountMock().avatar} />}
        />
        <NavLink
          href="/"
          label="Home"
          leftSection={<IconHome2 size="1rem" stroke={1.5} />}
        />
        <NavLink
          href="/store/events"
          label="Discover Events"
          leftSection={<IconBuildingStore size="1rem" stroke={1.5} />}
        />
      </Stack>
    </ScrollArea>
  )
}
