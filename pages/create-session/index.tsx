import React, {useState} from "react";
import {useForm} from "@mantine/form"

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

export default function CreateSession() {
  const [key, setKey] = useState('');

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
    initialValues: { name: '', email: '', age: 0 },
    // functions will be used to validate values at corresponding key
    validate: {
      name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      age: (value) => (value < 18 ? 'You must be at least 18 to register' : null),
    },
  });

  return (
    <>
      <Flex align={"center"} justify={"center"} gap={"xl"} >
        <Stack align={"center"} justify={"center"} color={"white"}>
          <Space h={"lg"}></Space>
          <Image
            height={200}
            radius="md"
            src="https://downloader.disk.yandex.ru/preview/4dced732ec0d85066cdd276a85e1469698b30071dc229606e296a3166c373d22/65430172/WNDfAaq1VKjt7HfMwDi40mzZYXq3PYbyR0aX69uJyakf1vGMZKw3-2XtbtbP0rleMMSIT3JCN6S6pSEHxyIlAg%3D%3D?uid=0&filename=spyfall.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&tknv=v2&size=1872x956"
            alt="Random unsplash image"
          />
          <Text>Создание комнаты для игры SpyFall</Text>
          <form onSubmit={form.onSubmit(console.log)}>
            <Flex gap={"xl"}>
              <TextInput label="Название комнаты" placeholder="ввести..." {...form.getInputProps('name')} />
              <TextInput label="Ваше имя" placeholder="ввести..." {...form.getInputProps('names')} />
            </Flex>
            <Space h={"lg"}></Space>
            <Grid>
              <GridCol>
                <TextInput value={key} readOnly/>
              </GridCol>
              <GridCol span="content">

                <Button variant="gradient" gradient={{ from: 'teal', to: 'blue', deg: 60 }} onClick={handleGenerateKey}>
                  Сгенерировать ключ
                </Button>
              </GridCol>


            </Grid>

            <NumberInput
              mt="sm"
              label="Количество игроков"
              placeholder="Количество"
              min={0}
              max={10}
              {...form.getInputProps('Количество игроков')}
            />
            <a href={"/games/spyfall"}>
              <Button mt="sm">
                Создать комнату
              </Button>
            </a>
          </form>

          <Space h={"lg"}></Space>
        </Stack>
      </Flex>
    </>
  )
}