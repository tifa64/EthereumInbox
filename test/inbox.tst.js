const assert = require("assert");
const ganache = require("ganache-cli");
// Web3 is capital as we are requiring contructor and its convention
// To have the constructor as capaital first letter
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require("../compile");

let accounts;
let inbox;

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();
  // Accessing the ethereum module, specifically the Contract property
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      // Arguments of the Inbox contructor
      arguments: ["Hello Minion"],
    })
    // Trigger the contract itself
    .send({ from: accounts[0], gas: 1000000 });
});

describe("Inbox", () => {
  it("deploys a contract", () => {
    console.log(inbox);
  });
});
