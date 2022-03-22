import { InitialStateType } from "./types";

export const initialState: InitialStateType = {
  aadharId: "",
  isUserLoggedIn: false,
  votedCandidate: "",
};

export const data = {
  Suresh: 482253918244,
  Ramesh: 532122269467,
  Mahesh: 468065932286,
  Raghu: 760344621247,
  Narendra: 908623597782,
  Krishna: 809961147437,
  "Pushkar Kumar": 908704156902,
  "Kunal Kumar": 778925466180,
  "Kumar Sanket": 393071790055,
  Pratik: 983881786161,
  Aausi: 756623869645,
  Pratiba: 588109459505,
  Ruchika: 967746320661,
  Rambabu: 727938171119,
  Matajii: 609015917688,
  Mamata: 620107691388,
  "Ravi Varma": 403561319377,
  Rahul: 837970229674,
};

export function findAadharID(aadharID: number) {
  return !!Object.values(data).find((i) => i === aadharID);
}
