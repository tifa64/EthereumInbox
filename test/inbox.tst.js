const assert = require("assert");
const ganache = require("ganache-cli");
// Web3 is capital as we are requiring contructor and its convention
// To have the constructor as capaital first letter
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

beforeEach(() => {
  // Get a list of all accounts
  web3.eth.getAccounts().then((fetchedAccounts) => {
    console.log(fetchedAccounts);
  });
});

describe("Inbox", () => {
  it("deploys a contract", () => {});
});
