import { EIP, Project, Discussion, NewsItem, LiveData } from '../types/eip';

export const mockEIPs: EIP[] = [
  // Living EIPs
  {
    number: 1,
    title: "EIP Purpose and Guidelines",
    author: ["Martin Becze", "Hudson Jameson", "Alex Beregszaszi", "Casey Detrio", "Matt Garnett", "William Schwab"],
    status: "Living",
    type: "Meta",
    created: "2015-10-27",
    updated: "2023-05-06",
    description: "This EIP provides guidelines and a template for creating new EIPs. It describes the EIP process and how EIPs should be formatted.",
    content: `# EIP-1: EIP Purpose and Guidelines

## Abstract

An Ethereum Improvement Proposal (EIP) is a design document providing information to the Ethereum community, or describing a new feature for Ethereum or its processes or environment. The EIP should provide a concise technical specification of the feature and a rationale for the feature.

## Motivation

We intend EIPs to be the primary mechanisms for proposing new features, for collecting community technical input on an issue, and for documenting the design decisions that have gone into Ethereum.

## Specification

### EIP Types

There are three types of EIP:
- **Standards Track EIP**: Describes any change that affects most or all Ethereum implementations
- **Meta EIP**: Describes a process surrounding Ethereum or proposes a change to a process
- **Informational EIP**: Describes an Ethereum design issue, or provides general guidelines or information to the Ethereum community

### EIP Status Terms

- **Idea**: An idea that is pre-draft
- **Draft**: The first formally tracked stage of an EIP in development
- **Review**: An EIP Author marks an EIP as ready for and requesting Peer Review
- **Last Call**: This is the final review window for an EIP before moving to FINAL
- **Final**: This EIP represents the final standard
- **Stagnant**: Any EIP in Draft or Review if inactive for a period of 6 months or greater
- **Withdrawn**: The EIP Author(s) have withdrawn the proposed EIP
- **Living**: A special status for EIPs that are designed to be continually updated`,
    discussions: "https://ethereum-magicians.org/t/eip-1-eip-purpose-and-guidelines/83"
  },
  {
    number: 5069,
    title: "EIP Editor Handbook",
    author: ["Pooja Ranjan", "Gavin John", "Sam Wilson", "Alita Moore", "Pandapip1"],
    status: "Living",
    type: "Meta",
    created: "2022-05-02",
    updated: "2024-01-15",
    description: "This EIP describes the recommended process that EIP Editors should use for EIP management and EIP editing.",
    content: `# EIP-5069: EIP Editor Handbook

## Abstract

This EIP describes the recommended process that EIP Editors should use for EIP management and EIP editing.

## Motivation

The EIP editing process has evolved organically over time. This EIP aims to document the current best practices and provide guidance for new EIP editors.

## Specification

### Editor Responsibilities

EIP editors are responsible for:
- Managing the EIP repository
- Reviewing EIP submissions for formatting and content
- Assigning EIP numbers
- Updating EIP status
- Facilitating the EIP process

### Review Process

1. **Initial Review**: Check for proper formatting and basic requirements
2. **Technical Review**: Ensure technical accuracy and completeness
3. **Community Review**: Facilitate community discussion and feedback
4. **Final Review**: Prepare EIP for final status`,
    discussions: "https://ethereum-magicians.org/t/eip-5069-eip-editor-handbook/9514"
  },

  // Final EIPs
  {
    number: 2,
    title: "Homestead Hard-fork Changes",
    author: ["Vitalik Buterin"],
    status: "Final",
    type: "Standards Track",
    category: "Core",
    created: "2015-11-15",
    updated: "2016-02-02",
    description: "Changes included in the Homestead hard fork, including gas cost changes and difficulty adjustment algorithm.",
    content: `# EIP-2: Homestead Hard-fork Changes

## Abstract

This EIP specifies the changes included in the Homestead hard fork.

## Specification

1. **Gas cost for creating contracts via transaction**: Increase from 21000 to 53000
2. **Gas cost for CALL opcode**: Increase from 20 to 700
3. **Difficulty adjustment algorithm**: New algorithm to target 15-second block times
4. **Transaction signature validation**: Reject transactions with s > secp256k1n/2`,
    discussions: "https://github.com/ethereum/EIPs/issues/2"
  },
  {
    number: 20,
    title: "Token Standard",
    author: ["Fabian Vogelsteller", "Vitalik Buterin"],
    status: "Final",
    type: "Standards Track",
    category: "ERC",
    created: "2015-11-19",
    updated: "2015-11-19",
    description: "A standard interface for tokens.",
    content: `# EIP-20: Token Standard

## Abstract

The following standard allows for the implementation of a standard API for tokens within smart contracts...

## Motivation

A standard interface allows any tokens on Ethereum to be re-used by other applications: from wallets to decentralized exchanges.

## Specification

\`\`\`solidity
contract ERC20 {
    function totalSupply() public view returns (uint256);
    function balanceOf(address _owner) public view returns (uint256 balance);
    function transfer(address _to, uint256 _value) public returns (bool success);
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success);
    function approve(address _spender, uint256 _value) public returns (bool success);
    function allowance(address _owner, address _spender) public view returns (uint256 remaining);
}
\`\`\``,
    discussions: "https://github.com/ethereum/eips/issues/20"
  },
  {
    number: 55,
    title: "Mixed-case checksum address encoding",
    author: ["Vitalik Buterin", "Alex Van de Sande"],
    status: "Final",
    type: "Standards Track",
    category: "ERC",
    created: "2016-01-14",
    updated: "2016-01-14",
    description: "A standard for encoding Ethereum addresses with mixed-case checksums to detect typos.",
    content: `# EIP-55: Mixed-case checksum address encoding

## Abstract

This EIP describes a method for encoding Ethereum addresses using mixed-case letters as a checksum.

## Specification

1. Convert the address to lowercase
2. Compute the Keccak-256 hash of the lowercase address
3. For each character in the address, if the corresponding hex digit in the hash is >= 8, capitalize the character`,
    discussions: "https://github.com/ethereum/eips/issues/55"
  },
  {
    number: 165,
    title: "Standard Interface Detection",
    author: ["Christian Reitwießner", "Nick Johnson", "Fabian Vogelsteller", "Jordi Baylina", "Konrad Feldmeier", "William Entriken"],
    status: "Final",
    type: "Standards Track",
    category: "ERC",
    created: "2018-01-23",
    updated: "2018-01-23",
    description: "A standard method to publish and detect what interfaces a smart contract implements.",
    content: `# EIP-165: Standard Interface Detection

## Abstract

Herein, we standardize the following:
1. How interfaces are identified
2. How a contract will publish the interfaces it implements
3. How to detect if a contract implements ERC-165
4. How to detect if a contract implements any given interface

## Specification

\`\`\`solidity
interface ERC165 {
    function supportsInterface(bytes4 interfaceID) external view returns (bool);
}
\`\`\``,
    discussions: "https://github.com/ethereum/eips/issues/165"
  },
  {
    number: 721,
    title: "Non-Fungible Token Standard",
    author: ["William Entriken", "Dieter Shirley", "Jacob Evans", "Nastassia Sachs"],
    status: "Final",
    type: "Standards Track",
    category: "ERC",
    created: "2018-01-24",
    updated: "2018-07-17",
    description: "A standard interface for non-fungible tokens, also known as deeds.",
    content: `# EIP-721: Non-Fungible Token Standard

## Abstract

A standard interface for non-fungible tokens, also known as deeds.

## Motivation

A standard interface allows wallet/broker/auction applications to work with any NFT on Ethereum...

## Specification

\`\`\`solidity
interface ERC721 {
    function balanceOf(address _owner) external view returns (uint256);
    function ownerOf(uint256 _tokenId) external view returns (address);
    function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes data) external payable;
    function safeTransferFrom(address _from, address _to, uint256 _tokenId) external payable;
    function transferFrom(address _from, address _to, uint256 _tokenId) external payable;
    function approve(address _approved, uint256 _tokenId) external payable;
    function setApprovalForAll(address _operator, bool _approved) external;
    function getApproved(uint256 _tokenId) external view returns (address);
    function isApprovedForAll(address _owner, address _operator) external view returns (bool);
}
\`\`\``,
    discussions: "https://github.com/ethereum/eips/issues/721"
  },
  {
    number: 1155,
    title: "Multi Token Standard",
    author: ["Witek Radomski", "Andrew Cooke", "Philippe Castonguay", "James Therien", "Eric Binet", "Ronan Sandford"],
    status: "Final",
    type: "Standards Track",
    category: "ERC",
    created: "2018-06-17",
    updated: "2019-06-20",
    description: "A standard interface for contracts that manage multiple token types.",
    content: `# EIP-1155: Multi Token Standard

## Abstract

A standard interface for contracts that manage multiple token types. A single deployed contract may include any combination of fungible tokens, non-fungible tokens or other configurations (e.g. semi-fungible tokens).

## Motivation

Tokens standards like ERC-20 and ERC-721 require a separate contract to be deployed for each token type or collection...

## Specification

\`\`\`solidity
interface IERC1155 {
    function safeTransferFrom(address from, address to, uint256 id, uint256 amount, bytes calldata data) external;
    function safeBatchTransferFrom(address from, address to, uint256[] calldata ids, uint256[] calldata amounts, bytes calldata data) external;
    function balanceOf(address account, uint256 id) external view returns (uint256);
    function balanceOfBatch(address[] calldata accounts, uint256[] calldata ids) external view returns (uint256[] memory);
    function setApprovalForAll(address operator, bool approved) external;
    function isApprovedForAll(address account, address operator) external view returns (bool);
}
\`\`\``,
    discussions: "https://github.com/ethereum/eips/issues/1155"
  },
  {
    number: 1559,
    title: "Fee market change for ETH 1.0 chain",
    author: ["Vitalik Buterin", "Eric Conner", "Rick Dudley", "Matthew Slipper", "Ian Norden", "Abdelhamid Bakhta"],
    status: "Final",
    type: "Standards Track",
    category: "Core",
    created: "2019-04-13",
    updated: "2021-08-05",
    description: "A transaction pricing mechanism that includes fixed-per-block network fee that is burned and dynamically expands/contracts block sizes to deal with transient congestion.",
    content: `# EIP-1559: Fee market change for ETH 1.0 chain

## Abstract

This EIP introduces a new transaction pricing mechanism that includes a fixed-per-block network fee that is burned and dynamically expands/contracts block sizes to deal with transient congestion.

## Motivation

Ethereum currently prices transaction fees using a simple auction mechanism, where users send transactions with bids ("gasprices") and miners choose transactions with the highest bids...

## Specification

The base fee is calculated as follows:

\`\`\`
base_fee = parent_base_fee * (1 + (parent_gas_used - parent_gas_target) / parent_gas_target / BASE_FEE_MAX_CHANGE_DENOMINATOR)
\`\`\`

Where:
- \`BASE_FEE_MAX_CHANGE_DENOMINATOR = 8\`
- \`parent_gas_target = parent_gas_limit / 2\`

## Rationale

This mechanism aims to make transaction fees more predictable while still maintaining the incentive structure for miners.`,
    discussions: "https://ethereum-magicians.org/t/eip-1559-fee-market-change-for-eth-1-0-chain/2783"
  },
  {
    number: 2981,
    title: "NFT Royalty Standard",
    author: ["Zach Burks", "James Morgan", "Blaine Malone", "James Seibel"],
    status: "Final",
    type: "Standards Track",
    category: "ERC",
    created: "2020-09-15",
    updated: "2023-01-07",
    description: "A standardized way to retrieve royalty payment information for non-fungible tokens (NFTs).",
    content: `# EIP-2981: NFT Royalty Standard

## Abstract

This standard allows contracts, such as NFTs that support ERC-721 and ERC-1155 interfaces, to signal a royalty amount to be paid to the NFT creator or rights holder every time the NFT is sold or re-sold.

## Motivation

There are many marketplaces for NFTs with wide variability in how they identify and pay royalties to creators...

## Specification

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in RFC 2119.

\`\`\`solidity
interface IERC2981 {
    function royaltyInfo(uint256 _tokenId, uint256 _salePrice) external view returns (address, uint256);
}
\`\`\``,
    discussions: "https://github.com/ethereum/eips/issues/2981"
  },
  {
    number: 3675,
    title: "Upgrade consensus to Proof-of-Stake",
    author: ["Mikhail Kalinin", "Danny Ryan", "Vitalik Buterin"],
    status: "Final",
    type: "Standards Track",
    category: "Core",
    created: "2021-07-22",
    updated: "2022-09-15",
    description: "This EIP deprecates Proof-of-Work (PoW) and activates Proof-of-Stake (PoS) as part of the Merge.",
    content: `# EIP-3675: Upgrade consensus to Proof-of-Stake

## Abstract

This EIP deprecates Proof-of-Work (PoW) and activates Proof-of-Stake (PoS) as part of the Merge.

## Motivation

The Merge represents the most significant upgrade in the history of Ethereum. It deprecates proof-of-work, the Nakamoto consensus algorithm that has secured the network since genesis, and activates proof-of-stake in its place.

## Specification

### Transition Process

1. **Terminal Total Difficulty**: Set to 58750000000000000000000
2. **Merge Block**: First block with difficulty = 0
3. **Consensus Layer Integration**: Beacon chain becomes the consensus layer

### Changes

- Remove block mining rewards
- Remove difficulty adjustment algorithm
- Remove uncle block rewards
- Activate proof-of-stake consensus`,
    discussions: "https://ethereum-magicians.org/t/eip-3675-upgrade-consensus-to-proof-of-stake/6706"
  },
  {
    number: 4844,
    title: "Shard Blob Transactions",
    author: ["Vitalik Buterin", "Dankrad Feist", "Diederik Loerakker", "George Kadianakis", "Matt Garnett", "Mofi Taiwo", "Ansgar Dietrichs"],
    status: "Final",
    type: "Standards Track",
    category: "Core",
    created: "2022-02-25",
    updated: "2024-03-13",
    description: "Shard Blob Transactions scale data-availability of Ethereum in a simple, forward-compatible manner.",
    content: `# EIP-4844: Shard Blob Transactions

## Abstract

Introduce a new transaction type for "blob-carrying transactions" which contain a large amount of data that cannot be accessed by EVM execution, but whose commitment can be accessed.

## Motivation

Rollups are in the short and medium term, and possibly the long term, the only trustless scaling solution for Ethereum. Transaction fees on rollups are primarily determined by the cost of data posted on chain.

## Specification

### Blob Transaction Type

A new transaction type with the following fields:
- \`chain_id\`: Chain ID
- \`nonce\`: Account nonce  
- \`max_priority_fee_per_gas\`: Maximum priority fee per gas
- \`max_fee_per_gas\`: Maximum total fee per gas
- \`gas_limit\`: Gas limit
- \`to\`: Destination address
- \`value\`: ETH value
- \`data\`: Transaction data
- \`access_list\`: EIP-2930 access list
- \`max_fee_per_blob_gas\`: Maximum fee per blob gas
- \`blob_versioned_hashes\`: List of blob versioned hashes

### Blob Gas Market

Similar to EIP-1559, but for blob gas:
- Target: 3 blobs per block
- Maximum: 6 blobs per block
- Price adjustment based on usage`,
    discussions: "https://ethereum-magicians.org/t/eip-4844-shard-blob-transactions/8430"
  },
  {
    number: 2537,
    title: "Precompile for BLS12-381 curve operations",
    author: ["Alex Vlasov", "Antonio Salazar Cardozo"],
    status: "Final",
    type: "Standards Track", 
    category: "Core",
    created: "2020-02-21",
    updated: "2023-03-15",
    description: "Add precompiled contracts for BLS12-381 curve operations to enable efficient BLS signature verification and other cryptographic operations.",
    content: `# EIP-2537: Precompile for BLS12-381 curve operations

## Abstract

This EIP adds precompiled contracts for BLS12-381 curve operations, enabling efficient BLS signature verification, aggregation, and other advanced cryptographic operations on Ethereum.

## Motivation

BLS12-381 is a pairing-friendly elliptic curve that enables:
- BLS signature aggregation (used in Ethereum 2.0)
- Zero-knowledge proof systems
- Advanced cryptographic protocols
- Efficient multi-signature schemes

## Specification

### Precompiled Contracts

Four new precompiled contracts are added:

1. **BLS12_G1ADD** (0x0b): G1 point addition
2. **BLS12_G1MUL** (0x0c): G1 scalar multiplication  
3. **BLS12_G2ADD** (0x0d): G2 point addition
4. **BLS12_G2MUL** (0x0e): G2 scalar multiplication
5. **BLS12_PAIRING** (0x0f): Pairing operation

### Gas Costs

- G1 addition: 500 gas
- G1 multiplication: 12,000 gas
- G2 addition: 800 gas
- G2 multiplication: 45,000 gas
- Pairing: 43,000 + 65,000 * k gas (k = number of pairs)

## Rationale

These precompiles enable efficient implementation of BLS signatures and other advanced cryptographic protocols that are essential for Ethereum's roadmap and Layer 2 scaling solutions.`,
    discussions: "https://ethereum-magicians.org/t/eip-2537-bls12-381-curve-operations/4187"
  },

  // Last Call EIPs
  {
    number: 3155,
    title: "EVM Trace Specification",
    author: ["Martin Holst Swende", "Marius van der Wijden"],
    status: "Last Call",
    type: "Standards Track",
    category: "Interface",
    created: "2020-12-07",
    updated: "2024-11-15",
    description: "A standard for EVM execution traces to improve debugging and analysis tools.",
    content: `# EIP-3155: EVM Trace Specification

## Abstract

This EIP specifies a standard format for EVM execution traces to improve interoperability between debugging and analysis tools.

## Motivation

Different Ethereum clients and tools produce execution traces in various formats, making it difficult to create universal debugging and analysis tools.

## Specification

### Trace Format

Each trace entry contains:
- \`pc\`: Program counter
- \`op\`: Opcode name
- \`gas\`: Remaining gas
- \`gasCost\`: Gas cost of operation
- \`memory\`: Memory contents
- \`stack\`: Stack contents
- \`storage\`: Storage changes
- \`depth\`: Call depth`,
    discussions: "https://ethereum-magicians.org/t/eip-3155-evm-trace-specification/5007"
  },
  {
    number: 2935,
    title: "Serve historical block hashes from state",
    author: ["Vitalik Buterin", "Tomasz Stanczak", "Guillaume Ballet", "Gajinder Singh", "Tanishq Jasoria", "Ignacio Hagopian", "Joshua Rudolf"],
    status: "Last Call",
    type: "Standards Track",
    category: "Core",
    created: "2020-09-03",
    updated: "2024-12-01",
    description: "Store historical block hashes in state to enable stateless execution and history expiry.",
    content: `# EIP-2935: Serve historical block hashes from state

## Abstract

Store historical block hashes in the state trie to enable stateless execution and prepare for history expiry.

## Motivation

Currently, the BLOCKHASH opcode can access the last 256 block hashes. This EIP moves these hashes into the state trie, enabling:
- Stateless execution of the BLOCKHASH opcode
- Preparation for history expiry
- Simplified client implementations

## Specification

### State Storage

Block hashes are stored at:
- Address: \`0x0aae40965e6800cd9b1f4b05ff21581047e3f91e\`
- Storage key: \`block_number % HISTORY_STORAGE_ADDRESS\`
- Value: \`block_hash\`

### BLOCKHASH Opcode

Modified to read from state instead of maintaining separate storage.`,
    discussions: "https://ethereum-magicians.org/t/eip-2935-save-historical-block-hashes-in-state/4565"
  },

  // Draft EIPs (including Pectra upgrade)
  {
    number: 4337,
    title: "Account Abstraction Using Alt Mempool",
    author: ["Vitalik Buterin", "Yoav Weiss", "Kristof Gazso", "Namra Patel", "Dror Tirosh", "Shahaf Nacson", "Tjaden Hess"],
    status: "Final",
    type: "Standards Track",
    category: "ERC",
    created: "2021-09-29",
    updated: "2023-06-29",
    description: "An account abstraction proposal which completely avoids the need for consensus-layer protocol changes.",
    content: `# EIP-4337: Account Abstraction Using Alt Mempool

## Abstract

An account abstraction proposal which completely avoids the need for consensus-layer protocol changes. Instead of adding new protocol features and changing the existing validation logic, this proposal introduces a higher-layer pseudo-transaction object called a UserOperation...

## Motivation

Account abstraction allows users to use smart contract wallets containing arbitrary verification logic instead of EOAs as their primary account.

## Specification

### Definitions

- **UserOperation** - a structure that describes a transaction to be sent on behalf of a user
- **Bundler** - a node that can handle UserOperations
- **EntryPoint** - a singleton contract that executes bundles of UserOperations`,
    discussions: "https://ethereum-magicians.org/t/erc-4337-account-abstraction-via-entry-point-contract-specification/7160"
  },
  {
    number: 7702,
    title: "Set EOA account code for one transaction",
    author: ["Vitalik Buterin", "Sam Wilson", "Ansgar Dietrichs", "Matt Garnett"],
    status: "Draft",
    type: "Standards Track",
    category: "Core",
    created: "2024-05-07",
    updated: "2024-12-15",
    description: "Allow EOAs to temporarily set code for one transaction, enabling account abstraction features while maintaining backward compatibility.",
    content: `# EIP-7702: Set EOA account code for one transaction

## Abstract

This EIP introduces a new transaction type that allows externally owned accounts (EOAs) to temporarily set code for the duration of one transaction. This enables account abstraction features like sponsored transactions, batched operations, and custom validation logic while maintaining full backward compatibility.

## Motivation

Account abstraction has been a long-sought goal for Ethereum, but previous approaches required significant protocol changes or new account types. EIP-7702 provides a minimal, backward-compatible path to account abstraction by allowing EOAs to temporarily "become" smart contracts for single transactions.

## Specification

### New Transaction Type

A new transaction type \`0x04\` is introduced with the following fields:
- \`chain_id\`: Chain identifier
- \`nonce\`: Account nonce
- \`max_priority_fee_per_gas\`: Maximum priority fee
- \`max_fee_per_gas\`: Maximum total fee
- \`gas_limit\`: Gas limit
- \`to\`: Destination address
- \`value\`: ETH value
- \`data\`: Transaction data
- \`authorization_list\`: List of authorization tuples

### Authorization Tuple

Each authorization tuple contains:
- \`chain_id\`: Target chain ID
- \`address\`: Address to authorize
- \`nonce\`: Authorization nonce
- \`y_parity\`, \`r\`, \`s\`: ECDSA signature components

## Rationale

This approach provides immediate account abstraction benefits while maintaining the existing EOA infrastructure. It enables:
- Sponsored transactions (gasless transactions)
- Batched operations
- Custom validation logic
- Gradual migration to full account abstraction`,
    discussions: "https://ethereum-magicians.org/t/eip-7702-set-eoa-account-code-for-one-transaction/19033"
  },
  {
    number: 7251,
    title: "Execution Layer Exit",
    author: ["Danny Ryan", "Hsiao-Wei Wang"],
    status: "Draft", 
    type: "Standards Track",
    category: "Core",
    created: "2023-06-28",
    updated: "2024-11-20",
    description: "Enable voluntary exits of validators to be triggered from the execution layer, providing more flexible validator management.",
    content: `# EIP-7251: Execution Layer Exit

## Abstract

This EIP introduces a mechanism for validators to trigger voluntary exits from the execution layer rather than requiring consensus layer operations. This provides more flexibility for staking protocols and validator management systems.

## Motivation

Currently, validator exits must be initiated from the consensus layer using signed voluntary exit messages. This creates operational complexity for staking protocols and limits the ability to automate validator lifecycle management from smart contracts.

## Specification

### New Precompile

A new precompile at address \`0x0C\` is introduced to handle execution layer exits:

\`\`\`
function requestExit(
    bytes calldata pubkey,
    uint64 validatorIndex,
    bytes calldata signature
) external
\`\`\`

### Exit Request Processing

Exit requests are processed during block execution and included in the beacon chain state transition. The execution layer maintains a queue of pending exit requests that are processed by the consensus layer.

## Rationale

This design enables:
- Smart contract-based validator management
- Automated exit strategies for staking protocols  
- Simplified operational procedures for large validator sets
- Better integration between execution and consensus layers`,
    discussions: "https://ethereum-magicians.org/t/eip-7251-execution-layer-exit/14894"
  },
  {
    number: 6900,
    title: "Modular Smart Contract Accounts and Plugins",
    author: ["Adam Egyed", "Fangting Liu", "Jay Paik", "Yoav Weiss"],
    status: "Draft",
    type: "Standards Track",
    category: "ERC",
    created: "2023-04-18",
    updated: "2024-08-15",
    description: "Standardize smart contract accounts with a modular plugin architecture for enhanced functionality and interoperability.",
    content: `# EIP-6900: Modular Smart Contract Accounts and Plugins

## Abstract

This proposal standardizes smart contract accounts with a modular plugin architecture, enabling enhanced functionality while maintaining interoperability across different account implementations.

## Motivation

Current smart contract wallets lack standardization, making it difficult to:
- Share plugins across different wallet implementations
- Ensure security and compatibility
- Enable ecosystem-wide innovation

## Specification

### Account Interface

\`\`\`solidity
interface IModularAccount {
    function installPlugin(address plugin, bytes calldata initData) external;
    function uninstallPlugin(address plugin, bytes calldata deinitData) external;
    function executeFromPlugin(bytes calldata data) external payable returns (bytes memory);
}
\`\`\`

### Plugin Types

1. **Validation Plugins**: Custom signature validation logic
2. **Execution Plugins**: Additional account functionality
3. **Hook Plugins**: Pre/post execution hooks

## Security Considerations

- Plugin isolation and permission management
- Upgrade mechanisms and governance
- Compatibility verification`,
    discussions: "https://ethereum-magicians.org/t/eip-6900-modular-smart-contract-accounts-and-plugins/13885"
  },
  {
    number: 998,
    title: "Composable Non-Fungible Token Standard",
    author: ["Matt Lockyer", "Nick Mudge", "Jordan Schalm"],
    status: "Draft",
    type: "Standards Track",
    category: "ERC",
    created: "2018-07-07",
    updated: "2023-03-15",
    description: "An extension to ERC-721 that enables NFTs to own other NFTs and ERC-20 tokens, creating composable digital assets.",
    content: `# EIP-998: Composable Non-Fungible Token Standard

## Abstract

This standard extends ERC-721 to enable NFTs to own other NFTs and ERC-20 tokens, creating composable digital assets.

## Motivation

Current NFT standards don't support ownership relationships between tokens. This limits the creation of complex digital assets that could represent:
- Characters with equipment in games
- Portfolios containing multiple assets
- Hierarchical organizational structures

## Specification

### Top-Down Composable

\`\`\`solidity
interface IERC998ERC721TopDown {
    function rootOwnerOf(uint256 _tokenId) external view returns (bytes32 rootOwner);
    function ownerOfChild(address _childContract, uint256 _childTokenId) external view returns (bytes32 parentTokenOwner, uint256 parentTokenId);
    function onERC721Received(address _operator, address _from, uint256 _childTokenId, bytes _data) external returns(bytes4);
    function transferChild(uint256 _fromTokenId, address _to, address _childContract, uint256 _childTokenId) external;
    function safeTransferChild(uint256 _fromTokenId, address _to, address _childContract, uint256 _childTokenId) external;
    function safeTransferChild(uint256 _fromTokenId, address _to, address _childContract, uint256 _childTokenId, bytes _data) external;
    function transferChildToParent(uint256 _fromTokenId, address _toContract, uint256 _toTokenId, address _childContract, uint256 _childTokenId, bytes _data) external;
    function getChild(address _from, uint256 _tokenId, address _childContract, uint256 _childTokenId) external;
}
\`\`\`

### Bottom-Up Composable

Enables child tokens to be attached to parent tokens from the child's perspective.`,
    discussions: "https://github.com/ethereum/eips/issues/998"
  },
  {
    number: 1202,
    title: "Voting Interface",
    author: ["Zainan Victor Zhou", "Evan", "Yin Xu"],
    status: "Draft",
    type: "Standards Track",
    category: "ERC",
    created: "2018-07-08",
    updated: "2023-09-12",
    description: "A standard interface for voting systems on Ethereum, enabling interoperable governance mechanisms.",
    content: `# EIP-1202: Voting Interface

## Abstract

This EIP specifies a standard interface for voting systems, enabling interoperable governance mechanisms across different platforms and applications.

## Motivation

Voting is a fundamental component of governance systems. A standard interface would enable:
- Interoperability between different voting platforms
- Standardized tooling for vote analysis
- Composable governance systems

## Specification

### Core Interface

\`\`\`solidity
interface IERC1202 {
    function vote(uint256 issueId, uint256 option) external returns (bool success);
    function setStatus(uint256 issueId, bool isOpen) external returns (bool success);
    function issueDescription(uint256 issueId) external view returns (string description);
    function availableOptions(uint256 issueId) external view returns (uint256[] options);
    function optionDescription(uint256 issueId, uint256 option) external view returns (string description);
    function ballotOf(uint256 issueId, address addr) external view returns (uint256 option);
    function weightOf(uint256 issueId, address addr) external view returns (uint256 weight);
    function getStatus(uint256 issueId) external view returns (bool isOpen);
    function weightedVoteCountsOf(uint256 issueId, uint256 option) external view returns (uint256 count);
    function winningOption(uint256 issueId) external view returns (uint256 option);
}
\`\`\`

### Events

\`\`\`solidity
event Vote(uint256 indexed issueId, address indexed voter, uint256 option, uint256 weight);
event IssueCreated(uint256 indexed issueId, string description);
event StatusChange(uint256 indexed issueId, bool isOpen);
\`\`\``,
    discussions: "https://github.com/ethereum/eips/issues/1202"
  },

  // Stagnant EIPs
  {
    number: 86,
    title: "Abstraction of transaction origin and signature",
    author: ["Vitalik Buterin"],
    status: "Stagnant",
    type: "Standards Track",
    category: "Core",
    created: "2017-02-10",
    updated: "2017-02-10",
    description: "An early account abstraction proposal that would allow contracts to pay for gas and customize transaction validation.",
    content: `# EIP-86: Abstraction of transaction origin and signature

## Abstract

This EIP proposes changes that would allow contracts to pay for gas and customize transaction validation logic.

## Motivation

Currently, all transactions must be signed by an externally owned account and pay gas fees. This limits flexibility in account management and user experience.

## Specification

1. Allow contracts to pay for gas via a new opcode
2. Enable custom signature validation in contracts
3. Modify transaction format to support contract-originated transactions

Note: This EIP has been superseded by more recent account abstraction proposals like EIP-4337 and EIP-7702.`,
    discussions: "https://github.com/ethereum/eips/issues/86"
  },
  {
    number: 615,
    title: "Subroutines and Static Jumps for the EVM",
    author: ["Greg Colvin", "Brooklyn Zelenka", "Paweł Bylica", "Christian Reitwiessner"],
    status: "Stagnant",
    type: "Standards Track",
    category: "Core",
    created: "2017-04-25",
    updated: "2019-07-18",
    description: "Introduce subroutines and static jumps to the EVM for better code organization and gas efficiency.",
    content: `# EIP-615: Subroutines and Static Jumps for the EVM

## Abstract

This EIP introduces subroutines and static jumps to the EVM, enabling better code organization and potential gas savings.

## Motivation

Current EVM jump instructions are dynamic and expensive to validate. Static jumps and subroutines would:
- Improve code readability and organization
- Enable better compiler optimizations
- Reduce gas costs for certain operations

## Specification

### New Opcodes

- \`JUMPSUB\`: Jump to subroutine
- \`RETURNSUB\`: Return from subroutine
- \`JUMPSUBV\`: Jump to subroutine with validation

### Static Analysis

All jump destinations must be statically determinable at deploy time.

Note: This proposal has been inactive and may be superseded by other EVM improvements.`,
    discussions: "https://ethereum-magicians.org/t/eip-615-subroutines-for-the-evm/2728"
  },

  // Withdrawn EIPs
  {
    number: 999,
    title: "Restore Contract Code at 0x863DF6BFa4469f3ead0bE8f9F2AAE51c91A907b4",
    author: ["Afri Schoedon"],
    status: "Withdrawn",
    type: "Standards Track",
    category: "Core",
    created: "2018-04-04",
    updated: "2018-04-04",
    description: "A controversial proposal to restore the Parity wallet contract code that was accidentally destroyed.",
    content: `# EIP-999: Restore Contract Code at 0x863DF6BFa4469f3ead0bE8f9F2AAE51c91A907b4

## Abstract

This EIP proposes to restore the contract code at address 0x863DF6BFa4469f3ead0bE8f9F2AAE51c91A907b4 to recover funds locked in Parity multi-signature wallets.

## Motivation

On November 6, 2017, a user accidentally triggered a bug in the Parity wallet library contract, causing it to be destroyed and locking approximately 513,774.16 Ether in 587 wallets.

## Specification

Restore the contract code at the specified address to its state before the incident.

## Status

This EIP was withdrawn due to lack of consensus and concerns about:
- Immutability of the blockchain
- Precedent for future interventions
- Technical complexity of implementation

The proposal highlighted important debates about blockchain governance and immutability.`,
    discussions: "https://github.com/ethereum/eips/issues/999"
  }
];

