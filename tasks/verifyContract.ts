import * as dotenv from "dotenv";
dotenv.config();
import { task, types } from "hardhat/config";
import type {} from "../typechain-types";
import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { takeSnapshot, mine, mineUpTo, time } from "@nomicfoundation/hardhat-network-helpers";
let latestBlock: any = time.latestBlock;

// 1 address in metamask
const contractAddr = "0xa229f10ab7fd13c309de0b1e6ec625f8b6b2646a";
// variables
let owner: SignerWithAddress, deployer: SignerWithAddress, minter: SignerWithAddress, signatory: SignerWithAddress;

task("verifyContract", "verify contract").setAction(async (taskArgs, { ethers, upgrades, run }) => {
    const _minGasToTransfer = 40000;
    const _layerZeroEndpoint = "0x3c2269811836af69497E5F486A85D7316753cf62";
    const _startMintId = 1;
    const _endMintId = 1000000;

    try {
        await run("verify:verify", {
            address: contractAddr,
            constructorArguments: [_minGasToTransfer, _layerZeroEndpoint, _startMintId, _endMintId]
        }).then(
            () => {
                // if (needToLog)
                console.log("Successfully verified.\n");
            },
            (error) => {
                const reason = new Error(JSON.stringify(error)).message;
                if (reason.includes("Already Verified")) console.log("The contract has already been verified.\n");
                else
                    console.log(
                        `Error. The verification is failed for a contract with the address ${contractAddr}.\n` +
                            `Reason: ${reason}\n`
                    );
            }
        );
    } catch (error) {
        console.log(
            `Error after verification of a contract with the address ${contractAddr}.\n` +
                `First 120 characters of the reason: ${new Error(JSON.stringify(error)).message.slice(0, 120)}.\n`
        );
    }
    console.log("Successfully upgrade staking");
});
// npx hardhat verifyContract --network nova

// npm run clean

// npx hardhat clear-abi && npx hardhat export-abi
// npx hardhat verify --address --network mumbai --constructor-args args
// npx shx rm -rf docs && npx hardhat docgen
