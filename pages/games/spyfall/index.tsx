import {SimpleGrid, Image, Flex, Box, Container, Space, BackgroundImage, AppShell} from "@mantine/core";
import React from "react";
import CustomCard from "../../../components/custom-card";
import card from "../../../public/games/card.jpg"
import detective from "../../../public/games/detective.jpg"

export default function Spyfall() {
  return (
    <>
      <BackgroundImage
        src={"https://downloader.disk.yandex.ru/preview/9d546834f8ddb7a021a15ad481d96d6571b14e8db20ac30c23d871951018871a/65439605/98F__HGJcghyEYEuS_kT6k14AIa10Tz_iwmc82CjQyyImNdIXQ5M5lbCffWv3vmoXycBa9uucVfxlCD6IwsUiA%3D%3D?uid=0&filename=1579283833_27-44.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&tknv=v2&size=1872x956"}>

        <Container size="xl">
          <Space h={"xl"}></Space>
          <Space h={"xl"}></Space>

          <SimpleGrid cols={6}>
            <CustomCard
              imageUrl={card}   title={'Карточка'} badgeText={''} description={''} buttonText={''} to={''}></CustomCard>
            <CustomCard
              imageUrl={card}   title={'Карточка'} badgeText={''} description={''} buttonText={''} to={''}></CustomCard>
            <CustomCard
              imageUrl={card}   title={'Карточка'} badgeText={''} description={''} buttonText={''} to={''}></CustomCard>
            <CustomCard
              imageUrl={card}   title={'Карточка'} badgeText={''} description={''} buttonText={''} to={''}></CustomCard>
            <CustomCard
              imageUrl={card}   title={'Карточка'} badgeText={''} description={''} buttonText={''} to={''}></CustomCard>
            <CustomCard
              imageUrl={card}   title={'Карточка'} badgeText={''} description={''} buttonText={''} to={''}></CustomCard>
            <CustomCard
              imageUrl={card}   title={'Карточка'} badgeText={''} description={''} buttonText={''} to={''}></CustomCard>
            <CustomCard
              imageUrl={card}   title={'Карточка'} badgeText={''} description={''} buttonText={''} to={''}></CustomCard>
            <CustomCard
              imageUrl={card}   title={'Карточка'} badgeText={''} description={''} buttonText={''} to={''}></CustomCard>
            <CustomCard
              imageUrl={card}   title={'Карточка'} badgeText={''} description={''} buttonText={''} to={''}></CustomCard>
            <CustomCard
              imageUrl={card}   title={'Карточка'} badgeText={''} description={''} buttonText={''} to={''}></CustomCard>
            <CustomCard
              imageUrl={card}   title={'Карточка'} badgeText={''} description={''} buttonText={''} to={''}></CustomCard>
            <CustomCard
              imageUrl={card}   title={'Карточка'} badgeText={''} description={''} buttonText={''} to={''}></CustomCard>
            <CustomCard
              imageUrl={card}   title={'Карточка'} badgeText={''} description={''} buttonText={''} to={''}></CustomCard>
            <CustomCard
              imageUrl={card}   title={'Карточка'} badgeText={''} description={''} buttonText={''} to={''}></CustomCard>
            <CustomCard
              imageUrl={card}   title={'Карточка'} badgeText={''} description={''} buttonText={''} to={''}></CustomCard>
            <CustomCard
              imageUrl={card}   title={'Карточка'} badgeText={''} description={''} buttonText={''} to={''}></CustomCard>
            <CustomCard
              imageUrl={card}   title={'Карточка'} badgeText={''} description={''} buttonText={''} to={''}></CustomCard>

          </SimpleGrid>
          <Space h={"xl"}></Space>
          <Flex justify={"center"}>
            <CustomCard imageUrl={detective} title={'Детектив'} badgeText={''} description={''} buttonText={''} to={''}></CustomCard>
          </Flex>
        </Container>
        <Space h={"xl"}></Space>
        <Space h={"xl"}></Space>
        <Space h={"xl"}></Space>
      </BackgroundImage>

    </>
  )
}
