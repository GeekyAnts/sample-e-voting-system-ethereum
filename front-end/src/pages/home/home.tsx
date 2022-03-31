import { Button, Text, VStack } from "native-base";
import { useNavigate } from "react-router-dom";
import { Timer } from "./components";
import { Layout, Loader, MainText } from "../../components";
import { useEffect, useState } from "react";
import { useAuthContext, useVoteContext } from "../../contexts";
import "./style.css";
import { useVote } from "../../hooks";
import moment from "moment";

export function HomePage() {
  const {
    state: { isUserLoggedIn, aadharId },
  } = useAuthContext();

  const {
    state: { checkVoteRes, voteTiming, loading },
  } = useVoteContext();
  const { checkUserVotingStatus, getVoteTiming } = useVote();
  const [expire, setExpire] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isUserLoggedIn) {
      checkUserVotingStatus(aadharId);
      getVoteTiming();
    }
  }, [isUserLoggedIn]);
  // useEffect(() => {}, [voteTiming]);
  return (
    <Layout>
      <VStack justifyContent={"center"} alignItems="center">
        {loading ? (
          <Loader light={true} />
        ) : (
          voteTiming && (
            <>
              <MainText>
                {expire ? "Results are out now!" : "Cast Your Vote"}
              </MainText>
              <VStack justifyContent={"center"} alignItems="center">
                {expire ? (
                  <>
                    <Button
                      bg={"danger.600"}
                      onPress={() => navigate("/results")}
                      alignSelf={"center"}
                      mt="5"
                    >
                      Check now
                    </Button>
                  </>
                ) : (
                  <>
                    <Text
                      color="white"
                      mb="5"
                      fontSize={{ base: "md", md: "3xl" }}
                    >
                      before
                    </Text>
                    <Timer
                      expiryTimestamp={
                        new Date(
                          moment
                            .unix(parseInt(voteTiming?.toString()))
                            .format("MM-DD-YYYY")
                        )
                      }
                      onExpire={() => setExpire(true)}
                    />
                    <Button
                      bg={"danger.600"}
                      onPress={() =>
                        checkVoteRes &&
                        navigate(checkVoteRes.canVote ? "/vote" : "/home")
                      }
                      alignSelf={"center"}
                      mt="5"
                    >
                      Vote Now
                    </Button>
                  </>
                )}
              </VStack>
            </>
          )
        )}
      </VStack>
    </Layout>
  );
}