export const mockProjects: Project[] = [
  // EIP-1559 Implementations
  {
    id: "1",
    name: "MetaMask",
    description: "Leading Web3 wallet with full EIP-1559 support for improved fee estimation and user experience, plus early EIP-4337 account abstraction features.",
    website: "https://metamask.io",
    github: "https://github.com/MetaMask",
    eipNumbers: [1559, 4337, 7702],
    implementationDetails: "Full EIP-1559 integration with advanced fee estimation, priority fee suggestions, gas optimization features, and experimental account abstraction support.",
    status: "Active",
    logo: "https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
  },
  {
    id: "2",
    name: "Ethereum Foundation",
    description: "Core Ethereum client implementations supporting EIP-1559, EIP-4844 (Proto-Danksharding), and upcoming Pectra upgrade features across all major execution clients.",
    website: "https://ethereum.org",
    github: "https://github.com/ethereum",
    eipNumbers: [1559, 4844, 7702, 7251, 2537],
    implementationDetails: "Native protocol-level implementation in Geth, Nethermind, Besu, and Erigon clients with full support for fee markets, blob transactions, and BLS12-381 operations.",
    status: "Active"
  },

  // EIP-721 (NFT) Implementations
  {
    id: "3",
    name: "OpenSea",
    description: "World's largest NFT marketplace supporting ERC-721, ERC-1155, and EIP-2981 royalty standards with advanced trading features.",
    website: "https://opensea.io",
    github: "https://github.com/ProjectOpenSea",
    logo: "https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    eipNumbers: [721, 1155, 2981],
    implementationDetails: "Comprehensive NFT marketplace with full ERC-721/1155 support, royalty enforcement, batch operations, and advanced trading features including offers and auctions.",
    status: "Active"
  },
  {
    id: "4",
    name: "Bored Ape Yacht Club",
    description: "Iconic NFT collection implementing ERC-721 standard with utility features and community governance.",
    website: "https://boredapeyachtclub.com",
    eipNumbers: [721],
    implementationDetails: "Premium ERC-721 implementation with metadata standards, provenance tracking, utility integration, and community features.",
    status: "Active"
  },
  {
    id: "5",
    name: "Art Blocks",
    description: "Generative art platform using ERC-721 for programmable and dynamic NFT creation with on-chain art generation.",
    website: "https://artblocks.io",
    eipNumbers: [721],
    implementationDetails: "Advanced ERC-721 implementation with on-chain generative art, dynamic metadata, artist royalties, and programmable art creation.",
    status: "Active"
  },
  {
    id: "6",
    name: "Enjin",
    description: "Gaming platform implementing ERC-1155 multi-token standard and ERC-998 composable NFTs for gaming assets.",
    website: "https://enjin.io",
    github: "https://github.com/enjin",
    eipNumbers: [1155, 998],
    implementationDetails: "Gaming-focused implementation with ERC-1155 for efficient batch operations, composable NFTs for complex game items, and cross-game asset interoperability.",
    status: "Active"
  },

  // EIP-20 (Token) Implementations
  {
    id: "7",
    name: "Uniswap",
    description: "Leading DEX protocol built on ERC-20 token standard with automated market making and concentrated liquidity.",
    website: "https://uniswap.org",
    github: "https://github.com/Uniswap",
    logo: "https://images.pexels.com/photos/7567526/pexels-photo-7567526.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    eipNumbers: [20],
    implementationDetails: "Core DEX infrastructure supporting all ERC-20 tokens with concentrated liquidity, advanced AMM mechanics, and multi-chain deployment.",
    status: "Active"
  },
  {
    id: "8",
    name: "Chainlink",
    description: "Decentralized oracle network with LINK token implementing ERC-20 standard for oracle service payments.",
    website: "https://chain.link",
    github: "https://github.com/smartcontractkit",
    eipNumbers: [20],
    implementationDetails: "LINK token serves as payment for oracle services with standard ERC-20 functionality and additional oracle-specific features.",
    status: "Active"
  },
  {
    id: "9",
    name: "Aave",
    description: "DeFi lending protocol supporting hundreds of ERC-20 tokens as collateral and borrowing assets with yield farming.",
    website: "https://aave.com",
    github: "https://github.com/aave",
    eipNumbers: [20],
    implementationDetails: "Comprehensive ERC-20 integration for lending, borrowing, and yield farming with aToken wrappers and advanced DeFi features.",
    status: "Active"
  },
  {
    id: "10",
    name: "Compound",
    description: "Autonomous interest rate protocol with governance tokens implementing ERC-20 and ERC-1202 voting standards.",
    website: "https://compound.finance",
    github: "https://github.com/compound-finance",
    eipNumbers: [20, 1202],
    implementationDetails: "DeFi lending with COMP governance token, implementing ERC-20 for token functionality and ERC-1202 for decentralized governance voting.",
    status: "Active"
  },

  // EIP-4337 (Account Abstraction) Implementations
  {
    id: "11",
    name: "Argent",
    description: "Smart contract wallet implementing EIP-4337 for gasless transactions, social recovery, and enhanced security.",
    website: "https://argent.xyz",
    github: "https://github.com/argentlabs",
    logo: "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    eipNumbers: [4337, 6900],
    implementationDetails: "Native EIP-4337 implementation with social recovery, gasless transactions, DeFi integrations, and modular plugin architecture.",
    status: "Active"
  },
  {
    id: "12",
    name: "Biconomy",
    description: "Infrastructure platform providing EIP-4337 account abstraction solutions and gasless transaction infrastructure for dApps.",
    website: "https://biconomy.io",
    github: "https://github.com/bcnmy",
    eipNumbers: [4337],
    implementationDetails: "Comprehensive AA infrastructure with bundler services, paymaster solutions, SDK for developers, and gasless transaction relaying.",
    status: "Active"
  },
  {
    id: "13",
    name: "Safe",
    description: "Multi-signature wallet evolving to support EIP-4337 account abstraction features and modular account architecture.",
    website: "https://safe.global",
    github: "https://github.com/safe-global",
    eipNumbers: [4337, 6900],
    implementationDetails: "Integrating EIP-4337 support into existing multi-sig infrastructure for enhanced UX, automation, and modular plugin system.",
    status: "Beta"
  },

  // EIP-2981 (Royalty) Implementations
  {
    id: "14",
    name: "Foundation",
    description: "Creator-focused NFT platform with native EIP-2981 royalty support and artist-centric features.",
    website: "https://foundation.app",
    eipNumbers: [721, 2981],
    implementationDetails: "Built-in royalty enforcement using EIP-2981 standard ensuring creators receive ongoing compensation from secondary sales.",
    status: "Active"
  },
  {
    id: "15",
    name: "SuperRare",
    description: "Digital art marketplace implementing EIP-2981 for automatic artist royalty distribution and creator support.",
    website: "https://superrare.com",
    eipNumbers: [721, 2981],
    implementationDetails: "Automatic royalty calculation and distribution using EIP-2981 standard for all secondary sales with creator verification.",
    status: "Active"
  },
  {
    id: "16",
    name: "Manifold",
    description: "Creator tools platform enabling artists to deploy EIP-2981 compliant NFT contracts with custom royalty settings.",
    website: "https://manifold.xyz",
    github: "https://github.com/manifoldxyz",
    eipNumbers: [721, 2981],
    implementationDetails: "Creator studio with built-in EIP-2981 royalty configuration, cross-marketplace compatibility, and advanced creator tools.",
    status: "Active"
  },

  // EIP-4844 (Proto-Danksharding) Implementations
  {
    id: "17",
    name: "Arbitrum",
    description: "Layer 2 scaling solution implementing EIP-4844 blob transactions for reduced data availability costs.",
    website: "https://arbitrum.io",
    github: "https://github.com/OffchainLabs",
    eipNumbers: [4844],
    implementationDetails: "Optimistic rollup leveraging EIP-4844 blob transactions to significantly reduce L2 transaction costs and improve scalability.",
    status: "Active"
  },
  {
    id: "18",
    name: "Optimism",
    description: "Ethereum Layer 2 solution using EIP-4844 for cheaper data availability and improved rollup efficiency.",
    website: "https://optimism.io",
    github: "https://github.com/ethereum-optimism",
    eipNumbers: [4844],
    implementationDetails: "Optimistic rollup implementation with EIP-4844 blob support for reduced costs and enhanced throughput.",
    status: "Active"
  },

  // EIP-7702 (Pectra Upgrade) Early Implementations
  {
    id: "19",
    name: "Pectra Testnet Validators",
    description: "Validator operators testing EIP-7702 EOA account abstraction and EIP-7251 execution layer exits on Pectra testnet.",
    website: "https://ethereum.org/en/roadmap/pectra",
    eipNumbers: [7702, 7251],
    implementationDetails: "Early implementation and testing of Pectra upgrade features including EOA account abstraction and execution layer validator exits.",
    status: "Beta"
  }
];

