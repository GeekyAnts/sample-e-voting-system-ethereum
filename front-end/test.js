const Web3 = require("web3");
const fs = require("fs");
// const ethers = require("ethers");

var _accountAdress;
var _ballotContract;

function getWeb3() {
  return new Web3(
    "https://rinkeby.infura.io/v3/e0c0649106b74055b75eabebb028bc5f"
  );
}

function getBallotContract(web3, contractAddress) {
  const abi = JSON.parse(
    fs.readFileSync("./Ballot.abi", { encoding: "utf-8" })
  );
  return new web3.eth.Contract(abi, contractAddress, {
    from: _accountAdress,
    gas: 300000,
  });
}

async function ethEnabled() {
  // const itx = new ethers.providers.InfuraProvider(
  //   "rinkeby",
  //   "e0c0649106b74055b75eabebb028bc5f"
  // );
  // console.log(itx);
  _accountAdress = "0xF2C9ef86c3c98Fc8C265469624dA35af2D72Fa06";
  // if (window.web3) {
  //   window.web3 = new Web3(window.web3.currentProvider);
  //   await window.ethereum
  //     .enable()
  //     .then((account) => {
  //       console.log(account[0], "kkkkkkkkkkkkkkkkk");
  //       _accountAdress = "0xF2C9ef86c3c98Fc8C265469624dA35af2D72Fa06";
  //     })
  //     .catch((error) => {
  //       // User denied account access
  //       console.log(error, "i m here");
  //       toastError(
  //         "You are not connected to MetaMask! Please connect to MetaMask."
  //       );
  //     });
  // }
}

async function getAllCandidates(voterAadharNumber) {
  try {
    const candidateList = await _ballotContract.methods
      .getCandidateList(voterAadharNumber)
      .call();
    console.log("candidateList", candidateList, voterAadharNumber);
    return candidateList;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}

async function isVoterEligible(voterAadharNo) {
  try {
    const isEligible = await _ballotContract.methods
      .isVoterEligible(voterAadharNo)
      .call();
    console.log(isEligible, "isEligible");
    return isEligible;
  } catch (error) {
    throw error;
  }
}

function getCurrentEpoch() {
  const secondsSinceEpoch = Math.round(Date.now() / 1000);
  return secondsSinceEpoch;
}

async function castYourVote(voterAadharNo, candidateAadharNo) {
  try {
    const secondsSinceEpoch = getCurrentEpoch();
    let castVoteRes;
    const castVote = await checkVoterVoted(voterAadharNo);
    console.log(castVote, "castVote", candidateAadharNo, voterAadharNo);
    // Check if voter already casted his vote
    if (castVote.canVote) {
      const giveVote = await _ballotContract.methods
        .vote(candidateAadharNo, voterAadharNo, secondsSinceEpoch)
        .send({ from: _accountAdress });
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

async function checkVoterVoted(voterAadharNo) {
  let votedCandidate;
  try {
    const voted = await _ballotContract.methods
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

async function main() {
  try {
    if (_accountAdress === undefined) {
      await ethEnabled();
      console.log(_accountAdress);
      _ballotContract = getBallotContract(
        getWeb3(),
        "0x259C637f62301218125834396187f29333BD776C"
      );
    }
    // const candidateList = await getAllCandidates(482253918244);
    // console.log(`candidateList => ${candidateList}`);
    // const didIVoted = await isVoterEligible(482253918244);
    // console.log(`didIVoted => ${didIVoted}`);
    const castVoteRes = await castYourVote(482253918244, 727477314982);
    console.log(`castVoteRes => ${castVoteRes}`);
  } catch (e) {
    console.log("Error: ", e);
  }
}

main();
