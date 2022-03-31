import { Button, Modal, Text } from "native-base";
import { useNavigate } from "react-router";
import { useAuthContext } from "../../../contexts";
import { useVote } from "../../../hooks";
import { Candidate } from "../../../repository/interfaces";

export function ConfirmVote({
  modalVisible,
  setModalVisible,
  candidate,
}: {
  modalVisible: boolean;
  setModalVisible: Function;
  candidate: Candidate;
}) {
  let navigate = useNavigate();
  const {
    state: { aadharId },
  } = useAuthContext();
  const { castVote } = useVote();

  async function handleOnClick() {
    try {
      setModalVisible(false);
      await castVote(aadharId, candidate);
      return navigate("/home");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Modal isOpen={modalVisible} onClose={setModalVisible} size={"md"}>
      <Modal.Content maxH="212">
        <Modal.CloseButton />
        <Modal.Header>VOTE Policy</Modal.Header>
        <Modal.Body>
          <Text>This action can not be undone!</Text>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={() => {
                setModalVisible(false);
              }}
            >
              cancel
            </Button>
            <Button bg={"danger.600"} onPress={handleOnClick}>
              ok
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
