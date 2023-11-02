import React from "react";
import {Card, Image, Text, Badge, Button, Group} from "@mantine/core";
import {useNavigate} from "react-router-dom";

function CustomCard({
                      imageUrl,
                      title,
                      badgeText,
                      description,
                      buttonText,
                      to
                    }: TChooseGame) {

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image src={imageUrl} height={160} alt={title}/>
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