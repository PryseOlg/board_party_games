import {Badge, Box, Button, Card, Flex, Grid, Group, Image, Space, Text} from "@mantine/core";

export default function Index() {
  return (
    <Box>
      <Flex direction="column" >
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section>
            <Image
              src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
              height={160}
              alt="Norway"
            />
          </Card.Section>

          <Group justify="space-between" mt="md" mb="xs">
            <Text fw={500}>Создание комнаты</Text>
          </Group>

          <Text size="sm" c="dimmed">
            Здесь вы можете создать игровую комнату, скопировать ключ и разослать его другим людям для игры вместе!
          </Text>

          <Button variant="light" color="blue" fullWidth mt="md" radius="md">
            Создать комнату
          </Button>
        </Card>

        <Space h="xl" />

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section>
            <Image
              src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
              height={160}
              alt="Norway"
            />
          </Card.Section>

          <Group justify="space-between" mt="md" mb="xs">
            <Text fw={500}>Присоединение к игре</Text>
          </Group>

          <Text size="sm" c="dimmed">
            Здесь вы можете ввести ключ, чтобы играть со своими друзьями
          </Text>

          <Button variant="light" color="blue" fullWidth mt="md" radius="md">
            Ввести ключ
          </Button>
        </Card>
      </Flex>
    </Box>
  )
}