// This is a script for deployment and automatically verification of the `contracts/PositiveEvenSetter.sol`.

import { deployWhaleTest } from "./exported-functions/deployWhaleTest";

async function main() {
    await deployWhaleTest();
}

// This pattern is recommended to be able to use async/await everywhere and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
