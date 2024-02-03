# Solidity API

## IONFT721Core

### SendToChain

```solidity
event SendToChain(uint16 _dstChainId, address _from, bytes _toAddress, uint256[] _tokenIds)
```

_Emitted when `_tokenIds[]` are moved from the `_sender` to (`_dstChainId`, `_toAddress`)
`_nonce` is the outbound nonce from_

### ReceiveFromChain

```solidity
event ReceiveFromChain(uint16 _srcChainId, bytes _srcAddress, address _toAddress, uint256[] _tokenIds)
```

### SetMinGasToTransferAndStore

```solidity
event SetMinGasToTransferAndStore(uint256 _minGasToTransferAndStore)
```

### SetDstChainIdToTransferGas

```solidity
event SetDstChainIdToTransferGas(uint16 _dstChainId, uint256 _dstChainIdToTransferGas)
```

### SetDstChainIdToBatchLimit

```solidity
event SetDstChainIdToBatchLimit(uint16 _dstChainId, uint256 _dstChainIdToBatchLimit)
```

### CreditStored

```solidity
event CreditStored(bytes32 _hashedPayload, bytes _payload)
```

_Emitted when `_payload` was received from lz, but not enough gas to deliver all tokenIds_

### CreditCleared

```solidity
event CreditCleared(bytes32 _hashedPayload)
```

_Emitted when `_hashedPayload` has been completely delivered_

### sendFrom

```solidity
function sendFrom(address _from, uint16 _dstChainId, bytes _toAddress, uint256 _tokenId, address payable _refundAddress, address _zroPaymentAddress, bytes _adapterParams) external payable
```

_send token `_tokenId` to (`_dstChainId`, `_toAddress`) from `_from`
`_toAddress` can be any size depending on the `dstChainId`.
`_zroPaymentAddress` set to address(0x0) if not paying in ZRO (LayerZero Token)
`_adapterParams` is a flexible bytes array to indicate messaging adapter services_

### sendBatchFrom

```solidity
function sendBatchFrom(address _from, uint16 _dstChainId, bytes _toAddress, uint256[] _tokenIds, address payable _refundAddress, address _zroPaymentAddress, bytes _adapterParams) external payable
```

_send tokens `_tokenIds[]` to (`_dstChainId`, `_toAddress`) from `_from`
`_toAddress` can be any size depending on the `dstChainId`.
`_zroPaymentAddress` set to address(0x0) if not paying in ZRO (LayerZero Token)
`_adapterParams` is a flexible bytes array to indicate messaging adapter services_

### estimateSendFee

```solidity
function estimateSendFee(uint16 _dstChainId, bytes _toAddress, uint256 _tokenId, bool _useZro, bytes _adapterParams) external view returns (uint256 nativeFee, uint256 zroFee)
```

_estimate send token `_tokenId` to (`_dstChainId`, `_toAddress`)
_dstChainId - L0 defined chain id to send tokens too
_toAddress - dynamic bytes array which contains the address to whom you are sending tokens to on the dstChain
_tokenId - token Id to transfer
_useZro - indicates to use zro to pay L0 fees
_adapterParams - flexible bytes array to indicate messaging adapter services in L0_

### estimateSendBatchFee

```solidity
function estimateSendBatchFee(uint16 _dstChainId, bytes _toAddress, uint256[] _tokenIds, bool _useZro, bytes _adapterParams) external view returns (uint256 nativeFee, uint256 zroFee)
```

_estimate send token `_tokenId` to (`_dstChainId`, `_toAddress`)
_dstChainId - L0 defined chain id to send tokens too
_toAddress - dynamic bytes array which contains the address to whom you are sending tokens to on the dstChain
_tokenIds[] - token Ids to transfer
_useZro - indicates to use zro to pay L0 fees
_adapterParams - flexible bytes array to indicate messaging adapter services in L0_

