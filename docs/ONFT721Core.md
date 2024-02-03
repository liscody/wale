# Solidity API

## ONFT721Core

### FUNCTION_TYPE_SEND

```solidity
uint16 FUNCTION_TYPE_SEND
```

### StoredCredit

```solidity
struct StoredCredit {
  uint16 srcChainId;
  address toAddress;
  uint256 index;
  bool creditsRemain;
}
```

### minGasToTransferAndStore

```solidity
uint256 minGasToTransferAndStore
```

### dstChainIdToBatchLimit

```solidity
mapping(uint16 => uint256) dstChainIdToBatchLimit
```

### dstChainIdToTransferGas

```solidity
mapping(uint16 => uint256) dstChainIdToTransferGas
```

### storedCredits

```solidity
mapping(bytes32 => struct ONFT721Core.StoredCredit) storedCredits
```

### constructor

```solidity
constructor(uint256 _minGasToTransferAndStore, address _lzEndpoint) internal
```

### supportsInterface

```solidity
function supportsInterface(bytes4 interfaceId) public view virtual returns (bool)
```

### estimateSendFee

```solidity
function estimateSendFee(uint16 _dstChainId, bytes _toAddress, uint256 _tokenId, bool _useZro, bytes _adapterParams) public view virtual returns (uint256 nativeFee, uint256 zroFee)
```

_estimate send token `_tokenId` to (`_dstChainId`, `_toAddress`)
_dstChainId - L0 defined chain id to send tokens too
_toAddress - dynamic bytes array which contains the address to whom you are sending tokens to on the dstChain
_tokenId - token Id to transfer
_useZro - indicates to use zro to pay L0 fees
_adapterParams - flexible bytes array to indicate messaging adapter services in L0_

### estimateSendBatchFee

```solidity
function estimateSendBatchFee(uint16 _dstChainId, bytes _toAddress, uint256[] _tokenIds, bool _useZro, bytes _adapterParams) public view virtual returns (uint256 nativeFee, uint256 zroFee)
```

_estimate send token `_tokenId` to (`_dstChainId`, `_toAddress`)
_dstChainId - L0 defined chain id to send tokens too
_toAddress - dynamic bytes array which contains the address to whom you are sending tokens to on the dstChain
_tokenIds[] - token Ids to transfer
_useZro - indicates to use zro to pay L0 fees
_adapterParams - flexible bytes array to indicate messaging adapter services in L0_

### sendFrom

```solidity
function sendFrom(address _from, uint16 _dstChainId, bytes _toAddress, uint256 _tokenId, address payable _refundAddress, address _zroPaymentAddress, bytes _adapterParams) public payable virtual
```

_send token `_tokenId` to (`_dstChainId`, `_toAddress`) from `_from`
`_toAddress` can be any size depending on the `dstChainId`.
`_zroPaymentAddress` set to address(0x0) if not paying in ZRO (LayerZero Token)
`_adapterParams` is a flexible bytes array to indicate messaging adapter services_

### sendBatchFrom

```solidity
function sendBatchFrom(address _from, uint16 _dstChainId, bytes _toAddress, uint256[] _tokenIds, address payable _refundAddress, address _zroPaymentAddress, bytes _adapterParams) public payable virtual
```

_send tokens `_tokenIds[]` to (`_dstChainId`, `_toAddress`) from `_from`
`_toAddress` can be any size depending on the `dstChainId`.
`_zroPaymentAddress` set to address(0x0) if not paying in ZRO (LayerZero Token)
`_adapterParams` is a flexible bytes array to indicate messaging adapter services_

### _send

```solidity
function _send(address _from, uint16 _dstChainId, bytes _toAddress, uint256[] _tokenIds, address payable _refundAddress, address _zroPaymentAddress, bytes _adapterParams) internal virtual
```

### _nonblockingLzReceive

```solidity
function _nonblockingLzReceive(uint16 _srcChainId, bytes _srcAddress, uint64, bytes _payload) internal virtual
```

### clearCredits

```solidity
function clearCredits(bytes _payload) external virtual
```

### _creditTill

```solidity
function _creditTill(uint16 _srcChainId, address _toAddress, uint256 _startIndex, uint256[] _tokenIds) internal returns (uint256)
```

### setMinGasToTransferAndStore

```solidity
function setMinGasToTransferAndStore(uint256 _minGasToTransferAndStore) external
```

### setDstChainIdToTransferGas

```solidity
function setDstChainIdToTransferGas(uint16 _dstChainId, uint256 _dstChainIdToTransferGas) external
```

### setDstChainIdToBatchLimit

```solidity
function setDstChainIdToBatchLimit(uint16 _dstChainId, uint256 _dstChainIdToBatchLimit) external
```

### _debitFrom

```solidity
function _debitFrom(address _from, uint16 _dstChainId, bytes _toAddress, uint256 _tokenId) internal virtual
```

### _creditTo

```solidity
function _creditTo(uint16 _srcChainId, address _toAddress, uint256 _tokenId) internal virtual
```

### _toSingletonArray

```solidity
function _toSingletonArray(uint256 element) internal pure returns (uint256[])
```

