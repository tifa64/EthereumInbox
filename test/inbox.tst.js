const assert = require("assert");
const ganache = require("ganache-cli");
// Web3 is capital as we are requiring contructor and its convention
// To have the constructor as capaital first letter
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require("../compile");

let accounts;
let inbox;
const INITIAL_STRING = "Hello Minion";

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();
  // Accessing the ethereum module, specifically the Contract property
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      // Arguments of the Inbox contructor
      arguments: [INITIAL_STRING],
    })
    // Trigger the contract itself
    .send({ from: accounts[0], gas: 1000000 });
});

describe("Inbox", () => {
  it("deploys a contract", () => {
    assert.ok(inbox.options.address);
  });
  it("has a default message", async () => {
    const message = await inbox.methods.message().call();
    assert.strictEqual(message, INITIAL_STRING);
  });
});
