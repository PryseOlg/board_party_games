export const createKey = async (data: any) => {
  try {
    const response = await fetch('http://localhost:8080/Spyfall', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return await response.text();
    } else {
      const errorData = await response.text();
      throw new Error(errorData || 'Произошла ошибка при создании комнаты');
    }
  } catch (error) {
    throw new Error('Произошла ошибка при отправке запроса: ' );
  }
};