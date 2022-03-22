import { HStack, Box, Text, VStack } from "native-base";
import { Layout } from "../../components";
import { useVoteContext } from "../../contexts";

export const AlreadyCasted = () => {
  const {
    state: { votedCandidate },
  } = useVoteContext();

  return (
    <Layout>
      <HStack>
        <Box>
          <Text
            color="white"
            textAlign={"center"}
            letterSpacing={2}
            fontSize={{ base: "3xl", md: "7xl" }}
          >
            Vote casted
          </Text>
          <VStack justifyContent={"center"} alignItems="center">
            <Text fontSize={{ base: "md", md: "3xl" }} color="white">
              to
            </Text>
            <Text
              mt="4"
              fontSize={{ base: "3xl", md: "7xl" }}
              color="white"
              px="4"
              borderRadius={"xl"}
              bg="danger.600"
            >
              {votedCandidate && votedCandidate.name}
            </Text>
          </VStack>
        </Box>
      </HStack>
    </Layout>
  );
};
