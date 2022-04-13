import {
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  Pressable,
  Text,
  VStack,
} from "native-base";
import { useEffect, useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { MdOutlineArrowBack } from "react-icons/md";
import { useNavigate } from "react-router";
import { Layout, Loader } from "../../components";
import { useAuthContext, useVoteContext } from "../../contexts";
import { useVote } from "../../hooks";
import { Candidate } from "../../repository/interfaces";
import { ConfirmVote } from "./components";

export function VotingPage() {
  const {
    state: { aadharId },
  } = useAuthContext();

  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState<Candidate>();
  let navigate = useNavigate();
  const {
    state: { allCandidates, votedCandidate, loading },
  } = useVoteContext();

  const { getAllCandidates } = useVote();

  useEffect(() => {
    if (votedCandidate && votedCandidate.name !== "") {
      navigate("/");
    }
    getAllCandidates(aadharId);
  }, []);

  return (
    <Layout>
      <VStack w="100vw" mb={["100"]}>
        <HStack
          position={"fixed"}
          top={["80px", "100"]}
          zIndex={100}
          bg="info.900"
          alignItems={"center"}
          w="100vw"
          py="5"
        >
          <Icon
            as={
              <MdOutlineArrowBack
                cursor={"pointer"}
                onClick={() => navigate("/")}
                style={{
                  color: "white",
                  fontSize: "2rem",
                  marginLeft: "1rem",
                  cursor: "pointer",
                }}
              />
            }
          />
          <Heading
            mx="auto"
            ml={["0", "auto"]}
            color={"white"}
            alignSelf={"center"}
          >
            Vote
          </Heading>
        </HStack>
        <VStack
          position={"relative"}
          justifyContent={"center"}
          alignItems="center"
          minH="60vh"
          mt="100"
        >
          <>
            {loading ? (
              <Loader light={true} />
            ) : allCandidates && allCandidates.length !== 0 ? (
              <>
                <VStack alignItems={"center"}>
                  {allCandidates.map((item) => (
                    <Pressable onPress={() => setValue(item)}>
                      {({ isHovered }) => (
                        <Box
                          display="flex"
                          alignItems={"center"}
                          flexDir={"row"}
                          bg={
                            (value && isHovered) || item.name === value?.name
                              ? "info.700"
                              : "white"
                          }
                          fontSize={"lg"}
                          mt="4"
                          p="2"
                          px="5"
                          w={["90vw", "30vw"]}
                          borderRadius={"6"}
                          justifyContent="space-between"
                        >
                          <HStack alignItems={"center"}>
                            <img
                              key={item.partyFlag}
                              src={item.partyFlag}
                              width="60"
                              style={{ height: "60px" }}
                              alt="party flag"
                            />
                            <Text
                              color={
                                (value && isHovered) ||
                                item.name === value?.name
                                  ? "white"
                                  : "black"
                              }
                              fontSize={["sm", "xl"]}
                              bold
                            >
                              &#160;&#160; {item.name} - {item.partyShortcut}
                            </Text>
                          </HStack>
                          {value && item.name === value.name && (
                            <BsCheckCircleFill size="30" color="white" />
                          )}
                        </Box>
                      )}
                    </Pressable>
                  ))}
                  <Button
                    alignSelf={"center"}
                    onPress={() => setModalVisible(true)}
                    isDisabled={!value ? true : false}
                    bg={"danger.600"}
                    w="100"
                    mt="10"
                  >
                    vote
                  </Button>
                </VStack>
              </>
            ) : (
              <>
                <Heading
                  color="white"
                  size={["sm", "xl"]}
                  textAlign="center"
                  mb="4"
                  fontWeight={"semibold"}
                >
                  {allCandidates === undefined || !allCandidates.length ? (
                    <Box>
                      No candidate found at your Constituency Area
                      <br /> Please Try Again Later
                    </Box>
                  ) : (
                    <Box></Box>
                  )}
                </Heading>
                <Button
                  bg={"danger.600"}
                  color="white"
                  onPress={() => navigate("/home")}
                  ml={["0", "5"]}
                >
                  <Text fontSize={["10", "20"]} color="white">
                    Go back to Home
                  </Text>
                </Button>
              </>
            )}
          </>
        </VStack>
      </VStack>
      {value && (
        <ConfirmVote
          candidate={value}
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
        />
      )}
    </Layout>
  );
}
export default VotingPage;
