const Ballot = artifacts.require("Ballot");

/**
* State Code Mappings
   {
     "10": "Andhra Pradesh",
     "11": "Bihar",
     "12": "West Bengal"
   }
* State-Constituency Code Mappings
   {
     "10":{
       "1": "Guntur",
       "2": "Krishna"
     }
     "11":{
       "1": "Patna",
       "2": "Dehri"
     },
     "12":{
       "1": "Kolkata",
       "2": "Asansol"
     }
   }
*/

module.exports = function (deployer, network) {
  const _candidatesData = [
    // Andhra Pradesh
    {
      name: "Chandra Babu Naidu",
      partyShortcut: "TDP",
      partyFlag:
        "https://slack-imgs.com/?c=1&o1=ro&url=https%3A%2F%2Fi.ibb.co%2F5BMbj7G%2Finc.png",
      voteCount: 0,
      aadharNumber: 727477314982,
      stateCode: 10,
      constituencyCode: 1,
    },
    {
      name: "Jagan Mohan Reddy",
      partyShortcut: "YSRCP",
      partyFlag:
        "https://slack-imgs.com/?c=1&o1=ro&url=https%3A%2F%2Fi.ibb.co%2F5BMbj7G%2Finc.png",
      voteCount: 0,
      aadharNumber: 835343722350,
      stateCode: 10,
      constituencyCode: 1,
    },
    {
      name: "G V Anjaneyulu",
      partyShortcut: "TDP",
      partyFlag:
        "https://slack-imgs.com/?c=1&o1=ro&url=https%3A%2F%2Fi.ibb.co%2F5BMbj7G%2Finc.png",
      voteCount: 0,
      aadharNumber: 969039304119,
      stateCode: 10,
      constituencyCode: 2,
    },
    // {
    //   name: "Anil Kumar Yadav",
    //   partyShortcut: "YSRCP",
    //   partyFlag: "https://ibb.co/d72NRhK",
    //   voteCount: 0,
    //   aadharNumber: 429300763874,
    //   stateCode: 10,
    //   constituencyCode: 2,
    // },
    // Bihar
    // {
    //   name: "Chandra Babu Naidu",
    //   partyShortcut: "TDP",
    //   partyFlag: "https://ibb.co/B4QDMDS",
    //   voteCount: 0,
    //   aadharNumber: 895363124093,
    //   stateCode: 11,
    //   constituencyCode: 1,
    // },
    // {
    //   name: "Jagan Mohan Reddy",
    //   partyShortcut: "YSRCP",
    //   partyFlag: "https://ibb.co/d72NRhK",
    //   voteCount: 0,
    //   aadharNumber: 994080299774,
    //   stateCode: 11,
    //   constituencyCode: 1,
    // },
    // {
    //   name: "G V Anjaneyulu",
    //   partyShortcut: "TDP",
    //   partyFlag: "https://ibb.co/B4QDMDS",
    //   voteCount: 0,
    //   aadharNumber: 611996864962,
    //   stateCode: 11,
    //   constituencyCode: 2,
    // },
    // {
    //   name: "Anil Kumar Yadav",
    //   partyShortcut: "YSRCP",
    //   partyFlag: "https://ibb.co/d72NRhK",
    //   voteCount: 0,
    //   aadharNumber: 866627241136,
    //   stateCode: 11,
    //   constituencyCode: 2,
    // },
    // // West Bengal
    // {
    //   name: "Chandra Babu Naidu",
    //   partyShortcut: "TDP",
    //   partyFlag: "https://ibb.co/B4QDMDS",
    //   voteCount: 0,
    //   aadharNumber: 962912138327,
    //   stateCode: 12,
    //   constituencyCode: 1,
    // },
    // {
    //   name: "Jagan Mohan Reddy",
    //   partyShortcut: "YSRCP",
    //   partyFlag: "https://ibb.co/d72NRhK",
    //   voteCount: 0,
    //   aadharNumber: 960394030700,
    //   stateCode: 12,
    //   constituencyCode: 1,
    // },
    // {
    //   name: "G V Anjaneyulu",
    //   partyShortcut: "TDP",
    //   partyFlag: "https://ibb.co/B4QDMDS",
    //   voteCount: 0,
    //   aadharNumber: 727180476185,
    //   stateCode: 12,
    //   constituencyCode: 2,
    // },
    // {
    //   name: "Anil Kumar Yadav",
    //   partyShortcut: "YSRCP",
    //   partyFlag: "https://ibb.co/d72NRhK",
    //   voteCount: 0,
    //   aadharNumber: 807304648773,
    //   stateCode: 12,
    //   constituencyCode: 2,
    // },
  ];

  if (network == "development") {
    deployer.deploy(Ballot, _candidatesData, 1647519867, 1648339201);
    // convert the time epoch of when voting ends & to UTC
    // START => Thursday, 17 March 2022 17:54:27 IST
    // END => Sunday, 27 March 2022 05:30:01 IST
  } else if (network == "live") {
    deployer.deploy(Ballot, _candidatesData, 1647519867, 1648339201);
  }
};
