import { task } from "hardhat/config";
import { FueliPicliMinter__factory, Fueli__factory, Picli__factory } from "../typechain-types";

task("mints").addParam("from", "", "0").setAction(async (args, hre) => {
  const [owner] = await hre.ethers.getSigners()
  const minterDeploymnet = await hre.companionNetworks['hardhat'].deployments.get("FueliPicliMinter")
  console.log(minterDeploymnet.address)
  const minter = FueliPicliMinter__factory.connect(minterDeploymnet.address, owner)

  const logs = await minter.queryFilter(minter.filters.MintingRequest(), Number(args.from))

  console.log(logs)
});
