import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  HStack,
  Image,
  Select,
  Text,
  VStack,
} from "native-base";
import { BsCheckCircle } from "react-icons/bs";
import { Layout, Loader } from "../../components";
import { constituency, states } from "./data";
import { useEffect, useState } from "react";
import { Candidate } from "../../repository/interfaces";
import { useNavigate } from "react-router";
import { useVote } from "../../hooks";
import { useVoteContext } from "../../contexts";

export function ResultsPage() {
  const [selectedState, setSelectedState] = useState(10);
  const [renderConstituencey, setRenderConstituencey] = useState([""]);
  const [selectedConstituency, setSelectedConstituency] = useState(1);
  const [selectedCandidates, setSelectedCandidates] = useState<Candidate[]>();
  const [totalVoteCount, setTotalVoteCount] = useState(0);
  const navigate = useNavigate();
  const {
    state: { winnerCandidate, loading },
  } = useVoteContext();
  const { getResult } = useVote();
  useEffect(() => {
    document.body.style.overflowY = "scroll";
    getResult();
  }, []);

  useEffect(() => {
    if (selectedState !== undefined) {
      setRenderConstituencey(Object.keys(constituency[selectedState] ?? []));
    }
  }, [selectedState]);

  useEffect(() => {
    setSelectedConstituency(parseInt(renderConstituencey[0]));
  }, [renderConstituencey]);

  useEffect(() => {
    let data =
      winnerCandidate &&
      winnerCandidate.filter((i) => {
        return (
          i.stateCode === selectedState &&
          i.constituencyCode === selectedConstituency
        );
      });

    if (data) {
      var candidateModel: Candidate[] = [];
      for (let i = 0; i < data.length; i++) {
        let d = { ...data[i] };
        d.nominationNumber = data[i].nominationNumber.toString();
        d.voteCount = data[i].voteCount.toString();
        console.log(d);
        candidateModel?.push(d);
      }

      setSelectedCandidates(candidateModel);

      setTotalVoteCount(
        candidateModel.reduce((acc, { voteCount }) => (acc += +voteCount), 0)
      );
    }
  }, [selectedState, selectedConstituency, winnerCandidate]);

  return (
    <Layout>
      <VStack
        minH={"70vh"}
        w={["90vw", "70vw"]}
        alignItems={"center"}
        justifyContent="center"
        bg="white"
        borderRadius={"8"}
        shadow={"lg"}
        py="8"
        mt="10"
      >
        <Heading size={["sm"]} textAlign="center">
          GEN ELECTION TO VIDHAN SABHA TRENDS & RESULT MARCH-2022
        </Heading>
        <Box
          p="2"
          mt="4"
          borderWidth={"1"}
          w={["80%", "60vw", "80%"]}
          borderColor={"black"}
        >
          <Text
            textAlign={"center"}
            fontWeight="semibold"
            fontSize={"md"}
            mb="4"
          >
            Constituencywise-All Candidates
          </Text>
          <HStack justifyContent={"center"} flexDir={["column", "row"]}>
            <FormControl
              w={"container"}
              alignItems="center"
              display={"flex"}
              flexDir="row"
            >
              <FormControl.Label mt="2">Select State  </FormControl.Label>
              <Box>
                <Select
                  accessibilityLabel="Select State"
                  placeholder="Select State"
                  _selectedItem={{
                    bg: "teal.600",
                    endIcon: <BsCheckCircle size={5} />,
                  }}
                  w={["40", "full"]}
                  selectedValue={selectedState.toString()}
                  onValueChange={(state) => setSelectedState(parseInt(state))}
                >
                  {Object.keys(states).map((state) => (
                    <Select.Item label={states[state]} value={state} />
                  ))}
                </Select>
              </Box>
            </FormControl>
            <FormControl
              ml={["0", "4"]}
              w={"container"}
              alignItems="center"
              display={"flex"}
              flexDir="row"
            >
              <FormControl.Label mt="2">Select Constituency  </FormControl.Label>
              <Box>
                <Select
                  w={["20", "full"]}
                  accessibilityLabel="Select Constituency"
                  placeholder="Select Constituency"
                  _selectedItem={{
                    bg: "teal.600",
                    endIcon: <BsCheckCircle size={5} />,
                  }}
                  selectedValue={selectedConstituency.toString()}
                  onValueChange={(constituency) =>
                    setSelectedConstituency(parseInt(constituency))
                  }
                >
                  {renderConstituencey.length !== 0 &&
                    renderConstituencey.map((i) => (
                      <Select.Item
                        label={constituency[selectedState][i]}
                        value={i}
                      />
                    ))}
                </Select>
              </Box>
            </FormControl>
          </HStack>
        </Box>
        {/* table */}
        <Box borderWidth={"1"} borderBottomWidth="0" w="80%" mt="6">
          <Box py="1" bg="error.200" borderBottomWidth={"2"} textAlign="center">
            <Text fontWeight={"semibold"}>
              {states[selectedState]}-
              {constituency[selectedState][selectedConstituency]}
            </Text>
          </Box>
          <Box py="1" bg="error.200" borderBottomWidth={"2"} textAlign="center">
            <Text fontWeight={"semibold"}>Result Status</Text>
          </Box>
          <Box overflow={["scroll", "unset"]}>
            <HStack>
              <Box
                py="1"
                bg="error.200"
                borderBottomWidth="2"
                minW={["70", "16%"]}
                borderRightWidth="2"
                textAlign="center"
              >
                <Text fontWeight={"semibold"}>O.S.N.</Text>
              </Box>
              <Box
                py="1"
                bg="error.200"
                textAlign="center"
                borderBottomWidth="2"
                minW={["235", "20%"]}
                borderRightWidth="2"
              >
                <Text fontWeight={"semibold"}>Candidate </Text>
              </Box>
              <Box
                py="1"
                bg="error.200"
                borderBottomWidth="2"
                minW={["200", "16%"]}
                borderRightWidth="2"
                textAlign="center"
              >
                <Text fontWeight={"semibold"}>Party</Text>
              </Box>
              <Box
                py="1"
                bg="error.200"
                borderBottomWidth="2"
                minW={["100", "16%"]}
                borderRightWidth="2"
                textAlign="center"
              >
                <Text fontWeight={"semibold"}>Party Symbol</Text>
              </Box>

              <Box
                py="1"
                bg="error.200"
                borderBottomWidth="2"
                minW={["100", "16%"]}
                borderRightWidth="2"
                textAlign="center"
              >
                <Text fontWeight={"semibold"}>Votes </Text>
              </Box>

              <Box
                py="1"
                bg="error.200"
                borderBottomWidth="2"
                minW={["100", "16%"]}
                borderRightWidth="2"
                textAlign="center"
              >
                <Text fontWeight={"semibold"}>% of Votes</Text>
              </Box>
            </HStack>
            {loading ? (
              <Loader />
            ) : selectedCandidates && selectedCandidates.length !== 0 ? (
              selectedCandidates.map(
                ({
                  nominationNumber,
                  name,
                  partyShortcut,
                  partyFlag,
                  voteCount,
                }) => (
                  <HStack>
                    <Box
                      py="1"
                      w={["70", "16%"]}
                      borderBottomWidth="2"
                      borderRightWidth="2"
                      textAlign="center"
                    >
                      <Text fontWeight={"semibold"}>{nominationNumber}</Text>
                    </Box>
                    <Box
                      py="1"
                      textAlign="center"
                      w={["235", "20%"]}
                      borderBottomWidth="2"
                      borderRightWidth="2"
                    >
                      <Text fontWeight={"semibold"}>{name}</Text>
                    </Box>
                    <Box
                      py="1"
                      w={["200", "16%"]}
                      borderBottomWidth="2"
                      borderRightWidth="2"
                      textAlign="center"
                    >
                      <Text fontWeight={"semibold"}>{partyShortcut}</Text>
                    </Box>
                    <Box
                      py="1"
                      w={["100", "16%"]}
                      borderBottomWidth="2"
                      borderRightWidth="2"
                      textAlign="center"
                    >
                      <Image
                        source={{ uri: partyFlag }}
                        mx="auto"
                        size="md"
                        alt={partyShortcut}
                      ></Image>
                    </Box>
                    <Box
                      py="1"
                      w={["100", "16%"]}
                      borderBottomWidth="2"
                      borderRightWidth="2"
                      textAlign="center"
                    >
                      <Text fontWeight={"semibold"}>{voteCount}</Text>
                    </Box>
                    <Box
                      py="1"
                      w={["100", "16%"]}
                      borderBottomWidth="2"
                      borderRightWidth="2"
                      textAlign="center"
                    >
                      <Text fontWeight={"semibold"}>
                        {((+voteCount / +totalVoteCount) * 100).toFixed(2)}
                      </Text>
                    </Box>
                  </HStack>
                )
              )
            ) : (
              <VStack alignItems={"center"}>
                <Heading textAlign={"center"} mt="5">
                  Result will be shown here!
                </Heading>
                <Button
                  bg={"danger.600"}
                  color="white"
                  onPress={() => navigate("/")}
                  mt={["2", "5"]}
                >
                  <Text fontSize={["10", "20"]} color="white">
                    Go back to Home
                  </Text>
                </Button>
              </VStack>
            )}
          </Box>
        </Box>
      </VStack>
    </Layout>
  );
}
