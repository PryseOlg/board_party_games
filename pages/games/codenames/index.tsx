import React, { useEffect, useState } from "react";
import { Box, Button, Modal, TextInput, Space, Text, Flex, Badge } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Group } from "@mantine/core";
import CustomCard from "../../../components/custom-card";
import card from "../../../public/games/card.jpg";
import { bool } from "prop-types";

const Codenames = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedWords, setSelectedWords] = useState<{ words: string[]; teamColor: string; isCap: boolean; colors: string[]; hiddenColors: string[] }>({
    words: [],
    teamColor: "",
    isCap: false,
    colors: [],
    hiddenColors: Array(25).fill("revealed"),
  });
  const [isModalOpen, setModalOpen] = useState(true);
  const form = useForm({
    initialValues: {
      playerName: "",
      roomKey: "",
      role: "",
      locationName: "",
      words: [],
      teamColor: "",
      isCap: false,
      colors: [],
      hiddenColors: Array(25).fill("revealed"),
    },
  });

  const [clickedIndexes, setClickedIndexes] = useState<number[]>([]);

  const handleSubmitGetWords = async () => {
    try {
      const response = await fetch(
        `http://localhost:80/codenames/words?GameId=5ccf16cc-37c0-4db0-97af-e9c61da3b88e&Nickname=rfrf`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSelectedWords({
          ...data,
          hiddenColors: Array(data.words.length).fill("revealed"),
        });
        setResponseMessage("");
        console.log(data);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData || "Произошла ошибка при получении доступных слов");
      }
    } catch (error) {
      console.error("Произошла ошибка при отправке запроса:", error);
      setErrorMessage("Произошла ошибка при отправке запроса");
    }
  };

  useEffect(() => {
    handleSubmitGetWords();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:80/codenames/words?GameId=${form.values.roomKey}&Nickname=${form.values.playerName}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSelectedWords({
          ...data,
          hiddenColors: Array(data.words.length).fill("revealed"),
        });
        setResponseMessage('');
        console.log('Слова с цветами:', data);
        setModalOpen(false);
        form.values.words = data.words;
        form.values.teamColor = data.teamColor;
        form.values.isCap = data.isCap;
        form.values.colors = data.colors;
        form.values.hiddenColors = Array(data.words.length).fill("revealed");
        console.log(form.values.words, form.values.teamColor, form.values.isCap, form.values.colors);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData || 'Произошла ошибка при получении доступных слов');
      }
    } catch (error) {
      console.error("Произошла ошибка при отправке запроса:", error);
      setSuccessMessage("");
    }
  };

  const handleHiddenBadgeClick = (index: number) => {
    setClickedIndexes((prevIndexes) => {
      if (prevIndexes.includes(index)) {
        // Если индекс уже есть в массиве, удаляем его
        return prevIndexes.filter((i) => i !== index);
      } else {
        // Иначе добавляем индекс в массив
        return [...prevIndexes, index];
      }
    });
  };

  const renderGameBoard = () => {
    const { colors, words } = form.values;

    return (
      <>
        <Box style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8 }}>
          {colors.map((color, index) => (
            <Badge
              fullWidth
              key={index}
              color={color}
              size="xl"
              radius="md"
              onClick={() => handleHiddenBadgeClick(index)}
            >
              {words[index]}
            </Badge>
          ))}
        </Box>
        <Space h={"xl"}></Space>
        <Box style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8 }}>
          {colors.map((color, index) => (
            <Badge
              fullWidth
              key={index}
              color={clickedIndexes.includes(index) ? color : "cyan"}
              size="xl"
              radius="md"
              onClick={() => handleHiddenBadgeClick(index)}
            >
              {words[index]}
            </Badge>
          ))}
        </Box>
      </>
    );
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
            {successMessage && <div style={{ color: "green" }}>{successMessage}</div>}
          </Box>
        </form>
      </Modal>
      {isModalOpen ? null : (
        <Flex>
          <Space h={"xl"} />
          <Space h={"xl"} />
          <Space h={"xl"} />
          {selectedWords.isCap ? (
            <Box>
              <Space h={"xl"} />
              <Text>
                Вы Капитан! Вы видите все правильные цвета для слов. Ваша цель строить взаимосвязи, чтобы другие игроки поняли!
              </Text>
              {renderGameBoard()}
            </Box>
          ) : (
            <Flex>
              <Text>
                Вы участник игры! Ваша цель угадать правильную из заданных локаций!
              </Text>
            </Flex>
          )}
          <Space h={"xl"} />
        </Flex>
      )}
    </>
  );
};

export default Codenames;
