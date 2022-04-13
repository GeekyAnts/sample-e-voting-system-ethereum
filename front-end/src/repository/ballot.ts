// import Web3 from "web3";
// import { Contract } from "web3-eth-contract";
import { getCurrentEpoch } from "../utils/util";
import { CONTRACT_ADDRESS } from "./config";
import {
  Candidate,
  CastVoteResponse,
  CheckVoteStatusResponse,
} from "./interfaces";
import { Contract, ethers } from "ethers";
const contractABI = require("./Ballot.json");

declare let window: any;

export class BallotService {
  private static instance: BallotService;
  private _ballotContract!: Contract;
  private _accountAdress: string | undefined;
  private constructor() {}

  public static getInstance(): BallotService {
    if (!BallotService.instance) {
      BallotService.instance = new BallotService();
    }

    return BallotService.instance;
  }
  checkedWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Get MetaMask!");
        return false;
      }
      await ethereum.enable();

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${Number(4).toString(16)}` }],
      });
      this._accountAdress = accounts[0];
      this._ballotContract = this.getBallotContract(CONTRACT_ADDRESS);
      return true;
    } catch (error) {
      console.log(error);
      alert(error);
      return false;
    }
  };

  async ethEnabled() {
    return await this.checkedWallet();
  }

  getBallotContract(contractAddress: string) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(contractAddress, contractABI["abi"], signer);
  }

  public async getAllCandidates(
    voterAadharNumber: string
  ): Promise<Candidate[]> {
    try {
      await this.ethEnabled();
      const candidateList: Candidate[] =
        await this._ballotContract.getCandidateList(voterAadharNumber);
      return candidateList;
    } catch (error) {
      console.log("Error:", error);
      throw error;
    }
  }

  async isVoterEligible(voterAadharNo: string): Promise<boolean> {
    try {
      await this.ethEnabled();
      const isEligible: boolean = await this._ballotContract.isVoterEligible(
        voterAadharNo
      );
      return isEligible;
    } catch (error) {
      console.log("Error:", error);
      throw error;
    }
  }

  async castYourVote(
    voterAadharNo: string,
    nominationNumber: string
  ): Promise<CastVoteResponse> {
    try {
      await this.ethEnabled();
      const secondsSinceEpoch = getCurrentEpoch();
      if (this._accountAdress === undefined) {
        await this.ethEnabled();
      }
      let castVoteRes: CastVoteResponse;
      const castVote = await this.checkVoterVoted(voterAadharNo);
      console.log(castVote, "castVote", nominationNumber, voterAadharNo);
      // Check if voter already casted his vote
      if (castVote.canVote) {
        const giveVote = await this._ballotContract.vote(
          nominationNumber,
          voterAadharNo,
          secondsSinceEpoch
        );
        // .send();
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
      console.log("Error:", error);
      throw error;
    }
  }

  async checkVoterVoted(
    voterAadharNo: string
  ): Promise<CheckVoteStatusResponse> {
    let votedCandidate: CheckVoteStatusResponse;
    try {
      await this.ethEnabled();
      const voted = await this._ballotContract.didCurrentVoterVoted(
        voterAadharNo
      );
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

  async getElectionResult(): Promise<Candidate[]> {
    try {
      await this.ethEnabled();
      // const secondsSinceEpoch = getCurrentEpoch();
      const secondsSinceEpoch = 1900904953;
      const result: Candidate[] = await this._ballotContract.getResults(
        secondsSinceEpoch
      );

      return result;
    } catch (error) {
      console.log("Error:", error);
      throw error;
    }
  }

  async getVotingTimeDuration(): Promise<string> {
    try {
      await this.ethEnabled();
      const voteDuration = await this._ballotContract.getVotingEndTime();
      console.log(voteDuration);
      return voteDuration;
    } catch (error) {
      console.log("Error:", error);
      throw error;
    }
  }
}
