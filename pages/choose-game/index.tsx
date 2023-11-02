import {Stack, Space, SimpleGrid} from "@mantine/core";
import React from "react";
import CustomCard from "../../components/custom-card";

export default function ChooseGame() {
  return (
    <>
      <Stack align={"center"} justify={"center"}>
        <Space h={"lg"}></Space>
        <SimpleGrid cols={3}>
          <CustomCard
            imageUrl='https://downloader.disk.yandex.ru/preview/4dced732ec0d85066cdd276a85e1469698b30071dc229606e296a3166c373d22/65430172/WNDfAaq1VKjt7HfMwDi40mzZYXq3PYbyR0aX69uJyakf1vGMZKw3-2XtbtbP0rleMMSIT3JCN6S6pSEHxyIlAg%3D%3D?uid=0&filename=spyfall.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&tknv=v2&size=1872x956'
            badgeText="Бесплатно"
            buttonText="Играть"
            description="Ни на что не похожая разговорная игра!"
            title="Находка шпиона" to={"/create-or-join"}></CustomCard>
          <CustomCard
            imageUrl="https://downloader.disk.yandex.ru/preview/85609ea8b11d48668f4606181262066c1b6c4824f1d774d9d8fd94eee44e0924/654301a4/6OznITCis7I9_FmKaoaIsHAWY7oawb3ipu6uOJyXTV1jQCTmskpO2csBFjRwCr7xwXGV4jju7AwKJfTSLJps0Q%3D%3D?uid=0&filename=catan.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&tknv=v2&size=1872x956"
            badgeText="Платно"
            buttonText="Купить"
            description="Экономическая и стратегическая настольная игра"
            title="Колонизаторы" to={"/create-or-join"}></CustomCard>
          <CustomCard
            imageUrl="https://downloader.disk.yandex.ru/preview/a4c097641042a3f76f5111646a631d71dd5cdc0ea66001b9c31947aebfaade09/654301bc/mgiXvDtYcoR0V9mRDMhqmPV2QQ0QK_8PWNJMwXz6lNW7Dm1WSqNomdPVwJvi3ylKLE2kgk_fqBO6FKHbhdZttw%3D%3D?uid=0&filename=bynker.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&tknv=v2&size=1872x956"
            badgeText="Бесплатно"
            buttonText="Играть"
            description="Боритесь за место в бункере"
            title="Бункер" to={"/create-or-join"}></CustomCard>
          <CustomCard
            imageUrl="https://downloader.disk.yandex.ru/preview/64945999303cb6572e6763d6031457bfc6434d2a12ca37ffc003ea7d7a5fd027/65430208/D4Hf-EnfwWbQsGB8U1DRa3AWY7oawb3ipu6uOJyXTV0g23rwgkwiV64j1REiqaNIPM_urq5a47f46i_Pmxytew%3D%3D?uid=0&filename=uno.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&tknv=v2&size=1872x956"
            badgeText="Бесплатно"
            buttonText="Играть"
            description="Настольная карточная игра"
            title="Уно!" to={"/create-or-join"}></CustomCard>
          <CustomCard
            imageUrl="https://images.unsplash.com/photo-1688920556232-321bd176d0b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80"
            badgeText="Платно"
            buttonText="Купить"
            description="Описание настольной игры X"
            title="Настольная игра  X" to={"/create-or-join"}></CustomCard>
          <CustomCard
            imageUrl="https://images.unsplash.com/photo-1688920556232-321bd176d0b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80"
            badgeText="Бесплатно"
            buttonText="Играть"
            description="Описание настольной игры X"
            title="Настольная игра  X" to={"/create-or-join"}></CustomCard>
          <CustomCard
            imageUrl="https://images.unsplash.com/photo-1688920556232-321bd176d0b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80"
            badgeText="Бесплатно"
            buttonText="Играть"
            description="Описание настольной игры X"
            title="Настольная игра  X" to={"/create-or-join"}></CustomCard>
          <CustomCard
            imageUrl="https://images.unsplash.com/photo-1688920556232-321bd176d0b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80"
            badgeText="Бесплатно"
            buttonText="Играть"
            description="Описание настольной игры X"
            title="Настольная игра  X" to={"/create-or-join"}></CustomCard>
          <CustomCard
            imageUrl="https://images.unsplash.com/photo-1688920556232-321bd176d0b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80"
            badgeText="Бесплатно"
            buttonText="Играть"
            description="Описание настольной игры X"
            title="Настольная игра  X" to={"/create-or-join"}></CustomCard>
        </SimpleGrid>
        <Space h={"lg"}></Space>
      </Stack>
    </>
  )
}
