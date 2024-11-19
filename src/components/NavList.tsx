import { Avatar, NavLink, ScrollArea, Stack } from "@mantine/core"
import {
  IconBuildingStore,
  IconCalendarTime,
  IconChartDots,
  IconHome2,
  IconMonkeybar,
  IconSchool,
} from "@tabler/icons-react"
import { accountMock } from "../Mock/Account"

export const NavList = () => {
  return (
    <ScrollArea h="100%">
      <Stack>
        <NavLink
          href="/account"
          label={
            accountMock.email.length > 33
              ? accountMock.email.substring(0, 30) + "..."
              : accountMock.email
          }
          leftSection={<Avatar radius="xl" src={accountMock.avatar} />}
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
