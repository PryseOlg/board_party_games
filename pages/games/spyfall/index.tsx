// Spyfall.tsx
import {SimpleGrid, Container, Space, BackgroundImage, Flex, Text, Box} from "@mantine/core";
import React, { useState } from "react";
import CustomCard from "../../../components/custom-card";
import card from "../../../public/games/card.jpg";

interface SpyfallProps {
  roomKey: string | null;
  playerName: string | null;
  role: string | null;
  location: string | null;
}

const Spyfall: React.FC<SpyfallProps> = ({ roomKey, playerName, role = 'Детектив', location }) => {
  const [selectedCards, setSelectedCards] = useState<string[]>([]);

  const handleCardClick = (cardTitle: string) => {
    // Если роль "Шпион", то обновляем состояние выбранных карточек
    if (role === 'Шпион') {
      setSelectedCards((prevSelectedCards) => {
        // Если карточка уже выбрана, убираем ее из массива
        if (prevSelectedCards.includes(cardTitle)) {
          return prevSelectedCards.filter((title) => title !== cardTitle);
        } else {
          // Иначе добавляем карточку в массив
          return [...prevSelectedCards, cardTitle];
        }
      });
    }
  };

  return (
    <BackgroundImage
      src={"https://downloader.disk.yandex.ru/preview/9d546834f8ddb7a021a15ad481d96d6571b14e8db20ac30c23d871951018871a/65439605/98F__HGJcghyEYEuS_kT6k14AIa10Tz_iwmc82CjQyyImNdIXQ5M5lbCffWv3vmoXycBa9uucVfxlCD6IwsUiA%3D%3D?uid=0&filename=1579283833_27-44.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&tknv=v2&size=1872x956"}
    >
      <Container size="xl">
        <Space h={"xl"}></Space>
        <Space h={"xl"}></Space>
        {role === 'Детектив' ? (
          <Box >
            <Text>Вы детектив! И это правильная локация:</Text>
            <Flex>
              <CustomCard
                imageUrl={card}
                title={'Карточка 1'}
                description={''}
                buttonText={''}
                to={''}
                onClick={handleCardClick} // Исправлено здесь
                isActive={selectedCards.includes('Карточка 2')}
              ></CustomCard>
            </Flex>
            </Box>

        ): (
          <Flex>
            <Text>Вы шпион! Ваша цель угадать прваильную локацию!</Text>

          </Flex>
        )}

        <SimpleGrid cols={6}>
          <CustomCard
            imageUrl={card}
            title={'Карточка 1'}
            description={''}
            buttonText={''}
            to={''}
            onClick={handleCardClick} // Исправлено здесь
            isActive={selectedCards.includes('Карточка 1')}
          ></CustomCard>
          <CustomCard
            imageUrl={card}
            title={'Карточка 2'}
            description={''}
            buttonText={''}
            to={''}
            onClick={handleCardClick} // Исправлено здесь
            isActive={selectedCards.includes('Карточка 2')}
          ></CustomCard>
          {/* Добавьте другие карточки с аналогичными параметрами */}
        </SimpleGrid>


        <Space h={"xl"}></Space>
      </Container>
      <Space h={"xl"}></Space>
      <Space h={"xl"}></Space>
      <Space h={"xl"}></Space>

      <div>
        {/* Используйте переданные значения */}
        <p>Room Key: {roomKey}</p>
        <p>Player Name: {playerName}</p>
        <p>Role: {role}</p>
        <p>Location: {location}</p>
        {/* ... */}

        <Space h={"xl"}></Space>
        <Space h={"xl"}></Space>
      </div>
    </BackgroundImage>
  );
}

export default Spyfall;
