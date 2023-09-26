"use client";

import { useState } from "react";

import { Center, Container, Loader, Text } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";

import { Header } from "@/components/Header";
import { InputWithButton } from "@/components/InputWithButton";
import { Grid } from "@mantine/core";
import { CountryCard } from "@/components/CountryCard";

import useSWR from "swr";

interface Country {
  name: {
    common: string;
    official: string;
    nativeName: Record<string, Record<"official" | "common", string>>;
  };
  capital: string[];
  population: number;
  languages: Record<string, string>;
  currencies: Record<string, Record<"name" | "symbol", string>>;
  flags: Record<"png" | "alt", string>;
}

const fetcher = (input: RequestInfo, init?: RequestInit | undefined) =>
  fetch(input, init).then((res) => res.json());

export default function Home() {
  const [inputText, setInputText] = useState("brazil");
  const [debouncedInputText] = useDebouncedValue(inputText, 400);
  const { data, error, isLoading } = useSWR(
    `https://restcountries.com/v3.1/name/${
      debouncedInputText + "/"
    }?fields=name,languages,capital,population,currencies,flags`,
    fetcher
  );

  return (
    <>
      <Header></Header>
      <Container>
        <InputWithButton
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value);
          }}
        ></InputWithButton>
        <Grid mt="xl">
          {isLoading ? (
            <Grid.Col span={12}>
              <Center mt="xl">
                <Loader></Loader>
              </Center>
            </Grid.Col>
          ) : error ? (
            <Grid.Col span={12}>
              <Center mt="xl">
                <Text>{error}</Text>
              </Center>
            </Grid.Col>
          ) : !data.hasOwnProperty("message") ? (
            <>
              {data.map((country: Country) => {
                // console.log(country);
                return (
                  <Grid.Col span={4} key={country.name.official}>
                    <CountryCard
                      name={country.name}
                      population={country.population}
                      capital={country.capital[0]}
                      currencies={Object.entries(country.currencies).map(
                        (entry) => entry[1].name
                      )}
                      languages={Object.entries(country.languages).map(
                        (entry) => entry[1]
                      )}
                      flag={country.flags}
                    ></CountryCard>
                  </Grid.Col>
                );
              })}
            </>
          ) : data.message === "Page Not Found" ? (
            <Grid.Col span={12}>
              <Center mt="xl">
                <Text>{"Nothing to show yet."}</Text>
              </Center>
            </Grid.Col>
          ) : (
            <Grid.Col span={12}>
              <Center mt="xl">
                <Text>{"Couldn't find this country."}</Text>
              </Center>
            </Grid.Col>
          )}
        </Grid>
      </Container>
    </>
  );
}
