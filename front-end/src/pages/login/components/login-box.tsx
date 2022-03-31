import { Box, Button, Center, FormControl, Heading, VStack } from "native-base";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { OutlineTextField } from "../../../components/text-fields";
import { findAadharID } from "../../../contexts/auth-context/data";
import {
  useAuthContext,
  setAadharID,
  setLoginStatus,
  useVoteContext,
} from "../../../contexts";
import { useVote } from "../../../hooks";
import { BallotService } from "../../../repository/ballot";
import { toastError } from "../../../utils/toastMessage";

export const LoginBox = () => {
  const [aadhar, setAadhar] = useState<string>("");
  const [otp, setOTP] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ aadhar: false, otp: false });
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();
  const {
    state: { checkVoteRes },
  } = useVoteContext();
  const { checkVoterEligibility } = useVote();
  const {
    state: { isUserLoggedIn },
  } = useAuthContext();

  useEffect(() => {
    if (isUserLoggedIn) {
      navigate("/");
    }
  }, []);

  async function validate() {
    if (aadhar.length < 12 || !findAadharID(+aadhar)) {
      setError((curr) => ({ ...curr, aadhar: true }));
      return false;
    } else if (otp !== "123456") {
      setError((curr) => ({ ...curr, otp: true }));
      return false;
    } else {
      const isVoterEligible = await BallotService.getInstance().isVoterEligible(
        aadhar
      );
      if (!isVoterEligible)
        toastError(
          "User age is less than 18 years or User is dead, therefore he can't vote!"
        );
      return isVoterEligible;
    }
    // return true;
  }
  async function userLogin() {
    try {
      setLoading(true);
      if (await validate()) {
        dispatch(setLoginStatus(true));
        dispatch(setAadharID(aadhar));
        navigate("/home");
        // checkVoterEligibility(aadhar);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Box
      borderRadius={[3, 8]}
      flexDirection={{ base: "column", md: "row" }}
      w={{ base: "100%", md: "50%" }}
      h={{ base: "100%", md: "450" }}
      overflow="hidden"
      shadow="2"
    >
      <Center
        display={{ base: "none", md: "flex" }}
        bgColor="info.600"
        flex="50%"
      >
        <Heading color="white">E-Voting</Heading>
      </Center>
      <Box
        justifyContent="center"
        bgColor="white"
        p={5}
        flex={{ base: "80%", md: "50%" }}
        borderTopRadius={{ base: 8, md: 0 }}
      >
        <Heading textAlign="left" mt="4" fontWeight="medium" size="xs">
          Log in to continue!
        </Heading>

        <VStack space={{ base: "6", md: "3" }} mt="5">
          <FormControl isInvalid={error.aadhar} isRequired>
            <OutlineTextField
              type="email"
              placeholder="Enter AADHAR card no."
              initialValue={aadhar}
              handleOnChange={setAadhar}
            />

            <FormControl.ErrorMessage>
              invalid aadhaar id
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isInvalid={error.otp} isRequired>
            <OutlineTextField
              type="text"
              placeholder="Enter OTP"
              initialValue={otp}
              handleOnChange={setOTP}
            />
            <FormControl.ErrorMessage>invalid OTP</FormControl.ErrorMessage>
          </FormControl>
          {loading ? (
            <Button bg={"danger.600"}>Logging In...</Button>
          ) : (
            <Button
              w={"20"}
              bg={"danger.600"}
              color="white"
              onPress={() => userLogin()}
            >
              LOG IN
            </Button>
          )}
        </VStack>
      </Box>
    </Box>
  );
};
