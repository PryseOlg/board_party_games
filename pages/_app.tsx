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
import logo from "../public/games/logo.png"
import NextImage from "next/image";


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
                     component={NextImage}
                     src={logo}
              alt={""}>
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
