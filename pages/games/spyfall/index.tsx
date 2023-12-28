import React, { useEffect, useState } from "react";
import {
  SimpleGrid,
  Container,
  Space,
  BackgroundImage,
  Flex,
  Text,
  Box,
  Modal,
  Button, Stack, Grid, Group,
} from "@mantine/core";
import CustomCard from "../../../components/custom-card";
import card from "../../../public/games/card.jpg";
import { useDisclosure } from "@mantine/hooks";
import RulesModal from "./rulesModal";
import { useForm } from "@mantine/form";
import { TextInput } from "@mantine/core";

const Spyfall = () => {
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [isModalOpen, setModalOpen] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [locations, setLocations] = useState<
    { id: string; name: string; imageUrl: string }[]
  >([]);

  const form = useForm({
    initialValues: {
      playerName: "",
      roomKey: "",
      role: "",
      locationName: "",
    },
  });

  useEffect(() => {
    handleGetLocations();
  }, []);

  const handleGetLocations = async () => {
    try {
      const response = await fetch(
        `http://localhost/Spyfall/locationsByRoomId?id=${form.values.roomKey}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Полученные данные:", data);
        if (
          Array.isArray(data) &&
          data.length > 0 &&
          "name" in data[0] &&
          "imageUrl" in data[0]
        ) {
          setLocations(data);
        } else {
          console.error("Получены недопустимые данные для локаций:", data);
        }
      } else {
        console.error("Произошла ошибка при получении локаций");
      }
    } catch (error) {
      console.error("Произошла ошибка при отправке запроса:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `http://localhost:80/Spyfall/card?GameId=${form.values.roomKey}&Nickname=${form.values.playerName}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage("Вы успешно присоединились к комнате!");
        handleGetLocations();
        setLocations(data);
        setModalOpen(false);
        form.values.role = data.role;
        form.values.locationName = data.locationName;

        console.log(data);
        console.log(form.values.playerName);
        console.log(form.values.roomKey);
        console.log(form.values.role);
      } else {
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Произошла ошибка при отправке запроса:", error);
      setSuccessMessage("");
    }
  };

  const handleCardClick = (cardTitle: string) => {
    if (form.values.role === "Шпион") {
      setSelectedCards((prevSelectedCards) => {
        if (prevSelectedCards.includes(cardTitle)) {
          return prevSelectedCards.filter((title) => title !== cardTitle);
        } else {
          return [...prevSelectedCards, cardTitle];
        }
      });
    }
  };

  return (
    <>
      <Modal
        transitionProps={{ duration: 400, transition: 'pop' }}
        centered={true}
        closeOnClickOutside={false}
        withCloseButton={false}
        opened={isModalOpen}
        onClose={() => setModalOpen(false)}
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Box>
            <TextInput
              label="Ключ комнаты"
              placeholder="Введите ключ комнаты"
              {...form.getInputProps<string>("roomKey")}
            />
            <TextInput
              label="Имя игрока"
              placeholder="Введите ваше имя"
              {...form.getInputProps<string>("playerName")}
            />
            <Space h="xl" />
            <Group justify="center">
              <Button type="submit">Присоединиться</Button>
              <a href={'/choose-game'}>
                <Button variant="default" >Вернуться в меню</Button>
              </a>
            </Group>


            {successMessage && (
              <div style={{ color: "green" }}>{successMessage}</div>
            )}
          </Box>
        </form>
      </Modal>
      {isModalOpen ? null : (
        <BackgroundImage
          src={
            "https://downloader.disk.yandex.ru/preview/9d546834f8ddb7a021a15ad481d96d6571b14e8db20ac30c23d871951018871a/65439605/98F__HGJcghyEYEuS_kT6k14AIa10Tz_iwmc82CjQyyImNdIXQ5M5lbCffWv3vmoXycBa9uucVfxlCD6IwsUiA%3D%3D?uid=0&filename=1579283833_27-44.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&tknv=v2&size=1872x956"
          }
        >
          <Container size="xl">
            <Space h={"xl"}></Space>
            <Space h={"xl"}></Space>
            <Button onClick={open}>Правила игры</Button>
            <RulesModal opened={opened} onClose={close} />


            {form.values.role !== "Шпион" ? (
              <Box>
                <Text>
                  Вы '{form.values.role}' и вы должны найти шпиона! Вот ваша
                  локация:
                </Text>
                <Flex>
                  <CustomCard
                    imageUrl={card}
                    title={form.values.locationName}
                    description={""}
                    buttonText={""}
                    to={""}
                    onClick={handleCardClick}
                    isActive={selectedCards.includes("Карточка 2")}
                  ></CustomCard>
                </Flex>
              </Box>
            ) : (
              <Flex>
                <Text>
                  Вы шпион! Ваша цель угадать правильную из заданных локаций!
                </Text>
              </Flex>
            )}

            <SimpleGrid cols={6}>
              {Array.isArray(locations) ? (
                locations.map((location) => (
                  <CustomCard
                    key={location.id}
                    imageUrl={card}
                    title={location.name}
                    description={""}
                    buttonText={""}
                    to={""}
                    onClick={handleCardClick}
                    isActive={selectedCards.includes(location.name)}
                  ></CustomCard>
                ))
              ) : (
                <p>
                  Данные о локациях не доступны или имеют неверный формат
                </p>
              )}
            </SimpleGrid>

            <Space h={"xl"}></Space>
          </Container>
          <Space h={"xl"}></Space>
          <Space h={"xl"}></Space>
          <Space h={"xl"}></Space>
        </BackgroundImage>
      )}
    </>
  );
};

export default Spyfall;
