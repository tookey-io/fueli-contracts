module.exports = async function (hre) {
  // code here
  const { deployments: { deploy }, getNamedAccounts} = hre
  const { deployer } = await getNamedAccounts();
  console.log(deployer);
  await deploy("Fueli", {
    from: deployer,
    args: [],
    log: true,
  });
};