export const mockDiscussions: Discussion[] = [
  {
    id: "1",
    eipNumber: 1559,
    author: "EthDev42",
    content: "The implementation of EIP-1559 has significantly improved fee predictability. Has anyone analyzed the impact on miner revenue and the deflationary effects?",
    timestamp: "2024-01-15T10:30:00Z",
    replies: [
      {
        id: "2",
        eipNumber: 1559,
        author: "DataAnalyst",
        content: "According to recent data, over 4.2M ETH has been burned since implementation. Miner revenue has stabilized while user experience improved dramatically. The fee burning mechanism is working as intended.",
        timestamp: "2024-01-15T11:15:00Z",
        replies: []
      }
    ]
  },
  {
    id: "3",
    eipNumber: 4337,
    author: "AAExplorer",
    content: "Account Abstraction is revolutionary for UX. When can we expect broader wallet adoption? The gasless transactions are game-changing.",
    timestamp: "2024-01-14T14:20:00Z",
    replies: []
  },
  {
    id: "4",
    eipNumber: 7702,
    author: "PectraResearcher",
    content: "EIP-7702 provides an elegant solution for EOA account abstraction. The backward compatibility is impressive! This could be the bridge we need.",
    timestamp: "2024-12-10T09:15:00Z",
    replies: [
      {
        id: "5",
        eipNumber: 7702,
        author: "DevExpert",
        content: "Agreed! This will make account abstraction much more accessible. Looking forward to the Pectra upgrade and seeing this in action.",
        timestamp: "2024-12-10T10:30:00Z",
        replies: []
      }
    ]
  },
  {
    id: "6",
    eipNumber: 4844,
    author: "L2Developer",
    content: "EIP-4844 has been a game-changer for Layer 2 costs. Our rollup fees dropped by 90% after implementation. Proto-danksharding works!",
    timestamp: "2024-03-20T16:45:00Z",
    replies: [
      {
        id: "7",
        eipNumber: 4844,
        author: "ScalingEnthusiast",
        content: "The blob transaction format is brilliant. It's amazing how much data availability we can now handle efficiently.",
        timestamp: "2024-03-20T17:20:00Z",
        replies: []
      }
    ]
  },
  {
    id: "8",
    eipNumber: 6900,
    author: "WalletBuilder",
    content: "The modular account architecture in EIP-6900 is exactly what we need for the next generation of smart wallets. Plugin standardization will enable so much innovation.",
    timestamp: "2024-11-05T13:30:00Z",
    replies: []
  }
];

