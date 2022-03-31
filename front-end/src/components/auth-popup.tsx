import { Box, Button, Text } from "native-base";
import { useNavigate } from "react-router-dom";
import {
  resetStates,
  useAuthContext,
  useVoteContext,
  resetVoteContextStates,
} from "../contexts";

export const AuthPopup = ({ setShowBox }: { setShowBox: any }) => {
  const {
    state: { isUserLoggedIn, aadharId },
    dispatch,
  } = useAuthContext();
  const { dispatch: voteDispatch } = useVoteContext();

  let navigate = useNavigate();
  return (
    <Box
      position="absolute"
      right={{ base: "3", md: 10 }}
      top={20}
      borderWidth={1}
      borderRadius="md"
      borderColor="gray.300"
      width="300px"
      zIndex={3}
      bgColor="darkBlue.900"
    >
      <Box padding={4}>
        {isUserLoggedIn && (
          <Text color="white" fontSize="2xl" paddingBottom={2}>
            Aadhar no : {aadharId}
          </Text>
        )}
        {!isUserLoggedIn ? (
          <Button
            onPress={() => {
              setShowBox(false);
              navigate("/login");
            }}
            bg={"danger.600"}
          >
            Login
          </Button>
        ) : (
          <Button
            onPress={() => {
              setShowBox(false);
              navigate("/");
              dispatch(resetStates());
              voteDispatch(resetVoteContextStates());
            }}
            backgroundColor="red.500"
            _hover={{ bg: "red.800" }}
          >
            Logout
          </Button>
        )}
      </Box>
    </Box>
  );
};
