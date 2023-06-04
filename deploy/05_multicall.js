exports.default = async function ({ deployments: { deploy }, getNamedAccounts}) {
  const { deployer } = await getNamedAccounts();
  await deploy("Multicall3", {
    from: deployer,
    args: [],
    log: true,
  });
}