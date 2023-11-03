import "@mantine/core/styles.css";
import Head from "next/head";
import {
  AppShell, Avatar,
  BackgroundImage,
  Box,
  Burger, Center,
  Combobox, Container,
  Flex,
  Grid, Group, Image,
  MantineProvider,
  SimpleGrid,
  Text
} from "@mantine/core";
import React from "react";
import Footer = Combobox.Footer;
import {useDisclosure} from "@mantine/hooks";


export default function App({ Component, pageProps }: any) {
  const [opened, { toggle }] = useDisclosure();
  return (
    <MantineProvider>

          <Head>
            <title>Mantine Template</title>
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
            />
            <link rel="shortcut icon" href="/favicon.svg"/>
          </Head>
      <AppShell
        header={{ height: 60 }}
        padding="md"
        footer={{height: 60}}
      >
        <AppShell.Header >
          <Group align={"flex-start"} justify={"flex-start"}>
            <a href={"/"}>
              <Image h={60}
                     src={"https://downloader.disk.yandex.ru/preview/2c52e76202f95d9f8262cc2d8ec416187d85e60d7333fb408901d03ad3702a1d/65439ec4/fxy9LBCsZgZfVswXxi8X5uDug4pgOS0JxExVUr8zo1Sc2M4ulqE2Oayj1JTpu_cgCdBhqMG9_5kZVaHCJX_elg%3D%3D?uid=0&filename=Board-And-Games-02-11-2023.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=0&tknv=v2&size=1872x956"}>
              </Image>
            </a>
            <Avatar radius="xl" />
          </Group>

        </AppShell.Header>

        <AppShell.Footer>
          <Container size={"xl"}>
            <Group justify={"flex-end"} >
              <Text>2023. Никакие права не защищены</Text>
            </Group>
          </Container>

        </AppShell.Footer>
      </AppShell>
      );
          <Component {...pageProps} />


    </MantineProvider>
  );
}
