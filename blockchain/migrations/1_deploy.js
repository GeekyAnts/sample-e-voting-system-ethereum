const Ballot = artifacts.require("Ballot");

/**
* State Code Mappings
   {
     "10": "Andhra Pradesh",
     "11": "Bihar"
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
   }
*/

module.exports = function (deployer, network) {
  const _candidatesData = [
    // Andhra Pradesh
    {
      name: "Chandra Babu Naidu",
      partyShortcut: "TDP",
      partyFlag:
        "https://res.cloudinary.com/dj9ttsbgm/image/upload/v1648101065/tdp_qh1rkj.png",
      voteCount: 0,
      aadharNumber: 727477314982,
      stateCode: 10,
      constituencyCode: 1,
    },
    {
      name: "Jagan Mohan Reddy",
      partyShortcut: "YSRCP",
      partyFlag:
        "https://res.cloudinary.com/dj9ttsbgm/image/upload/v1648101065/ysrcp_sas311.png",
      voteCount: 0,
      aadharNumber: 835343722350,
      stateCode: 10,
      constituencyCode: 1,
    },
    {
      name: "G V Anjaneyulu",
      partyShortcut: "TDP",
      partyFlag:
        "https://res.cloudinary.com/dj9ttsbgm/image/upload/v1648101065/tdp_qh1rkj.png",
      voteCount: 0,
      aadharNumber: 969039304119,
      stateCode: 10,
      constituencyCode: 2,
    },
    {
      name: "Anil Kumar Yadav",
      partyShortcut: "YSRCP",
      partyFlag:
        "https://res.cloudinary.com/dj9ttsbgm/image/upload/v1648101065/ysrcp_sas311.png",
      voteCount: 0,
      aadharNumber: 429300763874,
      stateCode: 10,
      constituencyCode: 2,
    },
    // Bihar
    {
      name: "Narendra Modi",
      partyShortcut: "BJP",
      partyFlag:
        "https://res.cloudinary.com/dj9ttsbgm/image/upload/v1648101064/bjp_nk4snw.png",
      voteCount: 0,
      aadharNumber: 895363124093,
      stateCode: 11,
      constituencyCode: 1,
    },
    {
      name: "Rahul Gandhi",
      partyShortcut: "INC",
      partyFlag:
        "https://res.cloudinary.com/dj9ttsbgm/image/upload/v1648101064/inc_s1oqn5.png",
      voteCount: 0,
      aadharNumber: 879824052764,
      stateCode: 11,
      constituencyCode: 1,
    },
    {
      name: "Tejaswi Yadav",
      partyShortcut: "RJD",
      partyFlag:
        "https://res.cloudinary.com/dj9ttsbgm/image/upload/v1648101065/1200px-RJD_Flag.svg_arrrvt.png",
      voteCount: 0,
      aadharNumber: 994080299774,
      stateCode: 11,
      constituencyCode: 1,
    },
    {
      name: "Arvind Kejriwal",
      partyShortcut: "AAP",
      partyFlag:
        "https://res.cloudinary.com/dj9ttsbgm/image/upload/v1648101065/aap_ujguyl.png",
      voteCount: 0,
      aadharNumber: 807033055701,
      stateCode: 11,
      constituencyCode: 1,
    },
    {
      name: "Jyoti Basu",
      partyShortcut: "CPIM",
      partyFlag:
        "https://res.cloudinary.com/dj9ttsbgm/image/upload/v1648101064/1024px-Cpim_party_symbol.svg_mu1gpp.png",
      voteCount: 0,
      aadharNumber: 615325500020,
      stateCode: 11,
      constituencyCode: 1,
    },
    {
      name: "Amit Shah",
      partyShortcut: "BJP",
      partyFlag:
        "https://res.cloudinary.com/dj9ttsbgm/image/upload/v1648101064/bjp_nk4snw.png",
      voteCount: 0,
      aadharNumber: 611996864962,
      stateCode: 11,
      constituencyCode: 2,
    },
    {
      name: "Priyanka Gandhi",
      partyShortcut: "INC",
      partyFlag:
        "https://res.cloudinary.com/dj9ttsbgm/image/upload/v1648101064/inc_s1oqn5.png",
      voteCount: 0,
      aadharNumber: 866627241136,
      stateCode: 11,
      constituencyCode: 2,
    },
    {
      name: "Lalu Yadav",
      partyShortcut: "RJD",
      partyFlag:
        "https://res.cloudinary.com/dj9ttsbgm/image/upload/v1648101065/1200px-RJD_Flag.svg_arrrvt.png",
      voteCount: 0,
      aadharNumber: 765724506305,
      stateCode: 11,
      constituencyCode: 2,
    },
    {
      name: "Manish Sisodia",
      partyShortcut: "AAP",
      partyFlag:
        "https://res.cloudinary.com/dj9ttsbgm/image/upload/v1648101065/aap_ujguyl.png",
      voteCount: 0,
      aadharNumber: 897855877716,
      stateCode: 11,
      constituencyCode: 2,
    },
    {
      name: "Prakash Karat",
      partyShortcut: "CPIM",
      partyFlag:
        "https://res.cloudinary.com/dj9ttsbgm/image/upload/v1648101064/1024px-Cpim_party_symbol.svg_mu1gpp.png",
      voteCount: 0,
      aadharNumber: 463774295590,
      stateCode: 11,
      constituencyCode: 2,
    },
  ];

  if (network == "development") {
    deployer.deploy(Ballot, _candidatesData, 1648459991, 1869364963);
    // convert the time epoch of when voting ends & to UTC
    // START => Monday, 28 March 2022 15:03:11
    // END => Wednesday, 28 March 2029 09:32:43
  } else {
    // For all other networks like live & test networks
    deployer.deploy(Ballot, _candidatesData, 1648459991, 1869364963);
  }
};
