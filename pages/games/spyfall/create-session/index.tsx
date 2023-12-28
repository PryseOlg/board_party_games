import React, { useState, useEffect } from "react";
import { isInRange, useForm } from "@mantine/form";
import spyfall from "../../../../public/games/spyfall.jpg";

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
  Text, Box, CopyButton,
} from "@mantine/core";
import NextImage from "next/image";

export default function CreateSession() {
  const [key, setKey] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [selectedDeck, setSelectedDeck] = useState(['']);
  const [copied, setCopied] = useState(false);
  const [roomId, setRoomId] = useState('');

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
      const response = await fetch('http://localhost:80/Spyfall', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          decks: selectedDeck,
          playersCount: form.values.playersCount,
          spiesCount: form.values.spiesCount,
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
    initialValues: { spiesCount: 1, playersCount: 3, deckName: null },
    validate: {
      playersCount: isInRange({ min: 3, max: 12 }, 'Игроков не может быть меньше чем 3 и больше чем 12'),
      deckName: isInRange({ min: 1, max: 2 }, 'Игроков не может быть меньше чем 1 и больше чем 2'),
      spiesCount: (value, formValues) => {
        if (value < 1) {
          return 'Шпионов должно быть не меньше чем 1';
        } else if (value > 2) {
          return 'Шпионов не может быть больше чем 2';
        }
        return null;
      },
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
            src={spyfall}
            alt={"edfe"}
          />
          <Text>Создание комнаты для игры SpyFall</Text>
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
              </GridCol>
            </Grid>
            <NumberInput
              mt="sm"
              label="Кол-во игроков"
              min={0}
              max={10}
              {...form.getInputProps('playersCount')}
            />
            <NumberInput
              mt="sm"
              label="Кол-во шпионов"
              min={0}
              max={10}
              {...form.getInputProps('spiesCount')}
            />
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

        <Flex mih={50}
              gap="md"
              justify="center"
              align="center"
              direction="column"
              wrap="wrap">
          {roomId && (
            <>
              <Flex align="center">
                <p>Комната успешно создана! Ключ комнаты: {roomId}</p>
                <Space ml="sm" />
                <CopyButton value={roomId}>
                  {({ copied, copy }) => (
                    <Button color={copied ? 'teal' : 'blue'} onClick={copy}>
                      {copied ? 'Скопировано!' : 'Скопировать ключ комнаты'}
                    </Button>
                  )}
                </CopyButton>
              </Flex>
              <Space mt="sm" />
              <a href={`/games/spyfall`}>
                <Button color="blue">
                  Перейти в игру
                </Button>
              </a>
            </>
          )}
          <Space mt="xl" />
          <Space mt="xl" />
        </Flex>
    </>
  );
}
