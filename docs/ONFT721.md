# Solidity API

## ONFT721

### constructor

```solidity
constructor(string _name, string _symbol, uint256 _minGasToTransfer, address _lzEndpoint) public
```

### supportsInterface

```solidity
function supportsInterface(bytes4 interfaceId) public view virtual returns (bool)
```

### _debitFrom

```solidity
function _debitFrom(address _from, uint16, bytes, uint256 _tokenId) internal virtual
```

### _creditTo

```solidity
function _creditTo(uint16, address _toAddress, uint256 _tokenId) internal virtual
```

