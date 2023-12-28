import {Badge, Box, Button, Card, Flex, Grid, Group, Image, SimpleGrid, Space, Stack, Text} from "@mantine/core";
import CustomCard from "../../../../components/custom-card";
import React from "react";
import search from "../../../../public/games/search.png"

export default function CreateOrJoin() {
  return (
    <>
      <Flex align={"center"} justify={"center"}>
        <SimpleGrid >
          <Space h={"xl"}></Space>
          <CustomCard
            imageUrl={search}
            badgeText=""
            buttonText="Создать комнату"
            description="Создание игровой комнаты, получение ключа и приглашение друзей!!"
            title="Создание комнаты" to={"create-session"}></CustomCard>
          <CustomCard
            imageUrl={search}
              badgeText=""
            buttonText="Присоединиться к игре"
            description="Здесь вы можете ввести ключ комнаты и зайти к своим друзьям"
            title="Присоединение к комнате" to={"/games/spyfall"}></CustomCard>
        </SimpleGrid>
      </Flex>
    </>
  )
}