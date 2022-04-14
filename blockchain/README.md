<p align="center">
  <img width="100%"  src="https://github.com/GeekyAnts/sample-e-voting-system-ethereum/blob/main/sample-images/4.png?raw=true">
</p>

## Important Links

1. [Demo link](https://geekyants.page.link/evoting)<br />
2. [Contract Address](https://rinkeby.etherscan.io/address/0xeD4Ab31BD523402809CEB0D8D4073E8A736C76bE)<br />
3. [Contract Creator](https://rinkeby.etherscan.io/address/0xF2C9ef86c3c98Fc8C265469624dA35af2D72Fa06)<br />
4. [Tx Hash of contract creation](https://rinkeby.etherscan.io/tx/0x5497693608f7b1236546256a8e0c9317ea0f1737844d02883821ca667ff638de)<br />

## E- Voting

Electoral integrity is essential not just for democratic nations but also for state voter’s trust and liability. Political voting methods are crucial in this respect. From a government standpoint, electronic voting technologies can boost voter participation and confidence and rekindle interest in the voting system.

The electronic voting protocols have a single controller that oversees the whole voting process. This technique leads to erroneous selections due to the central authority’s dishonesty (election commission), which is difficult to rectify using existing methods. The decentralized network may be used as a modern electronic voting technique to circumvent the central authority.

Electronic voting systems must be legitimate, accurate, safe, and convenient when used for elections. It has great potential to decrease organizational costs and increase voter turnout. It eliminates the need to print ballot papers or open polling stations—voters can vote from wherever there is an Internet connection.adoption may be limited by potential problems associated with electronic voting systems. Blockchain technology came into the ground to overcome these issues and offers decentralized nodes for electronic voting and is used to produce electronic voting systems mainly because of their end-to-end verification advantages.

## Problem Statement

In democracies around the world, voting is considered a fundamental process for the citizens of a country to have a say in the people who represent them or an issue that impacts them. In days after American independence, voting usually took place via viva voce, or by voice vote. Later on in 1634, Massachusetts became the first state to elect its governor using paper ballots.

For many years, democracies around the world stayed with paper ballots and later moved on to electronic voting machines. Despite system checks, safeguard procedures, and election protocols, these machines are not tamper proof. The critics believe that the proprietary code by which the electronic voting machines operate are secret and can be manipulated. As a result governments around the world have been exploring blockchain as a medium to make the general elections tamper proof and transparent. A system where everyone trusts the data as it is since counterfeit is not possible.

## Solution

In comparison to the conventional voting methods, e-voting has enhanced both the efficiency and the integrity of the process. Because of its flexibility, simplicity of use, and cheap cost compared to general elections, electronic voting is widely utilised in various decisions .

Despite this, existing electronic voting methods run the danger of over-authority and manipulated details, limiting fundamental fairness, privacy, secrecy, anonymity, and transparency in the voting process. Since the e-voting procedures are centralised, licensed by the critical authority, controlled, measured, and monitored in an electronic voting system, is a problem itself for a transparent voting process. Recent controversies in modern democracies such as USA and India amplifies the argument.

It is essential to ensure that assurance in voting does not diminish. In this project we will try to leverage blockchain to fix shortcomings in today’s method in elections and make the polling mechanism clear and accessible, stop illegal voting, strengthen the data protection, and transparent outcome of the polling process. Because of the distributed structure of the blockchain, a smart contract based electronic voting system reduces the risks involved with electronic voting and allows for a tamper-proof for the voting system.

## Implementation of electronic voting:

### Required:

- Aadhar card as user unique indentification.
- Smart Contract consisting of all the rules and protocols required for e-voting.
- Blockchain Network to deploy the Contract. We have used [Rinkeby](https://www.rinkeby.io/#stats) for our contract.
- Website for user Interface where voter can vote. We have created webpage with [React](https://reactjs.org/) & [Native Base](https://nativebase.io/).

### Assumptions:

- Digital print of the Voters (Aadhar card) containing all the info with voting eligibility data like age, state, district and constituency codes, Indian Penal Code information etc updated by Govt. of India.
- Eligible voters have to register themselves in the constituency where they live, upon which Govt. will update all the info to Aadhar card. Individuals are not permitted to participate in the electoral process if they have not registered or do not possess an Aadhar card.
- Only Election Chief can start/update Voting timelines.
- One nation one election

### Who can Vote:

- As per the Indian Constitution, all Indian citizens above the age of 18 years who have registered themselves as voters are eligible to vote. These individuals can vote in national, state, district as well as local government body elections.
- No individual can be detained or prevented from voting, unless they fulfil the criteria for disqualification.
  Every voter is allowed one vote only. A voter can vote at the constituency where he has registered himself.
- Aadhar card should be valid and linked with constituency code.

### Who cannot vote:

- If an individual votes in more than one constituency, his vote is disqualified.
- Already casted vote.
- Voter’s constituency code not matched with ongoing Election constituencies.

### How can you vote:

- Login via Aadhar no. and otp
- If your Aadhar’s constituency code matches with ongoing election, it will show you the Election Vote dashboard else you are not allowed to vote.
  If the election process is still going on, it will give the option to vote.
  > Click Vote -> Select Candidate -> Done
- Vote Casted to selected Candidate
- Final Candidate List with vote count will be displayed after the election voting process is completed.
- You are not allowed to vote/update-vote to different candidate again.
- You are not allowed to vote after Election session ends.

## e-Voting Requirements and Compliance by the Proposed System

- #### Privacy - Keeping an individual’s vote secret

- #### Eligibility - Allowing only registered voters to vote, with each such voter voting only once

- #### Receipt Freeness - Voters should be unable to prove to a third party that they voted in a particular way

- #### Convenience - Voters must be able to vote easily, and everyone who is eligible must be able to vote

- #### Verifiability - The ability to trust the vote tallying process

<br />

# Let's start with E-Voting Smart Contracts

[Do platform Setup! ](../SETUP.md)

## Solidity Functions

### Modifiers

```c++
    /**
     * @notice To check if the voter's age is greater than or equal to 18
     * @param currentTime_ Current epoch time of the voter
     */
    modifier votingLinesAreOpen(uint256 currentTime_) {
        require(currentTime_ >= votingStartTime);
        require(currentTime_ <= votingEndTime);
        _;
    }

    /**
     * @notice To check if the voter's age is greater than or equal to 18
     * @param voterAadhar_ Aadhar number of the current voter
     * @param nominationNumber_ Aadhar number of the candidate
     */
    modifier isEligibleVote(uint256 voterAadhar_, uint256 nominationNumber_) {
        Types.Voter memory voter_ = voter[voterAadhar_];
        Types.Candidate memory politician_ = candidate[nominationNumber_];
        require(voter_.age >= 18);
        require(voter_.isAlive);
        require(voter_.votedTo != 0);
        require(
            (politician_.stateCode == voter_.stateCode &&
                politician_.constituencyCode == voter_.constituencyCode)
        );
        _;
    }

    /**
     * @notice To check if the user is Election Chief or not
     */
    modifier isElectionChief() {
        require(msg.sender == electionChief);
        _;
    }
```

### Voting timelines

- Voting will only be opened between a particular date(s) & election chief has the right to update the start & end dates of the voting process.
- start date can only be updated only if the voting process is not started yet
- Can extend the voting end date after the voting is started & before the voting is ended

```c++
    /**
     * @dev used to update the voting start & end times
     * @param startTime_ Start time that needs to be updated
     * @param currentTime_ Current time that needs to be updated
     */
    function updateVotingStartTime(uint256 startTime_, uint256 currentTime_)
        public
        isElectionChief
    {
        require(votingStartTime > currentTime_);
        votingStartTime = startTime_;
    }

    /**
     * @dev To extend the end of the voting
     * @param endTime_ End time that needs to be updated
     * @param currentTime_ Current time that needs to be updated
     */
    function extendVotingTime(uint256 endTime_, uint256 currentTime_)
        public
        isElectionChief
    {
        require(votingStartTime < currentTime_);
        require(votingEndTime > currentTime_);
        votingEndTime = endTime_;
    }
```

### Results

Everyone can check the voting results once the voting lines are closed

```c++
    /**
     * @dev sends all candidate list with their votes count
     * @param currentTime_ Current epoch time of length 10.
     * @return candidateList_ List of Candidate objects with votes count
     */
    function getResults(uint256 currentTime_)
        public
        view
        returns (Types.Results[] memory)
    {
        require(votingEndTime < currentTime_);
        Types.Results[] memory resultsList_ = new Types.Results[](
            candidates.length
        );
        // Since the candidates will be lesser in count than voter.
        // So looping is acceptable.
        for (uint256 i = 0; i < candidates.length; i++) {
            resultsList_[i] = Types.Results({
                name: candidates[i].name,
                partyShortcut: candidates[i].partyShortcut,
                partyFlag: candidates[i].partyFlag,
                nominationNumber: candidates[i].nominationNumber,
                stateCode: candidates[i].stateCode,
                constituencyCode: candidates[i].constituencyCode,
                voteCount: votesCount[candidates[i].nominationNumber]
            });
        }
        return resultsList_;
    }
```

### Custom Types

```c++
    struct Voter {
        uint256 aadharNumber; // voter unique ID
        string name;
        uint8 age;
        uint8 stateCode;
        uint8 constituencyCode;
        bool isAlive;
        uint256 votedTo; // aadhar number of the candidate
    }

    struct Candidate {
        // Note: If we can limit the length to a certain number of bytes,
        // we can use one of bytes1 to bytes32 because they are much cheaper

        string name;
        string partyShortcut;
        string partyFlag;
        uint256 nominationNumber; // unique ID of candidate
        uint8 stateCode;
        uint8 constituencyCode;
    }

    struct Results {
        string name;
        string partyShortcut;
        string partyFlag;
        uint256 voteCount; // number of accumulated votes
        uint256 nominationNumber; // unique ID of candidate
        uint8 stateCode;
        uint8 constituencyCode;
    }
```

### Voting Methods

| **Function Name**       | **Input Params**                                                                  | **Return Value**                   | **Description**                                                                                                                            |
| ----------------------- | --------------------------------------------------------------------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| isVoterEligible()       | voterAadharNumber                                                                 | Boolean `voterEligible_`           | To check whether voter is eligible to vote or not based on the pre-defined assumptions like the age greater than or equal to 18 & is alive |
| didCurrentVoterVoted()  | voterAadharNumber                                                                 | Boolean `userVoted_`,<br>Candidate | To check if the current voter has casted their vote or not. If voted then returns the candidate object to whom he/she casted their vote to |
| getVotingEndTime()      | -                                                                                 | End time in `epoch`                | To get the voting end time                                                                                                                 |
| getCandidateList()      | voterAadharNumber                                                                 | Candidate[]                        | To get the list of candidates who belongs to the current voter constituency                                                                |
| vote()                  | `nominationNumber` of candidate,<br>voterAadharNumber,<br>current Time in `epoch` | -                                  | To cast one's vote to a particular candidate who belong to their own constituency                                                          |
| getResults()            | current time in `epoch`                                                           | Results[]                          | To get the voting results. Can be called by anyone but only after the voting lines are closed                                              |
|                         |                                                                                   |                                    |                                                                                                                                            |
| updateVotingStartTime() | start time in `epoch`,<br>current time in `epoch`                                 | -                                  | To update the voting start date & time (Can only be called prior to voting start)                                                          |
| extendVotingTime()      | end time in `epoch`,<br>current time in `epoch`                                   | -                                  | To extend the voting timelines (Can only be done once voting process starts & before the voting ends)                                      |

### Versions

Compiler: solc: 0.8.12+commit.f00d7308

Truffle: v5.5.2

Node: v14.17.0

### Quick Start

1.  cd into project repro

        cd E-Voting
        cd blockchain

2.  download node libraries

        npm install

3.  Download/Start ganache

https://truffleframework.com/ganache

4.  Compiling contracts

        truffle compile

5.  Migrating to ganache

_Note depending on ganache cli/ui you my need to change truffle.js port settings Current listing on port : 7545_

        truffle migrate --network development  --reset --all

6.  Testing on ganache

        truffle test

7.  Switch to FrontEnd & Testing

_Note Change settings to your Contract address to point to local_

          cd ..
          cd front-end
          npm install
          npm start

8.  Migrating to Rinkeby

_Note Change truffle settings to your Contract Creator address within the "from" rinkeby configuration_

        truffle migrate --network rinkeby  --reset --all

9.  Start FrontEnd on Rinkeby

_Note Revert back all your local configurations & configure it to point to rinkeby_

        npm start

### Test Voters

| User Name     | Aadhar Number | State          | Constituency | Age | isAlive |
| ------------- | ------------- | -------------- | ------------ | --- | ------- |
| Suresh        | 482253918244  | Andhra Pradesh | Guntur       | 21  | ✅      |
| Ramesh        | 532122269467  | Andhra Pradesh | Guntur       | 37  | ❌      |
| Mahesh        | 468065932286  | Andhra Pradesh | Guntur       | 26  | ✅      |
| Krishna       | 809961147437  | Andhra Pradesh | Krishna      | 19  | ✅      |
| Narendra      | 908623597782  | Andhra Pradesh | Krishna      | 36  | ✅      |
| Raghu         | 760344621247  | Andhra Pradesh | Krishna      | 42  | ✅      |
|               |               |                |              |     |         |
| Pushkar Kumar | 908704156902  | Bihar          | Patna        | 25  | ✅      |
| Kunal Kumar   | 778925466180  | Bihar          | Patna        | 37  | ✅      |
| Aausi         | 756623869645  | Bihar          | Patna        | 85  | ❌      |
| Ruchika       | 967746320661  | Bihar          | Patna        | 26  | ✅      |
| Rambabu       | 727938171119  | Bihar          | Patna        | 17  | ✅      |
| Matajii       | 609015917688  | Bihar          | Patna        | 98  | ✅      |
| Kumar Sanket  | 393071790055  | Bihar          | Dehri        | 29  | ✅      |
| Pratik        | 983881786161  | Bihar          | Dehri        | 40  | ✅      |
| Pratiba       | 588109459505  | Bihar          | Dehri        | 68  | ❌      |
| Mamata        | 620107691388  | Bihar          | Dehri        | 63  | ❌      |
| Ravi Varma    | 403561319377  | Bihar          | Dehri        | 42  | ✅      |
| Rahul         | 837970229674  | Bihar          | Dehri        | 56  | ✅      |

### Politicians who participate in elections

| Candidate Name     | Party Name | State          | Constituency |
| ------------------ | ---------- | -------------- | ------------ |
| Chandra Babu Naidu | TDP        | Andhra Pradesh | Guntur       |
| Jagan Mohan Reddy  | YSRCP      | Andhra Pradesh | Guntur       |
| G V Anjaneyulu     | TDP        | Andhra Pradesh | Krishna      |
| Anil Kumar Yadav   | YSRCP      | Andhra Pradesh | Krishna      |
|                    |            |                |              |
| Narendra Modi      | BJP        | Bihar          | Patna        |
| Rahul Gandhi       | INC        | Bihar          | Patna        |
| Tejaswi Yadav      | RJD        | Bihar          | Patna        |
| Arvind Kejriwal    | AAP        | Bihar          | Patna        |
| Mamata Banarjee    | TMC        | Bihar          | Patna        |
| Jyoti Basu         | CPIM       | Bihar          | Patna        |
| Amit Shah          | BJP        | Bihar          | Dehri        |
| Priyanka Gandhi    | INC        | Bihar          | Dehri        |
| Lalu Yadav         | RJD        | Bihar          | Dehri        |
| Manish Sisodia     | AAP        | Bihar          | Dehri        |
| Prakash Karat      | CPIM       | Bihar          | Dehri        |

## Team ✨

Meet the amazing team who developed this project.

<table>
  <tr>
    <td align="center"><a href="https://in.linkedin.com/in/sur950"><img src="https://avatars.githubusercontent.com/u/46712434?v=4" width="100px;" alt=""/><br /><sub><b>Suresh Konakanchi</b></sub></a><br /><a href="https://github.com/GeekyAnts/sample-e-voting-system-ethereum" title="Code">💻</a> <a href="https://geekyants.github.io/sample-e-voting-system-ethereum/" title="Documentation">📖</a> <a href="https://github.com/GeekyAnts/sample-e-voting-system-ethereum/issues" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://twitter.com/95pushkar"><img src="https://avatars.githubusercontent.com/u/41522922?v=4" width="100px;" alt=""/><br /><sub><b>Pushkar Kumar</b></sub></a><br /><a href="https://github.com/GeekyAnts/sample-e-voting-system-ethereum" title="Code">💻</a> <a href="https://geekyants.github.io/sample-e-voting-system-ethereum/" title="Documentation">📖</a> <a href="https://github.com/GeekyAnts/sample-e-voting-system-ethereum/issues" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://twitter.com/ruchikaSjv"><img src="https://avatars.githubusercontent.com/u/32259133?v=4" width="100px;" alt=""/><br /><sub><b>Ruchika Gupta</b></sub></a><br /><a href="https://github.com/GeekyAnts/sample-e-voting-system-ethereum" title="Code">💻</a> <a href="https://geekyants.github.io/sample-e-voting-system-ethereum/" title="Documentation">📖</a> <a href="https://github.com/GeekyAnts/sample-e-voting-system-ethereum/issues" title="Maintenance">🚧</a></td>
  </tr>
  </table>

## Sample Images

<img src="https://github.com/GeekyAnts/sample-e-voting-system-ethereum/blob/main/sample-images/1.png?raw=true"><br>
<img src="https://github.com/GeekyAnts/sample-e-voting-system-ethereum/blob/main/sample-images/2.png?raw=true"><br>
<img src="https://github.com/GeekyAnts/sample-e-voting-system-ethereum/blob/main/sample-images/3.png?raw=true"><br>
<img src="https://github.com/GeekyAnts/sample-e-voting-system-ethereum/blob/main/sample-images/4.png?raw=true"><br>
