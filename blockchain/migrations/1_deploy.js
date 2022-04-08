const Ballot = artifacts.require("Ballot");
const Types = artifacts.require("Types");

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
  if (network == "development") {
    deployer.deploy(Types);
    deployer.link(Types, Ballot);
    deployer.deploy(Ballot, 1649250142, 1662550200);
    // convert the time epoch of when voting ends & to UTC
    // START => Wednesday, 6 April 2022 18:32:22
    // END => Wednesday, 7 September 2022 17:00:00
  } else {
    // For all other networks like live & test networks
    deployer.deploy(Types);
    deployer.link(Types, Ballot);
    deployer.deploy(Ballot, 1649250142, 1662550200);
  }
};
