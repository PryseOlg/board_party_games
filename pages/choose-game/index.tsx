import {Stack, Space, SimpleGrid} from "@mantine/core";
import React from "react";
import CustomCard from "../../components/custom-card";
import spyfall from '../../public/games/spyfall.jpg';
import uno from '../../public/games/uno.jpg';
import catan from '../../public/games/catan.jpg';
import bynker from '../../public/games/bynker.jpg';

export default function ChooseGame() {
  return (
    <>
      <Stack align={"center"} justify={"center"}>
        <Space h={"lg"}></Space>
        <Space h={"lg"}></Space>
        <SimpleGrid cols={3}>
          <CustomCard
            imageUrl={spyfall}
            badgeText="Бесплатно"
            buttonText="Играть"
            description="Ни на что не похожая разговорная игра!"
            title="Находка шпиона" to={"/create-or-join"}></CustomCard>
          <CustomCard
            imageUrl={catan}
            badgeText="Платно"
            buttonText="Купить"
            description="Экономическая и стратегическая настольная игра"
            title="Колонизаторы" to={"/create-or-join"}></CustomCard>
          <CustomCard
            imageUrl={bynker}
            badgeText="Бесплатно"
            buttonText="Играть"
            description="Боритесь за место в бункере"
            title="Бункер" to={"/create-or-join"}></CustomCard>
          <CustomCard
            imageUrl={uno}
            badgeText="Бесплатно"
            buttonText="Играть"
            description="Настольная карточная игра"
            title="Уно!" to={"/create-or-join"}></CustomCard>
          <CustomCard
            imageUrl={uno}
            badgeText="Платно"
            buttonText="Купить"
            description="Описание настольной игры X"
            title="Настольная игра  X" to={"/create-or-join"}></CustomCard>
          <CustomCard
            imageUrl={uno}
            badgeText="Бесплатно"
            buttonText="Играть"
            description="Описание настольной игры X"
            title="Настольная игра  X" to={"/create-or-join"}></CustomCard>
          <CustomCard
            imageUrl={uno}
            badgeText="Бесплатно"
            buttonText="Играть"
            description="Описание настольной игры X"
            title="Настольная игра  X" to={"/create-or-join"}></CustomCard>
          <CustomCard
            imageUrl={uno}
            badgeText="Бесплатно"
            buttonText="Играть"
            description="Описание настольной игры X"
            title="Настольная игра  X" to={"/create-or-join"}></CustomCard>
          <CustomCard
            imageUrl={uno}
            badgeText="Бесплатно"
            buttonText="Играть"
            description="Описание настольной игры X"
            title="Настольная игра  X" to={"/create-or-join"}></CustomCard>
        </SimpleGrid>
        <Space h={"lg"}></Space>
        <Space h={"lg"}></Space>
        <Space h={"lg"}></Space>
      </Stack>
    </>
  )
}
