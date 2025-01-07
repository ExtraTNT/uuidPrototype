import { Box, Center, Collapse, Flex, Progress, Title } from "@mantine/core"
import { useTimeout } from "@mantine/hooks"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const NotFound = () => {
  const [value, setValue] = useState(0)
  const [color, setColor] = useState("blue")
  const [moreText, setMoreText] = useState(false)

  const initialDelay = 200
  const transitionDuration = 1000
  const moreTextDelay = 1000

  useTimeout(() => setValue(100), initialDelay).start()
  useTimeout(() => setColor("red"), initialDelay + transitionDuration).start()
  useTimeout(
    () => setMoreText(true),
    initialDelay + transitionDuration + moreTextDelay
  ).start()
  const navigate = useNavigate()

  return (
    <Center w="100%">
      <Flex
        direction="column"
        justify="space-around"
        align="center"
        gap="md"
        wrap="wrap"
        style={{
          margin: "0",
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          width: "max-content",
        }}
      >
        <Box w="50vw">
          <Progress
            value={value}
            size="xl"
            transitionDuration={transitionDuration}
            color={color}
            w="100%"
          />
          <Collapse in={color === "red"}>
            <Title size="64pt" p="md" ff="monospace">
              404
            </Title>
          </Collapse>
          <Collapse
            in={moreText}
            transitionDuration={100}
            transitionTimingFunction="linear"
          >
            <Title p="md" ff="monospace">
              There was a problem. We can not find what you are asking for...
            </Title>
            <Title
              p="md"
              onClick={() => navigate("/")}
              style={{ cursor: "pointer" }}
            >
              Click here to return to the site...
            </Title>
          </Collapse>
        </Box>
      </Flex>
    </Center>
  )
}
