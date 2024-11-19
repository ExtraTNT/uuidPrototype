import {
  Avatar,
  Blockquote,
  Center,
  ScrollArea,
  SimpleGrid,
} from "@mantine/core"

export const Home = () => {
  return (
    <ScrollArea h="100%">
      <Center p="xl">
        <Blockquote
          color="blue"
          cite="- The evil guy behind the tree"
          mt="xl"
          w="75%"
        >
          hahaha I will eat you, hahaha
        </Blockquote>
      </Center>
    </ScrollArea>
  )
}
