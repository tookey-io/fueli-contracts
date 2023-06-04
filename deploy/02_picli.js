module.exports = async function (hre) {
  // code here
  const { deployments: { deploy }, getNamedAccounts} = hre
  const { deployer } = await getNamedAccounts();
  await deploy("Picli", {
    from: deployer,
    args: [],
    log: true,
  });
};
