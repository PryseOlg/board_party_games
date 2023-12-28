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
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [isModalOpen, setModalOpen] = useState(true);
  const form = useForm({
    initialValues: {
      playerName: "",
      roomKey: "",
      role: "",
      locationName: "",
      words: [],
      teamColor: "",
      isCap: bool,
      colors: [],
    },
  });

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
        setSelectedWords(data);
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
        setSelectedWords(data);
        setResponseMessage('');
        console.log('Слова с цветами:', data)
        setModalOpen(false);
        form.values.words = data.words
        form.values.teamColor = data.teamColor
        form.values.isCap = data.isCap
        form.values.colors = data.colors
        console.log(form.values.words, form.values.teamColor, form.values.isCap, form.values.colors)

      } else {
        const errorData = await response.json();
        setErrorMessage(errorData || 'Произошла ошибка при получении доступных слов');
      }
    } catch (error) {
      console.error("Произошла ошибка при отправке запроса:", error);
      setSuccessMessage("");
    }
  };

  const renderGameBoard = () => {
    const { colors, words } = form.values;

    return (
      <Box style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8 }}>
        {colors.map((color, index) => (
          <Badge fullWidth key={index} color={color} size="xl" radius="md">
            {words[index]}
          </Badge>
        ))}
      </Box>
    );
  };

  const renderHiddenGameBoard = () => {
    const { colors } = form.values;

    const handleHiddenBadgeClick = (color: never, index: number) => {
      // Обработка нажатия на скрытый Badge, здесь можно добавить свою логику
      console.log(`Скрытый Badge с цветом ${color} нажат на индексе ${index}`);
    };

    return (
      <Box style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8 }}>
        {colors.map((color, index) => (
          <Badge
            fullWidth
            key={index}
            size="xl"
            radius="md"
            onClick={() => handleHiddenBadgeClick(color, index)}
          >
            {/* Показать цвет только после нажатия */}
            {color === "revealed" ? <span style={{ backgroundColor: color, width: "100%", height: "100%" }} /> : null}
          </Badge>
        ))}
      </Box>
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
          {form.values.isCap?.valueOf() === true ? (
            <Box>
              <Space h={"xl"} />
              <Text>
                Вы Капитан! Вы видите все правильные цвета для слов. Ваша цель строить взаимосвязи чтобы другие игроки поняли!
              </Text>
              {renderGameBoard()}
              {renderHiddenGameBoard()}
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
