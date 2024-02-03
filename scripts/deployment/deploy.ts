// This is a script for deployment and automatically verification of all the contracts (`contracts/`).

import { deployWhaleTest } from "./separately/exported-functions/deployWhaleTest";

async function main() {
    // Deployment and verification of the `contracts/PositiveEvenSetter.sol`.
    await deployWhaleTest();
}

// This pattern is recommended to be able to use async/await everywhere and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

// npx hardhat run  scripts/deployment/deploy.ts --network mumbai

// npx hardhat run  scripts/deployment/deploy.ts --network meterTestnet

// `whaleTest` is deployed to 0x76A7B038300C2a4304e3C2e72f3808bfA3EF2DAa.