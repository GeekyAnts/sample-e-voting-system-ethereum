import { Button, Text, VStack } from "native-base";
import { useNavigate } from "react-router-dom";
import { Timer } from "./components";
import { Layout, MainText } from "../../components";
import { useEffect, useState } from "react";
import { useAuthContext, useVoteContext } from "../../contexts";
import "./style.css";
import { useVote } from "../../hooks";

export function HomePage() {
  const {
    state: { isUserLoggedIn, aadharId },
  } = useAuthContext();

  const {
    state: { checkVoteRes, voteTiming },
  } = useVoteContext();
  const { checkUserVotingStatus, getVoteTiming } = useVote();
  const [expire, setExpire] = useState(false);
  const navigate = useNavigate();
  const time = new Date("03-27-2022");
  // time.setSeconds(time.getSeconds() + 600);
  // const time = new Date(parseInt(voteTiming) * 1000);
  // time.setSeconds(time.getSeconds() + 600);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    if (isUserLoggedIn) {
      checkUserVotingStatus(aadharId);
      getVoteTiming();
    }
  }, [isUserLoggedIn]);
  return (
    <Layout>
      <VStack justifyContent={"center"} alignItems="center">
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
              <Text color="white" mb="5" fontSize={{ base: "md", md: "3xl" }}>
                before
              </Text>
              <Timer expiryTimestamp={time} onExpire={() => setExpire(true)} />
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
      </VStack>
    </Layout>
  );
}
