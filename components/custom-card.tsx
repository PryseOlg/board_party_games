// CustomCard.tsx
import React from "react";
import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";
import NextImage from 'next/image';

interface TChooseGame {
  imageUrl: string;
  title: string;
  badgeText?: string;
  description: string;
  buttonText: string;
  to: string;
  onClick?: (cardTitle: string) => void;
  isActive: boolean; // Добавлено новое свойство для управления активностью карточки
}

const CustomCard: React.FC<TChooseGame> = ({
                                             imageUrl,
                                             title,
                                             badgeText,
                                             description,
                                             buttonText,
                                             to,
                                             onClick,
                                             isActive
                                           }: TChooseGame) => {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      onClick={() => onClick && onClick(title)}
      style={{ border: isActive ? '2px solid red' : '2px solid transparent' }} // Пример стилизации активной карточки
    >
      <Card.Section>
        <Image component={NextImage} src={imageUrl} height={160} alt={title} />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{title}</Text>
        {badgeText && <Badge color="pink" variant="light">{badgeText}</Badge>}
      </Group>

      <Text size="sm" c="dimmed">
        {description}
      </Text>

      {buttonText && (
        <a href={`${to}`}>
          <Button variant="light" color="blue" fullWidth mt="md" radius="md">
            {buttonText}
          </Button>
        </a>
      )}
    </Card>
  );
}

export default CustomCard;
