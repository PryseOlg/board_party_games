import React, { useState } from 'react';
import { useForm } from '@mantine/form';
import { TextInput, Button, Space, Box, Stack } from '@mantine/core';

interface JoinSessionFormProps {
  onJoin: (data: {
    roomKey: string;
    playerName: string;
    role: string;
    location: string;
  }) => void;
}

const SessionForm = () => {  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const form = useForm({
    initialValues: { spiesCount: 1, playersCount: 3, deckName: null },

);

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
        setSuccessMessage('Вы успешно присоединились к комнате!');
        setErrorMessage('');

      } else {
        setErrorMessage(`Ошибка ${response.status}: ${response.statusText}`);
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Произошла ошибка при отправке запроса:', error);
      setErrorMessage('Произошла ошибка при отправке запроса');
      setSuccessMessage('');
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
            {...form.getInputProps<string>("roomKey")}
          />
          <TextInput
            label="Имя игрока"
            placeholder="Введите ваше имя"
            {...form.getInputProps<string>("playerName")}
          />
          <Space h="xl" />
          <Button type="submit">Присоединиться</Button>
          {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
          {successMessage && <div style={{ color: "green" }}>{successMessage}</div>}
        </Box>
      </form>
    </Stack>
  );
};

export default SessionForm;
