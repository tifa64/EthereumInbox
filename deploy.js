const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");
const provider = new HDWalletProvider(
  "ozone idle vocal stand shrug snake city bind silk match duck talk",
  "https://rinkeby.infura.io/v3/cb2b0c11909140a98ee9e4d96b72e88b"
);
const web3 = new Web3(provider);
const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("Attmepting to deploy from account", accounts[0]);
  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: "0x" + bytecode, arguments: ["Hi there!"] }) // add 0x bytecode
    .send({ gas: "10000000", from: accounts[0] }); // remove 'gas'
  console.log("Contracts deployed to", result.options.address);
};

deploy();
