import React, { useState } from "react";
import { useForm } from "@mantine/form";
import { TextInput, Button, Space, Box, Stack } from "@mantine/core";

type OnJoinCallback = (data: { roomKey: any; playerName: any; role: any; location: any }) => void;


const JoinSessionForm: React.FC<{ onJoin: OnJoinCallback }> = ({ onJoin }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const form = useForm();

  const handleSubmit = async () => {
    try {
      const response = await fetch("URL_СЕРВЕРА", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomKey: form.values.roomKey,
          playerName: form.values.playerName,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage("Вы успешно присоединились к комнате!");
        setErrorMessage("");

        // Обновите вызов onJoin с полученными данными
        onJoin({
          roomKey: form.values.roomKey,
          playerName: form.values.playerName,
          role: data.role,
          location: data.location,
        });
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Произошла ошибка при присоединении");
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Произошла ошибка при отправке запроса:", error);
      setErrorMessage("Произошла ошибка при отправке запроса");
      setSuccessMessage("");
    }
  };


  return (
    <Stack align={"center"} justify={"center"} gap={"xl"}>
      <Space w="xl" />
      <Space h="xl" />
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Box>
          <TextInput
            label="Ключ комнаты"
            placeholder="Введите ключ комнаты"
            {...form.getInputProps<string>('roomKey')} // Указание типа явно
          />
          <TextInput
            label="Имя игрока"
            placeholder="Введите ваше имя"
            {...form.getInputProps<string>('playerName')} // Указание типа явно
          />
          <Space h="xl" />
          <Button type="submit">Присоединиться</Button>
          {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
        </Box>
      </form>
    </Stack>
  );
};

export default JoinSessionForm;
