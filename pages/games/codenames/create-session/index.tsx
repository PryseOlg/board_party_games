import React, { useState, useEffect } from "react";
import { isInRange, useForm } from "@mantine/form";
import codenames from "../../../../public/games/spyfall.jpg";

import {
  Button,
  Flex,
  Grid,
  GridCol,
  Image,
  NumberInput,
  Select,
  Space,
  Stack,
  ActionIcon,
  Text, Box, CopyButton, Tooltip, SegmentedControl, Textarea,
} from "@mantine/core";
import NextImage from "next/image";

export default function CreateSession() {
  const [errorMessage, setErrorMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [selectedDeck, setSelectedDeck] = useState(['']);
  const [copied, setCopied] = useState(false);
  const [roomId, setRoomId] = useState('');
  const [wordOption, setWordOption] = useState("false");


  const handleSubmitGetLocations = async () => {
    try {
      const response = await fetch(`http://localhost:80/spyfall/decks`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSelectedDeck(data);
        setResponseMessage('');
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData || 'Произошла ошибка при получении доступных колод');
      }
    } catch (error) {
      console.error('Произошла ошибка при отправке запроса:', error);
      setErrorMessage('Произошла ошибка при отправке запроса');
    }
  };

  useEffect(() => {
    handleSubmitGetLocations();
  }, []);

  const handleSubmitCreateRoom = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:80/codenames/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          decks: selectedDeck,
          playersCount: form.values.playersCount,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setResponseMessage(`Комната успешно создана! ID комнаты: ${data.id}`);
        setRoomId(data.id);
      } else {
        const errorData = await response.text();
        setErrorMessage(errorData || 'Произошла ошибка при создании комнаты');
      }
    } catch (error) {
      console.error('Произошла ошибка при создании комнаты:', error);
      setErrorMessage('Произошла ошибка при создании комнаты');
    }
  };

  const form = useForm({
    initialValues: {playersCount: 4, deckName: null, customWords: '' },
    validate: {
      playersCount: isInRange({ min: 4, max: 12 }, 'Игроков не может быть меньше чем 3 и больше чем 12'),
    },
  });

  return (
    <>
      <Stack align={"center"} justify={"center"} gap={"xl"}>
        <Space h="xl" />
        <Stack align={"center"} justify={"center"} color={"white"}>
          <Space h={"lg"}></Space>
          <Image
            component={NextImage}
            height={200}
            radius="md"
            src={codenames}
            alt={"edfe"}
          />
          <Text>Создание комнаты для игры Codenames</Text>
          <form onSubmit={form.onSubmit(console.log)}>
            <Space h={"lg"}></Space>
            <Grid>
              <GridCol span="content">
                <Select
                  label="Список колод"
                  placeholder="Выбрать..."
                  data={selectedDeck}
                  {...form.getInputProps('deckName')}
                />
                <Space h="md" />

                <SegmentedControl
                  value={wordOption}
                  onChange={setWordOption}
                  data={[
                    { label: 'Я хочу добавить свои слова', value: 'true' },
                    { label: 'Я не хочу добавлять свои слова', value: 'false' },
                  ]}
                />
              </GridCol>
            </Grid>
            <Textarea
              label="Ваши слова"
              placeholder="Введите свои слова через запятую..."
              {...form.getInputProps('customWords')}
              style={{ display: wordOption === 'true' ? 'block' : 'none' }}
            />

            <Tooltip label="Для этой игры нужно минимум 4 игрока">
            <NumberInput
              mt="sm"
              label="Кол-во игроков"
              min={0}
              max={10}
              {...form.getInputProps('playersCount')}
            />
            </Tooltip>


            <ActionIcon
              onClick={() => {
                navigator.clipboard.writeText(responseMessage);
                setCopied(true);
              }}
              title={copied ? 'Скопировано!' : 'Скопировать ключ'}
              radius="sm"
              size="sm"
              variant="transparent"
            >
            </ActionIcon>
            <a href={"/games/spyfall"}>
              <Button type="submit" onClick={handleSubmitCreateRoom} mt="sm">
                Создать комнату
              </Button>
            </a>
          </form>
          {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
          <Space h={"lg"}></Space>
        </Stack>
      </Stack>

      <Box>
        <Stack align={"center"} justify={"center"}>
          {roomId && <p>Комната успешно создана! Ключ комнаты: {roomId}</p>}
          {roomId && (
            <CopyButton value={roomId}>
              {({ copied, copy }) => (
                <Button color={copied ? 'teal' : 'blue'} onClick={copy}>
                  {copied ? 'Ключ комнаты скопирован!' : 'Скопировать ключ комнаты и зайти в игру'}
                </Button>
              )}
            </CopyButton>
          )}
        </Stack>

      </Box>
      <Space h="xl" />
      <Space h="xl" />


    </>
  );
}
