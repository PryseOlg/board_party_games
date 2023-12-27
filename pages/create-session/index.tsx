import React, { useState, useEffect } from "react";
import { useForm } from "@mantine/form";
import spyfall from "../../public/games/spyfall.jpg";

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
  Text,
} from "@mantine/core";
import NextImage from "next/image";

export default function CreateSession() {
  const [key, setKey] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [selectedDeck, setSelectedDeck] = useState('');
  const [copied, setCopied] = useState(false);


  const handleSubmitGetLocations = async () => {
    try {
      const response = await fetch(`http://localhost:8080/Spyfall/getDeck`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSelectedDeck(data[0]);
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

  const handleSubmitCreateRoom = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/Spyfall', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          deckName: selectedDeck,
          playersCount: form.values.playersCount,
          spiesCount: form.values.spiesCount,
        }),
      });

      if (response.ok) {
        const data = await response.text();
        setResponseMessage(data);
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
    initialValues: { spiesCount: 1, playersCount: 3, deckName: ['Стандартная колода'] },
    validate: {
      spiesCount: (value, formValues) => {
        if (value < 1) {
          return 'Шпионов должно быть не меньше чем 1';
        } else if (value > formValues.playersCount) {
          return 'Шпионов не может быть больше, чем игроков';
        }
        return null;
      },
      playersCount: (value) => (value < 3 ? 'Игроков должно быть не меньше чем 3' : null),
    },
  });

  // Вызовем handleSubmitGetLocations при загрузке страницы
  useEffect(() => {
    handleSubmitGetLocations();
  }, []);

  useEffect(() => {
    console.log('form values:', form.values);
    console.log('form errors:', form.errors);
  }, [form.values, form.errors]);

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
                  data={form.values.deckName} // Замените на данные, полученные из handleSubmitGetLocations
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
    </>
  );
}