export const mockNews: NewsItem[] = [
  {
    id: "1",
    title: "EIP-1559 Burns Over 4.2 Million ETH Since Implementation",
    source: "Ethereum Foundation",
    url: "#",
    publishedAt: "2024-01-15T00:00:00Z",
    eipNumbers: [1559],
    summary: "The fee burning mechanism introduced by EIP-1559 has permanently removed over 4.2 million ETH from circulation, contributing to deflationary pressure and improved fee predictability."
  },
  {
    id: "2",
    title: "Major Wallets Begin Account Abstraction Integration",
    source: "DeFi Pulse",
    url: "#",
    publishedAt: "2024-01-14T00:00:00Z",
    eipNumbers: [4337, 6900],
    summary: "Leading wallet providers announce support for EIP-4337 and EIP-6900, bringing gasless transactions, modular architecture, and improved UX to millions of users."
  },
  {
    id: "3",
    title: "NFT Royalty Standards Gain Marketplace Adoption",
    source: "NFT Now",
    url: "#",
    publishedAt: "2024-01-13T00:00:00Z",
    eipNumbers: [2981],
    summary: "EIP-2981 royalty standards are now supported by 95% of major NFT marketplaces, ensuring creator compensation across platforms and improving artist sustainability."
  },
  {
    id: "4",
    title: "Pectra Upgrade: EIP-7702 Brings Account Abstraction to EOAs",
    source: "Ethereum Blog",
    url: "#",
    publishedAt: "2024-12-15T00:00:00Z",
    eipNumbers: [7702, 7251],
    summary: "The upcoming Pectra upgrade introduces EIP-7702, enabling EOAs to temporarily set code and access account abstraction features, plus EIP-7251 for execution layer validator exits."
  },
  {
    id: "5",
    title: "EIP-4844 Reduces Layer 2 Costs by 90% After Dencun Upgrade",
    source: "L2Beat",
    url: "#",
    publishedAt: "2024-03-15T00:00:00Z",
    eipNumbers: [4844],
    summary: "Proto-danksharding implementation through EIP-4844 has dramatically reduced Layer 2 transaction costs, with major rollups reporting 85-95% fee reductions."
  },
  {
    id: "6",
    title: "Gaming NFTs Embrace Composable Standards",
    source: "GameFi Weekly",
    url: "#",
    publishedAt: "2024-02-20T00:00:00Z",
    eipNumbers: [998, 1155],
    summary: "Major gaming platforms adopt ERC-998 composable NFTs and ERC-1155 multi-token standards, enabling complex in-game assets and cross-game interoperability."
  }
];

