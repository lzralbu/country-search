import { Card, Image, Text, Group, Center, Space } from "@mantine/core";
import classes from "./CountryCard.module.css";

export interface CountryCardProps {
  name: Record<"common" | "official", string>;
  population: number;
  capital: string;
  currencies: string[];
  languages: string[];
  flag: Record<"png" | "alt", string>;
}

function CountryInfo(props: { label: string; datum: string }) {
  return (
    <Center>
      <Text size="xs" mr={4}>
        {props.label + ":"}
      </Text>
      <Text size="xs" className={classes.icon}>
        {props.datum}
      </Text>
    </Center>
  );
}

const numberFormat = new Intl.NumberFormat();

export function CountryCard(props: CountryCardProps) {
  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section className={classes.imageSection}>
        <Image src={props.flag.png} alt={props.flag.alt} />
      </Card.Section>

      <Group justify="space-between" mt="md">
        <div>
          <Text fw={500}>{props.name.common}</Text>
          <Text fz="xs" c="dimmed">
            {props.name.official}
          </Text>
        </div>
      </Group>

      <Card.Section className={classes.section} mt="md">
        <Text fz="sm" c="dimmed" className={classes.label}>
          Info
        </Text>

        <Group gap={8} mb={-8}>
          <CountryInfo label={"Capital"} datum={props.capital} />
          <CountryInfo label={"Languages"} datum={props.languages.join(", ")} />
          <CountryInfo
            label={"Currencies"}
            datum={props.currencies.join(", ")}
          />
          <CountryInfo
            label={"Population"}
            datum={numberFormat.format(props.population)}
          />
        </Group>
      </Card.Section>
    </Card>
  );
}
