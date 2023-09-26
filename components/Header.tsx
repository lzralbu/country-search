import { Container, Title } from "@mantine/core";
import classes from "./Header.module.css";

export function Header() {
  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <Title order={1}>Country search</Title>
      </Container>
    </header>
  );
}
