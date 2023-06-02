import { task } from "hardhat/config";
import { Fueli__factory, Picli__factory } from "../typechain-types";

task("deploy").setAction(async (args, hre) => {
  const [owner] = await hre.ethers.getSigners();

  console.log("Owner is " + owner.address);
  const fueli = await new Fueli__factory(owner).deploy();
  console.log(`Fueli: ${fueli.address}`);
  const picli = await new Picli__factory(owner).deploy();
  console.log(`Picli: ${picli.address}`);

  await picli.safeMint(
    owner.getAddress(),
    "data:application/json;base64,eyJuYW1lIjoiVGVzdGVyICMxIiwiZGVzY3JpcHRpb24iOiJUZXN0ZXIgVGVzdCIsImltYWdlIjoiZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCNGJXeHVjejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd01DOXpkbWNpSUhCeVpYTmxjblpsUVhOd1pXTjBVbUYwYVc4OUluaE5hVzVaVFdsdUlHMWxaWFFpSUhacFpYZENiM2c5SWpBZ01DQXpOVEFnTXpVd0lqNDhjM1I1YkdVK0xtSmhjMlVnZXlCbWFXeHNPaUJpYkdGamF6c2dabTl1ZEMxbVlXMXBiSGs2SUhObGNtbG1PeUJtYjI1MExYTnBlbVU2SURFMGNIZzdJSDA4TDNOMGVXeGxQanh5WldOMElIZHBaSFJvUFNJeE1EQWxJaUJvWldsbmFIUTlJakV3TUNVaUlHWnBiR3c5SW5kb2FYUmxJaUF2UGp4MFpYaDBJSGc5SWpVd0pTSWdlVDBpTkRBbElpQmpiR0Z6Y3owaVltRnpaU0lnWkc5dGFXNWhiblF0WW1GelpXeHBibVU5SW0xcFpHUnNaU0lnZEdWNGRDMWhibU5vYjNJOUltMXBaR1JzWlNJK1NHVnNiRzg4TDNSbGVIUStQSFJsZUhRZ2VEMGlOVEFsSWlCNVBTSTFNQ1VpSUdOc1lYTnpQU0ppWVhObElpQmtiMjFwYm1GdWRDMWlZWE5sYkdsdVpUMGliV2xrWkd4bElpQjBaWGgwTFdGdVkyaHZjajBpYldsa1pHeGxJajVYYjNKc1pEd3ZkR1Y0ZEQ0OEwzTjJaejQ9IiwiYW5pbWF0aW9uX3VybCI6ImRhdGE6dGV4dC9odG1sO2Jhc2U2NCxQQ0ZFVDBOVVdWQkZJR2gwYld3K1BHaDBiV3crUEdKdlpIaytQR2d4UGxSbGMzUmxjand2YURFK1BDOWliMlI1UGp3dmFIUnRiRDQ9In0="
  );

  console.log("data from ntf 1:");
  console.log(await picli.tokenURI(0));
});