export const mockLiveData: LiveData[] = [
  {
    eipNumber: 1559,
    metrics: {
      adoptionRate: 100,
      transactionVolume: "1.2M/day",
      gasUsage: "4.2M ETH burned",
      activeProjects: 850
    },
    charts: {
      adoptionOverTime: [
        { date: "2021-08", value: 0 },
        { date: "2021-09", value: 25 },
        { date: "2021-10", value: 50 },
        { date: "2021-11", value: 75 },
        { date: "2021-12", value: 100 }
      ],
      gasUsageOverTime: [
        { date: "2024-01-01", value: 12000000 },
        { date: "2024-01-07", value: 14000000 },
        { date: "2024-01-14", value: 15000000 }
      ]
    }
  },
  {
    eipNumber: 721,
    metrics: {
      adoptionRate: 95,
      transactionVolume: "500K/day",
      gasUsage: "8M gas/day",
      activeProjects: 45000
    },
    charts: {
      adoptionOverTime: [
        { date: "2018-01", value: 0 },
        { date: "2019-01", value: 10 },
        { date: "2020-01", value: 30 },
        { date: "2021-01", value: 60 },
        { date: "2022-01", value: 95 }
      ],
      gasUsageOverTime: [
        { date: "2024-01-01", value: 6000000 },
        { date: "2024-01-07", value: 7500000 },
        { date: "2024-01-14", value: 8000000 }
      ]
    }
  },
  {
    eipNumber: 4337,
    metrics: {
      adoptionRate: 35,
      transactionVolume: "25K ops/day",
      gasUsage: "3.5M gas saved/day",
      activeProjects: 125
    },
    charts: {
      adoptionOverTime: [
        { date: "2023-03", value: 0 },
        { date: "2023-06", value: 5 },
        { date: "2023-09", value: 15 },
        { date: "2023-12", value: 25 },
        { date: "2024-03", value: 35 }
      ],
      gasUsageOverTime: [
        { date: "2024-01-01", value: 1000000 },
        { date: "2024-01-07", value: 2500000 },
        { date: "2024-01-14", value: 3500000 }
      ]
    }
  },
  {
    eipNumber: 7702,
    metrics: {
      adoptionRate: 15,
      transactionVolume: "5K/day",
      gasUsage: "750K gas/day",
      activeProjects: 35
    },
    charts: {
      adoptionOverTime: [
        { date: "2024-10", value: 0 },
        { date: "2024-11", value: 5 },
        { date: "2024-12", value: 15 }
      ],
      gasUsageOverTime: [
        { date: "2024-12-01", value: 200000 },
        { date: "2024-12-07", value: 500000 },
        { date: "2024-12-14", value: 750000 }
      ]
    }
  },
  {
    eipNumber: 4844,
    metrics: {
      adoptionRate: 85,
      transactionVolume: "2.5M blobs/day",
      gasUsage: "95% cost reduction",
      activeProjects: 25
    },
    charts: {
      adoptionOverTime: [
        { date: "2024-03", value: 0 },
        { date: "2024-04", value: 20 },
        { date: "2024-06", value: 50 },
        { date: "2024-09", value: 75 },
        { date: "2024-12", value: 85 }
      ],
      gasUsageOverTime: [
        { date: "2024-03-01", value: 50000000 },
        { date: "2024-06-01", value: 25000000 },
        { date: "2024-12-01", value: 5000000 }
      ]
    }
  }
];