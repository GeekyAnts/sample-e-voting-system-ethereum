// SPDX-License-Identifier: GPL-3.0
pragma experimental ABIEncoderV2;
pragma solidity >=0.4.25 <0.9.0;

/**
 * @title Ballot
 * @dev Implements voting process along with winning candidate
 */
contract Ballot {
    struct Voter {
        uint256 aadharNumber; // voter unique ID
        string name;
        uint8 age;
        uint8 stateCode;
        uint8 constituencyCode;
        bool isAlive;
        bool voted; // if true, that person already voted
        uint256 votedTo; // aadhar number of the candidate
    }

    struct Candidate {
        // Note: If we can limit the length to a certain number of bytes,
        // we can use one of bytes1 to bytes32 because they are much cheaper

        string name;
        string partyShortcut;
        string partyFlag;
        uint256 voteCount; // number of accumulated votes
        uint256 aadharNumber; // unique ID of candidate
        uint8 stateCode;
        uint8 constituencyCode;
    }

    Candidate[] internal candidates;
    mapping(uint256 => Voter) internal voter;
    mapping(uint256 => Candidate) internal candidate;
    uint256 private votingStartTime;
    uint256 private votingEndTime;
    address electionChief;

    /**
     * @dev Create a new ballot to choose one of 'candidateNames'.
     * @param candidates_ List of Candidates
     * @param startTime_ When the voting process will start
     * @param endTime_ When the voting process will end
     */
    constructor(
        Candidate[] memory candidates_,
        uint256 startTime_,
        uint256 endTime_
    ) {
        initializeVoterDatabase_();
        votingStartTime = startTime_;
        votingEndTime = endTime_;
        electionChief = msg.sender;
        for (uint256 i = 0; i < candidates_.length; i++) {
            Candidate memory cn_ = candidates_[i];
            candidate[candidates_[i].aadharNumber] = cn_;
            candidates.push(cn_);
        }
    }

    /**
     * @dev Get candidate list.
     * @param voterAadharNumber Aadhar number of the current voter to send the relevent candidates list
     * @return candidatesList_ All the politicians who participate in the election
     */
    function getCandidateList(uint256 voterAadharNumber)
        public
        view
        returns (Candidate[] memory)
    {
        Voter storage voter_ = voter[voterAadharNumber];
        uint256 _politicianOfMyConstituencyLength = 0;
        for (uint256 i = 0; i < candidates.length; i++) {
            if (
                voter_.stateCode == candidates[i].stateCode &&
                voter_.constituencyCode == candidates[i].constituencyCode
            ) _politicianOfMyConstituencyLength++;
        }
        Candidate[] memory cc = new Candidate[](
            _politicianOfMyConstituencyLength
        );
        uint256 _indx = 0;
        for (uint256 i = 0; i < candidates.length; i++) {
            if (
                voter_.stateCode == candidates[i].stateCode &&
                voter_.constituencyCode == candidates[i].constituencyCode
            ) {
                cc[_indx] = Candidate({
                    name: candidates[i].name,
                    partyShortcut: candidates[i].partyShortcut,
                    partyFlag: candidates[i].partyFlag,
                    voteCount: 0,
                    aadharNumber: candidates[i].aadharNumber,
                    stateCode: candidates[i].stateCode,
                    constituencyCode: candidates[i].constituencyCode
                });
                _indx++;
            }
        }
        return cc;
    }

    /**
     * @dev Get candidate list.
     * @param voterAadharNumber Aadhar number of the current voter to send the relevent candidates list
     * @return voterEligible_ Whether the voter with provided aadhar is eligible or not
     */
    function isVoterEligible(uint256 voterAadharNumber)
        public
        view
        returns (bool voterEligible_)
    {
        Voter storage voter_ = voter[voterAadharNumber];
        if (voter_.age >= 18 && voter_.isAlive) voterEligible_ = true;
    }

    /**
     * @dev Know whether the voter casted their vote or not. If casted get candidate object.
     * @param voterAadharNumber Aadhar number of the current voter
     * @return userVoted_ Boolean value which gives whether current voter casted vote or not
     * @return candidate_ Candidate details to whom voter casted his/her vote
     */
    function didCurrentVoterVoted(uint256 voterAadharNumber)
        public
        view
        returns (bool userVoted_, Candidate memory candidate_)
    {
        Voter storage voter_ = voter[voterAadharNumber];
        userVoted_ = voter_.voted;
        if (userVoted_) {
            Candidate storage politician_ = candidate[voter_.votedTo];
            candidate_ = Candidate({
                name: politician_.name,
                voteCount: 0,
                aadharNumber: politician_.aadharNumber,
                partyShortcut: politician_.partyShortcut,
                partyFlag: politician_.partyFlag,
                stateCode: politician_.stateCode,
                constituencyCode: politician_.constituencyCode
            });
        }
    }

    /**
     * @dev Give your vote to candidate.
     * @param candidateAadharNumber Aadhar Number of the candidate
     * @param voterAadharNumber Aadhar Number of the voter to avoid re-entry
     * @param currentTime_ To check if the election has started or not
     */
    function vote(
        uint256 candidateAadharNumber,
        uint256 voterAadharNumber,
        uint256 currentTime_
    )
        public
        votingLinesAreOpen(currentTime_)
        isEligibleVote(voterAadharNumber, candidateAadharNumber)
    {
        // updating the current voter values
        voter[voterAadharNumber].voted = true;
        voter[voterAadharNumber].votedTo = candidateAadharNumber;

        // Incrementing the votes to the relevant candidate.
        for (uint256 i = 0; i < candidates.length; i++) {
            // we can't iterate via map to find who got most votes,
            // so it has to be updated in array only
            if (candidates[i].aadharNumber == candidateAadharNumber) {
                candidates[i].voteCount++;
                break;
            }
            // Candidate storage politician_ = candidate[candidateAadharNumber];
            // politician_.voteCount++;
        }
    }

    /**
     * @dev Gives ending epoch time of voting
     * @return endTime_ When the voting ends
     */
    function getVotingEndTime() public view returns (uint256 endTime_) {
        endTime_ = votingEndTime;
    }

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

    /**
     * @dev sends all candidate list with their votes count
     * @param currentTime_ Current epoch time of length 10.
     * @return candidateList_ List of Candidate objects
     */
    function getResults(uint256 currentTime_)
        public
        view
        returns (Candidate[] memory)
    {
        // use "assert" for internal errors where as required for both internal & external
        require(votingEndTime < currentTime_);
        return candidates;
    }

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
     * @param candidateAadhar_ Aadhar number of the candidate
     */
    modifier isEligibleVote(uint256 voterAadhar_, uint256 candidateAadhar_) {
        Voter storage voter_ = voter[voterAadhar_];
        Candidate storage politician_ = candidate[candidateAadhar_];
        require(voter_.age >= 18);
        require(voter_.isAlive);
        require(!voter_.voted);
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

    /**
     * Dummy data for Aadhar users
     * In the future, we can have a an external API cal to centralized aadhar DB
     * https://ethereum.stackexchange.com/a/334
     * https://docs.chain.link/docs/make-a-http-get-request/
     */
    function initializeVoterDatabase_() internal {
        // Andhra Pradesh
        voter[uint256(482253918244)] = Voter({
            name: "Suresh",
            aadharNumber: uint256(482253918244),
            age: uint8(21),
            stateCode: uint8(10),
            constituencyCode: uint8(1),
            isAlive: true,
            voted: false,
            votedTo: uint256(0)
        });
        voter[uint256(532122269467)] = Voter({
            name: "Ramesh",
            aadharNumber: uint256(532122269467),
            age: uint8(37),
            stateCode: uint8(10),
            constituencyCode: uint8(1),
            isAlive: false,
            voted: false,
            votedTo: uint256(0)
        });
        voter[uint256(468065932286)] = Voter({
            name: "Mahesh",
            aadharNumber: uint256(468065932286),
            age: uint8(26),
            stateCode: uint8(10),
            constituencyCode: uint8(1),
            isAlive: true,
            voted: false,
            votedTo: uint256(0)
        });
        voter[uint256(809961147437)] = Voter({
            name: "Krishna",
            aadharNumber: uint256(809961147437),
            age: uint8(19),
            stateCode: uint8(10),
            constituencyCode: uint8(2),
            isAlive: true,
            voted: false,
            votedTo: uint256(0)
        });
        voter[uint256(908623597782)] = Voter({
            name: "Narendra",
            aadharNumber: uint256(908623597782),
            age: uint8(36),
            stateCode: uint8(10),
            constituencyCode: uint8(2),
            isAlive: true,
            voted: false,
            votedTo: uint256(0)
        });
        voter[uint256(760344621247)] = Voter({
            name: "Raghu",
            aadharNumber: uint256(760344621247),
            age: uint8(42),
            stateCode: uint8(10),
            constituencyCode: uint8(2),
            isAlive: true,
            voted: false,
            votedTo: uint256(0)
        });
        // Bihar
        voter[uint256(908704156902)] = Voter({
            name: "Pushkar Kumar",
            aadharNumber: uint256(908704156902),
            age: uint8(25),
            stateCode: uint8(11),
            constituencyCode: uint8(1),
            isAlive: true,
            voted: false,
            votedTo: uint256(0)
        });
        voter[uint256(778925466180)] = Voter({
            name: "Kunal Kumar",
            aadharNumber: uint256(778925466180),
            age: uint8(37),
            stateCode: uint8(11),
            constituencyCode: uint8(1),
            isAlive: true,
            voted: false,
            votedTo: uint256(0)
        });
        voter[uint256(393071790055)] = Voter({
            name: "Kumar Sanket",
            aadharNumber: uint256(393071790055),
            age: uint8(29),
            stateCode: uint8(11),
            constituencyCode: uint8(2),
            isAlive: true,
            voted: false,
            votedTo: uint256(0)
        });
        voter[uint256(983881786161)] = Voter({
            name: "Pratik",
            aadharNumber: uint256(983881786161),
            age: uint8(40),
            stateCode: uint8(11),
            constituencyCode: uint8(2),
            isAlive: true,
            voted: false,
            votedTo: uint256(0)
        });
        voter[uint256(756623869645)] = Voter({
            name: "Aausi",
            aadharNumber: uint256(756623869645),
            age: uint8(85),
            stateCode: uint8(11),
            constituencyCode: uint8(1),
            isAlive: false,
            voted: false,
            votedTo: uint256(0)
        });
        voter[uint256(588109459505)] = Voter({
            name: "Pratiba",
            aadharNumber: uint256(588109459505),
            age: uint8(68),
            stateCode: uint8(11),
            constituencyCode: uint8(2),
            isAlive: false,
            voted: false,
            votedTo: uint256(0)
        });
        // West Bengal
        voter[uint256(967746320661)] = Voter({
            name: "Ruchika",
            aadharNumber: uint256(967746320661),
            age: uint8(26),
            stateCode: uint8(12),
            constituencyCode: uint8(1),
            isAlive: true,
            voted: false,
            votedTo: uint256(0)
        });
        voter[uint256(727938171119)] = Voter({
            name: "Rambabu",
            aadharNumber: uint256(727938171119),
            age: uint8(17),
            stateCode: uint8(12),
            constituencyCode: uint8(1),
            isAlive: true,
            voted: false,
            votedTo: uint256(0)
        });
        voter[uint256(609015917688)] = Voter({
            name: "Matajii",
            aadharNumber: uint256(609015917688),
            age: uint8(98),
            stateCode: uint8(12),
            constituencyCode: uint8(1),
            isAlive: true,
            voted: false,
            votedTo: uint256(0)
        });
        voter[uint256(620107691388)] = Voter({
            name: "Mamata",
            aadharNumber: uint256(620107691388),
            age: uint8(63),
            stateCode: uint8(12),
            constituencyCode: uint8(2),
            isAlive: false,
            voted: false,
            votedTo: uint256(0)
        });
        voter[uint256(403561319377)] = Voter({
            name: "Ravi Varma",
            aadharNumber: uint256(403561319377),
            age: uint8(42),
            stateCode: uint8(12),
            constituencyCode: uint8(2),
            isAlive: true,
            voted: false,
            votedTo: uint256(0)
        });
        voter[uint256(837970229674)] = Voter({
            name: "Rahul",
            aadharNumber: uint256(837970229674),
            age: uint8(56),
            stateCode: uint8(12),
            constituencyCode: uint8(2),
            isAlive: true,
            voted: false,
            votedTo: uint256(0)
        });
    }
}
