import { TextInput, TextInputProps, useMantineTheme, rem } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

export function InputWithButton(props: TextInputProps) {
  const theme = useMantineTheme();

  return (
    <TextInput
      radius="xl"
      size="md"
      placeholder="Type a country's name"
      rightSectionWidth={42}
      leftSection={
        <IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
      }
      {...props}
    />
  );
}
