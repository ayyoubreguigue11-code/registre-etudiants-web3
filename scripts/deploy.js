const { ethers, network } = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  const Registre = await ethers.getContractFactory("RegistreEtudiants");
  const registre = await Registre.deploy();
  await registre.waitForDeployment();

  const address = await registre.getAddress();
  const deployment = {
    contract: "RegistreEtudiants",
    address,
    network: network.name,
    chainId: Number((await ethers.provider.getNetwork()).chainId),
    deployedAt: new Date().toISOString(),
    transactionHash: registre.deploymentTransaction().hash,
  };

  const outputDirectory = path.join(__dirname, "..", "deployments");
  fs.mkdirSync(outputDirectory, { recursive: true });
  fs.writeFileSync(
    path.join(outputDirectory, `${network.name}.json`),
    JSON.stringify(deployment, null, 2)
  );

  console.log("Deploiement termine :", deployment);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
