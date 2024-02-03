# Solidity API

## WhaleTest

### fee

```solidity
uint256 fee
```

### nextMintId

```solidity
uint256 nextMintId
```

### maxMintId

```solidity
uint256 maxMintId
```

### constructor

```solidity
constructor(uint256 _minGasToTransfer, address _layerZeroEndpoint, uint256 _startMintId, uint256 _endMintId) public
```

Constructor for the UniversalONFT

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _minGasToTransfer | uint256 |  |
| _layerZeroEndpoint | address | handles message transmission across chains |
| _startMintId | uint256 | the starting mint number on this chain |
| _endMintId | uint256 | the max number of mints on this chain |

### mint

```solidity
function mint() external payable
```

### estimateGasBridgeFee

```solidity
function estimateGasBridgeFee(uint16 _dstChainId, bool _useZro, bytes _adapterParams) public view virtual returns (uint256 nativeFee, uint256 zroFee)
```

### bridgeGas

```solidity
function bridgeGas(uint16 _dstChainId, address _zroPaymentAddress, bytes _adapterParams) public payable
```

### tokenURI

```solidity
function tokenURI(uint256 id) public view virtual returns (string)
```

### _baseURI

```solidity
function _baseURI() internal pure returns (string)
```

_Base URI for computing {tokenURI}. If set, the resulting URI for each
token will be the concatenation of the `baseURI` and the `tokenId`. Empty
by default, can be overridden in child contracts._

### withdraw

```solidity
function withdraw() public payable
```

### setFee

```solidity
function setFee(uint256 _fee) external
```

