// This script contains the function for deployment and verification of the `contracts/PositiveEvenSetter.sol`.

import hre from "hardhat";
const ethers = hre.ethers;

import type { WhaleTest } from "../../../../typechain-types";

async function deployWhaleTest(): Promise<WhaleTest> {
    /*
     * Hardhat always runs the compile task when running scripts with its command line interface.
     *
     * If this script is run directly using `node`, then it should be called compile manually
     * to make sure everything is compiled.
     */
    // await hre.run("compile");

    const [deployer] = await ethers.getSigners();
    const _minGasToTransfer = 40000;
    const _layerZeroEndpoint = "0x3c2269811836af69497E5F486A85D7316753cf62";
    const _startMintId = 1;
    const _endMintId = 1000000;
    // Deployment.
    const WhaleTest = (await ethers.getContractFactory("WhaleTest")).connect(deployer);
    const whaleTest: WhaleTest = await WhaleTest.deploy(
        _minGasToTransfer,
        _layerZeroEndpoint,
        _startMintId,
        _endMintId
    );

    await whaleTest.deployed();

    console.log(`\`whaleTest\` is deployed to ${whaleTest.address}.`);

    // Verification of the deployed contract.
    if (hre.network.name !== "hardhat" && hre.network.name !== "localhost") {
        console.log("Sleeping before verification...");
        await new Promise((resolve) => setTimeout(resolve, 60000)); // 60 seconds.

        await hre.run("verify:verify", {
            address: whaleTest.address,
            constructorArguments: [_minGasToTransfer, _layerZeroEndpoint, _startMintId, _endMintId]
        });
    }

    return whaleTest;
}

export { deployWhaleTest };
