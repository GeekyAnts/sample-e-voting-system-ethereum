import { Button, HStack, Text, VStack } from "native-base";
import { useNavigate } from "react-router";
import { Layout, MainText } from "../../components";
import { useAuthContext } from "../../contexts";
export function LandingPage() {
  const {
    state: { isUserLoggedIn, aadharId },
  } = useAuthContext();
  let navigate = useNavigate();

  return (
    <Layout>
      <div className="image-bg">
        <VStack justifyContent={"center"} alignItems="center">
          <MainText>Welcome to E-voting</MainText>
          <HStack>
            <Button
              bg={"danger.600"}
              color="white"
              onPress={() =>
                isUserLoggedIn ? navigate("/home") : navigate("/login")
              }
            >
              {!isUserLoggedIn ? (
                <Text fontSize={["10", "20"]} color="white">
                  Log In
                </Text>
              ) : (
                <Text fontSize={["10", "20"]} color="white">
                  Start Voting
                </Text>
              )}
            </Button>
            <Button
              bg={"danger.600"}
              color="white"
              onPress={() => navigate("/results")}
              ml={["0", "5"]}
            >
              <Text fontSize={["10", "20"]} color="white">
                View Results
              </Text>
            </Button>
          </HStack>
        </VStack>
      </div>
    </Layout>
  );
}
