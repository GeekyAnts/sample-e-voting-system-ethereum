import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import { toastError } from "../utils/toastMessage";
import { getCurrentEpoch } from "../utils/util";
import { BASE_URL, CONTRACT_ADDRESS, GAS_FEE } from "./config";
import {
  Candidate,
  CastVoteResponse,
  CheckVoteStatusResponse,
} from "./interfaces";
const contractABI = require("./Ballot.json");

declare let window: any;

export class BallotService {
  private static instance: BallotService;
  private _ballotContract!: Contract;
  private _accountAdress: string | undefined;
  private constructor() {
    const web3 = this.getWeb3();
    this._ballotContract = this.getBallotContract(web3, CONTRACT_ADDRESS);
  }

  public static getInstance(): BallotService {
    if (!BallotService.instance) {
      BallotService.instance = new BallotService();
    }

    return BallotService.instance;
  }
  async ethEnabled() {
    if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      await window.ethereum
        .enable()
        .then((account: any) => {
          console.log(account[0], "kkkkkkkkkkkkkkkkk");

          this._accountAdress = account[0];
        })
        .catch((error: any) => {
          // User denied account access
          console.log(error, "i m here");
          toastError(
            "You are not connected to MetaMask! Please connect to MetaMask."
          );
        });
    }
  }
  private getWeb3() {
    return new Web3(BASE_URL);
  }

  getBallotContract(web3: Web3, contractAddress: string) {
    // console.log("You are  connected to MetaMask", accountAddress);
    // const accountAddress = this.ethEnabled();
    // console.log("accountAddress", window.ethereum.selectedAddress);
    // if (accountAddress && !accountAddress.length) {
    //   console.log("You are not connected to MetaMask");
    //   throw "You are not connected to MetaMask";
    // }

    web3.eth.getBlockNumber().then(console.log);
    console.log("i m here");
    const contractAbi = contractABI["abi"];
    return new web3.eth.Contract(contractAbi, contractAddress, {
      from: this._accountAdress,
      gas: GAS_FEE,
    });
  }

  public async getAllCandidates(
    voterAadharNumber: string
  ): Promise<Candidate[]> {
    try {
      const candidateList: Candidate[] = await this._ballotContract.methods
        .getCandidateList(voterAadharNumber)
        .call();
      console.log("candidateList", candidateList, voterAadharNumber);
      return candidateList;
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }

  async isVoterEligible(voterAadharNo: string): Promise<boolean> {
    try {
      const isEligible: boolean = await this._ballotContract.methods
        .isVoterEligible(voterAadharNo)
        .call();
      console.log(isEligible, "isEligible");
      return isEligible;
    } catch (error) {
      throw error;
    }
  }

  async castYourVote(
    voterAadharNo: string,
    candidateAadharNo: string
  ): Promise<CastVoteResponse> {
    try {
      const secondsSinceEpoch = getCurrentEpoch();
      if (this._accountAdress === undefined) {
        await this.ethEnabled();
        console.log(this._accountAdress);
        this._ballotContract = this.getBallotContract(
          this.getWeb3(),
          CONTRACT_ADDRESS
        );
      }
      let castVoteRes: CastVoteResponse;
      const castVote = await this.checkVoterVoted(voterAadharNo);
      console.log(castVote, "castVote", candidateAadharNo, voterAadharNo);
      // Check if voter already casted his vote
      if (castVote.canVote) {
        const giveVote = await this._ballotContract.methods
          .vote(candidateAadharNo, voterAadharNo, secondsSinceEpoch)
          .send();
        console.log("vote Casted => ", giveVote);

        castVoteRes = {
          msg: "You successfully casted your vote!",
          error: false,
        };
      } else {
        castVoteRes = {
          msg:
            "Already vote casted to" +
            castVote.votedCandidate?.name +
            " - " +
            castVote.votedCandidate?.partyShortcut,
          error: false,
        };
      }
      return castVoteRes;
    } catch (error) {
      console.log("Error: at viite", error);
      throw error;
    }
  }

  async checkVoterVoted(
    voterAadharNo: string
  ): Promise<CheckVoteStatusResponse> {
    let votedCandidate: CheckVoteStatusResponse;
    try {
      const voted = await this._ballotContract.methods
        .didCurrentVoterVoted(voterAadharNo)
        .call();
      votedCandidate = {
        canVote: !voted.userVoted_,
        votedCandidate: voted.candidate_,
        error: false,
      };
      return votedCandidate;
    } catch (error) {
      console.log("Error:", error);
      throw error;
    }
  }

  async allCandidatesWithVoteCount(): Promise<Candidate[]> {
    try {
      const secondsSinceEpoch = getCurrentEpoch();
      const winner: Candidate[] = await this._ballotContract.methods
        .allCandidatesWithVoteCount(secondsSinceEpoch)
        .call();
      return winner;
    } catch (error) {
      console.log("Error:", error);
      throw error;
    }
  }

  async getVotingTimeDuration(): Promise<string> {
    try {
      const voteDuration = await this._ballotContract.methods
        .getVotingEndTime()
        .call();
      console.log(voteDuration);
      return voteDuration;
    } catch (error) {
      console.log("Error:", error);
      throw error;
    }
  }
}
