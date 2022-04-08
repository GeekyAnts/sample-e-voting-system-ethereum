// // SPDX-License-Identifier: GPL-3.0

// pragma solidity >=0.4.25 <0.9.0;

// import "../contracts/Ballot.sol";

// contract BallotTest {
//     Ballot ballotToTest = new Ballot(1649250142, 1662550200);

//     function isEligibleVoter() public {
//         assert.equal(
//             ballotToTest.isVoterEligible(482253918244),
//             true,
//             "Suresh is an eligible voter"
//         );
//     }

//     function isUserVoted() public {
//         ballotToTest.vote(727477314982, 482253918244, 1647943642);
//         assert.equal(
//             ballotToTest.didCurrentVoterVoted(482253918244)[0], // Since this returns 2 params as an array
//             true,
//             "Suresh already casted his vote"
//         );
//     }
// }
