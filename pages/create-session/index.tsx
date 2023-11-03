
import React, {useState} from "react";
import {useForm} from "@mantine/form"
import spyfall from "../../public/games/spyfall.jpg"

import {
  Button,
  Checkbox,
  Flex,
  Grid, GridCol,
  Image,
  NumberInput,
  SimpleGrid,
  Space,
  Stack,
  Text,
  Textarea,
  TextInput
} from "@mantine/core";
import NextImage from "next/image";

export default function CreateSession() {
  const [key, setKey] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');


  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/Spyfall', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          playersCount: form.values.playersCount,
          spiesCount: form.values.spiesCount,
          randomSeed: form.values.randomSeed,
        }),
      });

      if (response.ok) {
        const data = await response.text(); // Получите текст из ответа
        setResponseMessage(data); // Обновите состояние с текстом ответа
      } else {
        const errorData = await response.text(); // Получите текст из ответа
        setErrorMessage(errorData || 'Произошла ошибка при создании комнаты');
      }
    } catch (error) {
      console.error('Произошла ошибка при отправке запроса:', error);
      setErrorMessage('Произошла ошибка при отправке запроса');
    }
  };

  function generateRandomKey() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 16; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }


  // ...

  const handleGenerateKey = () => {
    const randomKey = generateRandomKey();
    setKey(randomKey);
  };

  const form = useForm({
    initialValues: { randomSeed: '', spiesCount: 1, playersCount: 2 },
    validate: {
      randomSeed: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
      spiesCount: (value) => (value < 18 ? 'You must be at least 18 to register' : null),
      playersCount: (value) => (value < 18 ? 'You must be at least 18 to register' : null),
    },
  });

  return (
    <>
      <Flex align={"center"} justify={"center"} gap={"xl"} >
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
            <Flex gap={"xl"}>
              <TextInput label="Seed" placeholder="ввести..." {...form.getInputProps('randomSeed')} />
              <TextInput label="Ваше имя" placeholder="ввести..." {...form.getInputProps('names')} />
            </Flex>
            <Space h={"lg"}></Space>
            <Grid>
              <GridCol>
                <TextInput value={responseMessage} readOnly/>
              </GridCol>
              <GridCol span="content">

                <Button variant="gradient" gradient={{ from: 'teal', to: 'blue', deg: 60 }} type={"submit"} onClick={handleSubmit}>
                  Сгенерировать ключ
                </Button>
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
            <a href={"/games/spyfall"}>
              <Button type={"submit"} onClick={handleSubmit} mt="sm">
                Создать комнату
              </Button>
            </a>
          </form>
          {/* Отобразите сообщение об ошибке, если есть */}
          {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
          <Space h={"lg"}></Space>
        </Stack>
      </Flex>
    </>
  )
}