import { HStack, Text } from "native-base";
import { useTimer } from "react-timer-hook";

export function Timer({
  expiryTimestamp,
  onExpire,
}: {
  expiryTimestamp: Date;
  onExpire: Function;
}) {
  const { seconds, minutes, hours, days } = useTimer({
    expiryTimestamp,
    onExpire: () => onExpire(),
  });

  const formatNumbers = (num: number) => {
    if (num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  };

  return (
    <HStack
      space={1}
      bg="coolGray.700"
      alignItems="baseline"
      px={3}
      borderRadius="8px"
    >
      <Text color="white" fontSize={{ base: "xl", md: "5xl" }}>
        {formatNumbers(days)}:{formatNumbers(hours)}:{formatNumbers(minutes)}:
        {formatNumbers(seconds)}
      </Text>
    </HStack>
  );
}
