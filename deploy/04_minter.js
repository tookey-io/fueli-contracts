module.exports = async function (hre) {
  // code here
  const {
    deployments: { deploy, get, execute, read },
    getNamedAccounts,
  } = hre;
  const { deployer } = await getNamedAccounts();
  const deployerSigner = await hre.ethers
    .getSigners()
    .then((all) => all.find((signer) => signer.address === deployer));
  if (!deployerSigner) {
    throw new Error(`Deployer ${deployer} not found`);
  }

  const fueli = await get("Fueli")
  const picli = await get("Picli")
  const minterDeployment = await deploy("FueliPicliMinter", {
    from: deployer,
    args: [fueli.address, picli.address, deployer],
    log: true,
  });

  console.log("grant minter of fueli to smart contract");
  await execute("Fueli", { from: deployer, log: true }, 'grantRole', await read("Fueli", 'MINTER_ROLE'), minterDeployment.address);
  console.log("grant minter of picli to smart contract");
  await execute("Picli", { from: deployer, log: true }, 'grantRole', await read("Fueli", 'MINTER_ROLE'), minterDeployment.address);
  
  
  console.log("test minting");
  await execute("FueliPicliMinter", { from: deployer, log: true, value: hre.ethers.utils.parseEther("100") }, 'mint', "with red band and laser gun", "THETAs follow @tookey_io!", false);
};