import type { SnapshotRestorer } from "@nomicfoundation/hardhat-network-helpers";
import { takeSnapshot } from "@nomicfoundation/hardhat-network-helpers";

import { expect } from "chai";
import { ethers } from "hardhat";
import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

import type { WhaleTest } from "../typechain-types";

describe("WhaleTest", function () {
    let snapshotA: SnapshotRestorer;

    // Signers.
    let deployer: SignerWithAddress, owner: SignerWithAddress, user: SignerWithAddress;
    let minter1: SignerWithAddress, minter2: SignerWithAddress, minter3: SignerWithAddress;

    let whale: WhaleTest;

    // const fee = 0.00001 ether;
    const fee = ethers.utils.parseEther("0.00001");

    before(async () => {
        // Getting of signers.
        [deployer, user, minter1, minter2, minter3] = await ethers.getSigners();

        const _minGasToTransfer = 40000;
        const _layerZeroEndpoint = "0x3c2269811836af69497E5F486A85D7316753cf62";
        const _startMintId = 1;
        const _endMintId = 1000000;

        // Deployment of the factory.
        const WhaleTest = await ethers.getContractFactory("WhaleTest", deployer);
        whale = await WhaleTest.deploy(_minGasToTransfer, _layerZeroEndpoint, _startMintId, _endMintId);
        await whale.deployed();

        owner = deployer;

        snapshotA = await takeSnapshot();
    });

    afterEach(async () => await snapshotA.restore());

    describe("# Mint", function () {
        xit("Should show the correct balance after minting", async () => {
            for (let i = 0; i < 10; i++) {
                const tx = await whale.connect(minter1).mint({ value: fee });
                const receipt = await tx.wait();
                const tokenId = receipt.events?.[0].args?.[2];
                expect(tokenId).to.equal(i + 1);
            }

            for (let i = 0; i < 10; i++) {
                const tx = await whale.connect(minter2).mint({ value: fee });
                const receipt = await tx.wait();
            }

            for (let i = 0; i < 10; i++) {
                const tx = await whale.connect(minter3).mint({ value: fee });
                const receipt = await tx.wait();
            }
            //check balance each minter
            const balance1 = await whale.balanceOf(minter1.address);
            expect(balance1).to.equal(10);
            console.log(balance1);
            const balance2 = await whale.balanceOf(minter2.address);
            expect(balance2).to.equal(10);
            console.log(balance2);
            const balance3 = await whale.balanceOf(minter3.address);
            expect(balance3).to.equal(10);
            console.log(balance3);
        });

        it("Should show the correct balance after minting", async () => {
            for (let i = 0; i < 4; i++) {
                let tx = await whale.connect(minter1).mint({ value: fee });

                tx = await whale.connect(minter2).mint({ value: fee });

                tx = await whale.connect(minter3).mint({ value: fee });
            }

            const totalSupply = await whale.totalSupply();
            console.log("totalSupply: ", totalSupply.toString());
            console.log("");

            // balance of minter1
            let balance1 = await whale.balanceOf(minter1.address);

            // convert balance1 to number
            const balance = Number(balance1);
            // get all token id of minter1
            for (let i = 0; i < balance; i++) {
                const tokenId = await whale.tokenOfOwnerByIndex(minter1.address, i);
                console.log("minter1 minter 1 own: ", tokenId);
            }
            console.log("");

            // balance of minter1
            balance1 = await whale.balanceOf(minter1.address);
            console.log("balance of minter 1", balance1);
            console.log("");


            // getOwnedNFTs
            const ownedNFTs = await whale.getOwnedNFTs(minter1.address);
            console.log("Array with all NFT of minter 1 :", ownedNFTs);
            console.log("");

            // transfer NFT
            const tokenId = await whale.tokenOfOwnerByIndex(minter1.address, 0);
            console.log("token :", tokenId, "ready for transfer");
            // console owner before transfer
            const ownerBefore = await whale.ownerOf(tokenId);
            console.log("minter 1 with address ", ownerBefore, "is the owner of token ", tokenId.toString());
            console.log("");
            console.log("Call transferFrom function");
            console.log("");
            // get minter2 balance before transfer
            const balance2Before  = await whale.balanceOf(minter2.address);    
            console.log("");
            console.log("BEFORE balance of minter 2 before transfer", balance2Before);

            const tx = await whale.connect(minter1).transferFrom(minter1.address, minter2.address, tokenId);
            const receipt = await tx.wait();
            // console.log(receipt);
            const newOwner = await whale.ownerOf(tokenId);
            console.log("minter 2 with address ", newOwner, "is the new owner of token ", tokenId.toString());
            console.log("");

            // balance of minter1
            balance1 = await whale.balanceOf(minter1.address);
            console.log("balance of minter 1", balance1);
            console.log("");

            // getOwnedNFTs
            const ownedNFTs1 = await whale.getOwnedNFTs(minter1.address);
            console.log("all NFTs of minter 1 after transfer", ownedNFTs1);

            // get minter2 balance
            const balance2 = await whale.balanceOf(minter2.address);
            console.log("balance of minter 2", balance2);

            const owned1NFTs = await whale.getOwnedNFTs(minter2.address);
            console.log("Array with all NFT of minter 2 :", owned1NFTs);
            console.log("");
        });
    });
});
