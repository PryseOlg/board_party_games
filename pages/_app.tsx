import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import {Main} from "next/document";
import {createTheme} from "@mantine/core/lib";
import {BrowserRouter, Route} from "react-router-dom";
import React from "react";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
    <BrowserRouter>
      <Head>
        <title>Page title</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <MantineProvider
        theme={{
          fontFamily: 'Open Sans, sans-serif',
          primaryColor: 'cyan',
        }}
      >
        <Component {...pageProps} />
        <Route path={"/main"}
      </MantineProvider>
    </BrowserRouter>
    </>
  );
}