import {Badge, Box, Button, Card, Flex, Grid, Group, Image, SimpleGrid, Space, Stack, Text} from "@mantine/core";
import CustomCard from "../../components/custom-card";
import React from "react";

export default function CreateOrJoin() {
  return (
    <>
      <Flex align={"center"} justify={"center"}>
        <SimpleGrid >
          <Space h={"xl"}></Space>
          <CustomCard
            imageUrl='https://downloader.disk.yandex.ru/preview/4dced732ec0d85066cdd276a85e1469698b30071dc229606e296a3166c373d22/65430172/WNDfAaq1VKjt7HfMwDi40mzZYXq3PYbyR0aX69uJyakf1vGMZKw3-2XtbtbP0rleMMSIT3JCN6S6pSEHxyIlAg%3D%3D?uid=0&filename=spyfall.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&tknv=v2&size=1872x956'
            badgeText=""
            buttonText="Создать комнату"
            description="Создание игровой комнаты, получение ключа и приглашение друзей!!"
            title="Создание комнаты" to={"/create-session"}></CustomCard>
          <CustomCard
            imageUrl='https://downloader.disk.yandex.ru/preview/4dced732ec0d85066cdd276a85e1469698b30071dc229606e296a3166c373d22/65430172/WNDfAaq1VKjt7HfMwDi40mzZYXq3PYbyR0aX69uJyakf1vGMZKw3-2XtbtbP0rleMMSIT3JCN6S6pSEHxyIlAg%3D%3D?uid=0&filename=spyfall.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&tknv=v2&size=1872x956'
            badgeText=""
            buttonText="Присоединиться к игре"
            description="Здесь вы можете ввести ключ комнаты и зайти к своим друзьям"
            title="Присоединение к комнате" to={"/create-session"}></CustomCard>
        </SimpleGrid>
      </Flex>
    </>
  )
}