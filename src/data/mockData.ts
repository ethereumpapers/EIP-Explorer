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
    description: "This EIP provides guidelines and a template for creating new EIPs. It defines the EIP process and workflow.",
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
    discussions: "https://ethereum-magicians.org/t/eip-1-eip-purpose-and-guidelines/483"
  },
  {
    number: 5069,
    title: "EIP Editor Handbook",
    author: ["Pooja Ranjan", "Gavin John", "Sam Wilson", "Alita Moore", "Gajinder Singh"],
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
- Reviewing EIP submissions for formatting and basic requirements
- Assigning EIP numbers
- Merging approved EIPs
- Moving EIPs between statuses as appropriate

### Review Process

1. Initial submission review
2. Format and style checking
3. Technical feasibility assessment
4. Community feedback integration
5. Final approval and merging`,
    discussions: "https://ethereum-magicians.org/t/eip-5069-eip-editor-handbook/9514"
  },

  // Final EIPs - Core Standards
  {
    number: 2,
    title: "Homestead Hard-fork Changes",
    author: ["Vitalik Buterin"],
    status: "Final",
    type: "Standards Track",
    category: "Core",
    created: "2016-02-05",
    updated: "2016-02-05",
    description: "Changes included in the Homestead hard-fork, including gas cost changes and difficulty adjustment.",
    content: `# EIP-2: Homestead Hard-fork Changes

## Abstract

This EIP specifies the changes included in the Homestead hard-fork.

## Specification

1. The gas cost for creating contracts via a transaction is increased from 21,000 to 53,000
2. All transaction signatures whose s-value is greater than secp256k1n/2 are now considered invalid
3. If contract creation does not have enough gas to pay for the final account creation, it goes out-of-gas rather than leaving an empty account
4. Change the difficulty adjustment algorithm`,
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

The following standard allows for the implementation of a standard API for tokens within smart contracts. This standard provides basic functionality to transfer tokens, as well as allow tokens to be approved so they can be spent by another on-chain third party.

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
    
    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);
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
    description: "Specification for mixed-case checksum address encoding to detect typos in Ethereum addresses.",
    content: `# EIP-55: Mixed-case checksum address encoding

## Abstract

This EIP describes a method for encoding Ethereum addresses using mixed case that includes a checksum.

## Specification

Code:
\`\`\`python
def checksum_encode(addr): # Takes a 20-byte binary address as input
    hex_addr = addr.hex()
    checksummed_buffer = ""
    
    # Treat the hex address as ascii/utf-8 for keccak256 hashing
    hashed_address = keccak256(hex_addr.encode('utf-8')).hex()
    
    # Iterate over each character in the hex address
    for nibble_index, character in enumerate(hex_addr):
        if character in "0123456789":
            # We can't upper-case the decimal digits
            checksummed_buffer += character
        elif character in "abcdef":
            # Check if the corresponding hex digit (nibble) in the hash is 8 or higher
            if int(hashed_address[nibble_index], 16) >= 8:
                checksummed_buffer += character.upper()
            else:
                checksummed_buffer += character.lower()
                
    return "0x" + checksummed_buffer
\`\`\``,
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
    /// @notice Query if a contract implements an interface
    /// @param interfaceID The interface identifier, as specified in ERC-165
    /// @dev Interface identification is specified in ERC-165. This function
    ///  uses less than 30,000 gas.
    /// @return \`true\` if the contract implements \`interfaceID\` and
    ///  \`interfaceID\` is not 0xffffffff, \`false\` otherwise
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

A standard interface allows wallet/broker/auction applications to work with any NFT on Ethereum. We provide for simple ERC-721 smart contracts as well as contracts that track an arbitrarily large number of NFTs.

## Specification

\`\`\`solidity
interface ERC721 {
    event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);
    event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);
    event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);

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

Tokens standards like ERC-20 and ERC-721 require a separate contract to be deployed for each token type or collection. This places a lot of redundant bytecode on the Ethereum blockchain and limits certain functionality by the nature of separating each token contract into its own permissioned address.

## Specification

\`\`\`solidity
interface ERC1155 {
    event TransferSingle(address indexed _operator, address indexed _from, address indexed _to, uint256 _id, uint256 _value);
    event TransferBatch(address indexed _operator, address indexed _from, address indexed _to, uint256[] _ids, uint256[] _values);
    event ApprovalForAll(address indexed _account, address indexed _operator, bool _approved);
    event URI(string _value, uint256 indexed _id);

    function safeTransferFrom(address _from, address _to, uint256 _id, uint256 _value, bytes calldata _data) external;
    function safeBatchTransferFrom(address _from, address _to, uint256[] calldata _ids, uint256[] calldata _values, bytes calldata _data) external;
    function balanceOf(address _account, uint256 _id) external view returns (uint256);
    function balanceOfBatch(address[] calldata _accounts, uint256[] calldata _ids) external view returns (uint256[] memory);
    function setApprovalForAll(address _operator, bool _approved) external;
    function isApprovedForAll(address _account, address _operator) external view returns (bool);
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

Ethereum currently prices transaction fees using a simple auction mechanism, where users send transactions with bids ("gasprices") and miners choose transactions with the highest bids, and transactions that get included pay the bid that they specify.

## Specification

### Parameters

- \`FORK_BLOCK_NUMBER\`: TBD
- \`BASE_FEE_MAX_CHANGE_DENOMINATOR\`: 8
- \`ELASTICITY_MULTIPLIER\`: 2

### Base Fee

The base fee is calculated as follows:

\`\`\`
base_fee = parent_base_fee * (1 + (parent_gas_used - parent_gas_target) / parent_gas_target / BASE_FEE_MAX_CHANGE_DENOMINATOR)
\`\`\`

Where:
- \`parent_gas_target = parent_gas_limit / ELASTICITY_MULTIPLIER\`

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

There are many marketplaces for NFTs with wide variability in how they identify and pay royalties to creators. The royalty payment must be voluntary, as transfer mechanisms such as transferFrom() include NFT transfers between wallets, and executing them does not always imply a sale occurred.

## Specification

\`\`\`solidity
interface IERC2981 {
    /// @notice Called with the sale price to determine how much royalty
    ///         is owed and to whom.
    /// @param _tokenId - the NFT asset queried for royalty information
    /// @param _salePrice - the sale price of the NFT asset specified by _tokenId
    /// @return receiver - address of who should be sent the royalty payment
    /// @return royaltyAmount - the royalty payment amount for _salePrice
    function royaltyInfo(uint256 _tokenId, uint256 _salePrice)
        external
        view
        returns (address receiver, uint256 royaltyAmount);
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
    updated: "2021-07-22",
    description: "This EIP deprecates Proof-of-Work (PoW) and activates Proof-of-Stake (PoS) as part of the Merge.",
    content: `# EIP-3675: Upgrade consensus to Proof-of-Stake

## Abstract

This EIP deprecates Proof-of-Work (PoW) and activates Proof-of-Stake (PoS) as part of the Merge.

## Motivation

The Merge is the long-awaited transition of Ethereum from Proof-of-Work to Proof-of-Stake consensus. This transition will:
- Reduce Ethereum's energy consumption by ~99.95%
- Set the stage for future scaling upgrades
- Improve the security and decentralization of the network

## Specification

### Transition Process

1. The transition is triggered by reaching a specific Total Terminal Difficulty (TTD)
2. Once TTD is reached, the execution layer stops producing PoW blocks
3. The consensus layer (Beacon Chain) takes over block production
4. Validators replace miners as block producers

### Changes to Block Structure

- Remove PoW-specific fields (mixHash, nonce)
- Add new fields for PoS consensus
- Modify block validation rules`,
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
    description: "Introduces a new transaction type for blob-carrying transactions which store data that is accessible to the beacon chain.",
    content: `# EIP-4844: Shard Blob Transactions

## Abstract

Introduce a new transaction type for "blob-carrying transactions" which contain a large amount of data that cannot be accessed by EVM execution, but whose commitment can be accessed.

## Motivation

Rollups are in the short and medium term, and possibly the long term, the only trustless scaling solution for Ethereum. Transaction fees on rollups are primarily determined by the cost of data availability on the base layer.

## Specification

### Parameters

- \`BLOB_TX_TYPE = 0x03\`
- \`VERSIONED_HASH_VERSION_KZG = 0x01\`
- \`BLOB_COMMITMENT_VERSION_KZG = 0x01\`
- \`FIELD_ELEMENTS_PER_BLOB = 4096\`
- \`BLS_MODULUS = 52435875175126190479447740508185965837690552500527637822603658699938581184513\`

### New Transaction Type

A new transaction type \`blob_tx\` is introduced with the following fields:
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
- \`blob_versioned_hashes\`: List of versioned blob hashes`,
    discussions: "https://ethereum-magicians.org/t/eip-4844-shard-blob-transactions/8430"
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
    description: "Defines a standard for EVM execution traces to improve debugging and analysis tools.",
    content: `# EIP-3155: EVM Trace Specification

## Abstract

This EIP defines a standard for EVM execution traces. A trace is a record of EVM execution that can be used for debugging, analysis, and verification.

## Motivation

Currently, different Ethereum clients produce traces in different formats, making it difficult to build tools that work across implementations.

## Specification

### Trace Format

Each trace entry contains:
- \`pc\`: Program counter
- \`op\`: Operation code
- \`gas\`: Remaining gas
- \`gasCost\`: Gas cost of operation
- \`memory\`: Memory contents
- \`memSize\`: Memory size
- \`stack\`: Stack contents
- \`depth\`: Call depth
- \`refund\`: Gas refund
- \`opName\`: Operation name`,
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
    description: "Store historical block hashes in state to support stateless execution and history expiry.",
    content: `# EIP-2935: Serve historical block hashes from state

## Abstract

Store historical block hashes in a system contract to enable stateless execution and support history expiry.

## Motivation

Currently, the BLOCKHASH opcode can access the last 256 block hashes. This EIP extends this capability while supporting stateless execution.

## Specification

### System Contract

A system contract at address \`0x25a219378dad9b3503c8268c9ca836a52427a4fb\` stores historical block hashes.

### Storage Layout

- Slot \`block_number % HISTORY_STORAGE_ADDRESS\` contains the hash of block \`block_number\`
- The contract maintains a ring buffer of block hashes`,
    discussions: "https://ethereum-magicians.org/t/eip-2935-save-historical-block-hashes-in-state/4565"
  },

  // Draft EIPs - Account Abstraction and Wallet Standards
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

An account abstraction proposal which completely avoids the need for consensus-layer protocol changes. Instead of adding new protocol features and changing the existing validation logic, this proposal introduces a higher-layer pseudo-transaction object called a UserOperation.

## Motivation

Account abstraction allows users to use smart contract wallets containing arbitrary verification logic instead of EOAs as their primary account.

## Specification

### Definitions

- **UserOperation** - a structure that describes a transaction to be sent on behalf of a user
- **Bundler** - a node that can handle UserOperations  
- **EntryPoint** - a singleton contract that executes bundles of UserOperations
- **Paymaster** - a contract that can sponsor gas fees for UserOperations
- **Aggregator** - a contract that can validate signatures for multiple UserOperations

### UserOperation Structure

\`\`\`solidity
struct UserOperation {
    address sender;
    uint256 nonce;
    bytes initCode;
    bytes callData;
    uint256 callGasLimit;
    uint256 verificationGasLimit;
    uint256 preVerificationGas;
    uint256 maxFeePerGas;
    uint256 maxPriorityFeePerGas;
    bytes paymasterAndData;
    bytes signature;
}
\`\`\``,
    discussions: "https://ethereum-magicians.org/t/erc-4337-account-abstraction-via-entry-point-contract-specification/7160"
  },
  {
    number: 6900,
    title: "Modular Smart Contract Accounts and Plugins",
    author: ["Adam Egyed", "Fangting Liu", "Jay Paik", "Yoav Weiss"],
    status: "Draft",
    type: "Standards Track",
    category: "ERC",
    created: "2023-04-18",
    updated: "2024-01-15",
    description: "Standardizes smart contract accounts and account plugins to enable a modular smart contract account ecosystem.",
    content: `# EIP-6900: Modular Smart Contract Accounts and Plugins

## Abstract

This proposal standardizes smart contract accounts and account plugins, enabling a modular smart contract account ecosystem where any developer can build plugins that are compatible with any modular smart contract account.

## Motivation

Smart contract accounts adopting EIP-4337 are being developed with different plugin systems. This EIP aims to standardize these systems.

## Specification

### Account Interface

\`\`\`solidity
interface IAccount {
    function installPlugin(
        address plugin,
        bytes32 manifestHash,
        bytes calldata pluginInstallData
    ) external;
    
    function uninstallPlugin(
        address plugin,
        bytes calldata config,
        bytes calldata pluginUninstallData
    ) external;
}
\`\`\``,
    discussions: "https://ethereum-magicians.org/t/eip-6900-modular-smart-contract-accounts-and-plugins/13885"
  },

  // Pectra Upgrade EIPs
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

  // More Draft EIPs
  {
    number: 998,
    title: "Composable Non-Fungible Token Standard",
    author: ["Matt Lockyer", "Nick Mudge", "Jordan Schalm"],
    status: "Draft",
    type: "Standards Track",
    category: "ERC",
    created: "2018-04-20",
    updated: "2018-04-20",
    description: "An extension to ERC-721 that enables NFTs to own other NFTs and ERC-20 tokens.",
    content: `# EIP-998: Composable Non-Fungible Token Standard

## Abstract

This standard outlines a smart contract interface that can represent any number of ERC-721 and ERC-20 tokens. ERC-998 tokens can be composed of multiple child tokens.

## Motivation

The ability for NFTs to own other NFTs and ERC-20 tokens enables new use cases like:
- Gaming items that contain other items
- Digital collectibles with accessories
- Bundled asset packages

## Specification

\`\`\`solidity
interface ERC998ERC721TopDown {
    event ReceivedChild(address indexed _from, uint256 indexed _tokenId, address indexed _childContract, uint256 _childTokenId);
    event TransferChild(uint256 indexed _tokenId, address indexed _to, address indexed _childContract, uint256 _childTokenId);
    
    function rootOwnerOf(uint256 _tokenId) external view returns (bytes32 rootOwner);
    function rootOwnerOfChild(address _childContract, uint256 _childTokenId) external view returns (bytes32 rootOwner);
    function ownerOfChild(address _childContract, uint256 _childTokenId) external view returns (bytes32 parentTokenOwner, uint256 parentTokenId);
    function onERC721Received(address _operator, address _from, uint256 _childTokenId, bytes _data) external returns(bytes4);
    function transferChild(uint256 _fromTokenId, address _to, address _childContract, uint256 _childTokenId) external;
    function safeTransferChild(uint256 _fromTokenId, address _to, address _childContract, uint256 _childTokenId) external;
    function safeTransferChild(uint256 _fromTokenId, address _to, address _childContract, uint256 _childTokenId, bytes _data) external;
    function transferChildToParent(uint256 _fromTokenId, address _toContract, uint256 _toTokenId, address _childContract, uint256 _childTokenId, bytes _data) external;
    function getChild(address _from, uint256 _tokenId, address _childContract, uint256 _childTokenId) external;
}
\`\`\``,
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
    updated: "2018-07-08",
    description: "A standard interface for voting systems on Ethereum.",
    content: `# EIP-1202: Voting Interface

## Abstract

This EIP specifies a standard interface for voting systems, allowing for interoperability between different voting implementations.

## Motivation

Voting is a fundamental governance mechanism. A standard interface would enable:
- Interoperability between voting systems
- Standardized tooling for vote analysis
- Easier integration with governance frameworks

## Specification

\`\`\`solidity
interface IERC1202 {
    event VoteCast(uint256 indexed issueId, address indexed voter, uint256 option, uint256 weight, string reason);
    event IssueCreated(uint256 indexed issueId, string issueUri, address indexed issuer);
    event IssueStatusChanged(uint256 indexed issueId, uint256 status);

    function vote(uint256 _issueId, uint256 _option) external returns (bool success);
    function voteWithReason(uint256 _issueId, uint256 _option, string calldata _reason) external returns (bool success);
    function setStatus(uint256 _issueId, uint256 _status) external returns (bool success);
    function getStatus(uint256 _issueId) external view returns (uint256 status);
    function ballotOf(uint256 _issueId, address _voter) external view returns (uint256 option);
    function weightOf(uint256 _issueId, address _voter) external view returns (uint256 weight);
    function getOptionCount(uint256 _issueId) external view returns (uint256 count);
    function winningOption(uint256 _issueId) external view returns (uint256 option);
}
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

This proposal introduces transaction type which can be sent to any address and can trigger any code, whose signature can be verified by arbitrary code.

## Motivation

Currently, transactions have a specific format and can only be sent from externally owned accounts. This EIP would allow for more flexible transaction types.

## Specification

A new transaction type is introduced with the following properties:
- Can be sent to any address
- Signature verification is done by the receiving contract
- Gas payment can be handled by the contract
- Enables account abstraction without protocol changes`,
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
    updated: "2019-07-17",
    description: "Introduces subroutines and static jumps to the EVM to improve code organization and gas efficiency.",
    content: `# EIP-615: Subroutines and Static Jumps for the EVM

## Abstract

This EIP introduces subroutines and static jumps to the Ethereum Virtual Machine (EVM) to improve code organization, readability, and gas efficiency.

## Motivation

The current EVM lacks subroutines, making code organization difficult and leading to code duplication. This proposal adds:
- JUMPSUB instruction for calling subroutines
- RETURNSUB instruction for returning from subroutines
- Static jump validation at deploy time

## Specification

### New Instructions

- \`JUMPSUB (0x5e)\`: Jump to subroutine
- \`RETURNSUB (0x5f)\`: Return from subroutine

### Validation

All jumps must be validated at contract deployment time to ensure:
- Valid jump destinations
- Proper subroutine structure
- Stack consistency`,
    discussions: "https://ethereum-magicians.org/t/eip-615-subroutines-for-the-evm/2728"
  },

  // Withdrawn EIPs
  {
    number: 999,
    title: "Restore Contract Code",
    author: ["Afri Schoedon"],
    status: "Withdrawn",
    type: "Standards Track",
    category: "Core",
    created: "2018-04-04",
    updated: "2018-04-04",
    description: "A controversial proposal to restore the Parity multi-sig wallet contract code that was accidentally destroyed.",
    content: `# EIP-999: Restore Contract Code

## Abstract

This EIP proposes to restore the contract code of the Parity multi-sig wallet that was accidentally destroyed in November 2017.

## Motivation

The Parity multi-sig wallet library contract was accidentally destroyed, freezing approximately 513,774.16 Ether in 587 wallets.

## Specification

The proposal would:
1. Restore the original contract code at the affected address
2. Allow affected wallets to regain access to their funds
3. Implement this change in a hard fork

## Status

This EIP was withdrawn due to significant community opposition and concerns about:
- Immutability of the blockchain
- Precedent for future interventions
- Governance implications`,
    discussions: "https://ethereum-magicians.org/t/eip-999-restore-contract-code-at-0x863df6bfa4469f3ead0be8f9f2aae51c91a907b4/130"
  }
];

export const mockProjects: Project[] = [
  {
    id: "1",
    name: "OpenSea",
    description: "Leading NFT marketplace utilizing ERC-721, ERC-1155, and EIP-2981 standards for trading digital assets with comprehensive royalty support.",
    website: "https://opensea.io",
    github: "https://github.com/ProjectOpenSea",
    eipNumbers: [721, 1155, 2981],
    implementationDetails: "Full implementation of NFT standards with advanced trading features, collection management, and automatic royalty enforcement using EIP-2981.",
    status: "Active",
    logo: "https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
  },
  {
    id: "2",
    name: "MetaMask",
    description: "Popular Web3 wallet implementing EIP-1559 fee mechanisms, EIP-4337 account abstraction, and EIP-7702 EOA enhancement features.",
    website: "https://metamask.io",
    github: "https://github.com/MetaMask",
    eipNumbers: [1559, 4337, 7702],
    implementationDetails: "Advanced fee estimation with EIP-1559, smart contract wallet integration via EIP-4337, and experimental EOA account abstraction support through EIP-7702.",
    status: "Active",
    logo: "https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
  },
  {
    id: "3",
    name: "Uniswap V3",
    description: "Decentralized exchange protocol leveraging ERC-20 token standards for automated market making with concentrated liquidity.",
    website: "https://uniswap.org",
    github: "https://github.com/Uniswap",
    eipNumbers: [20, 165],
    implementationDetails: "Concentrated liquidity pools with comprehensive ERC-20 token support, interface detection via EIP-165, and advanced AMM mechanics.",
    status: "Active",
    logo: "https://images.pexels.com/photos/7567526/pexels-photo-7567526.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
  },
  {
    id: "4",
    name: "Argent Wallet",
    description: "Smart contract wallet implementing EIP-4337 Account Abstraction for enhanced user experience with social recovery and gasless transactions.",
    website: "https://argent.xyz",
    github: "https://github.com/argentlabs",
    eipNumbers: [4337, 6900],
    implementationDetails: "Native EIP-4337 implementation with social recovery, gasless transactions, modular plugin system via EIP-6900, and DeFi integrations.",
    status: "Active",
    logo: "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
  },
  {
    id: "5",
    name: "Ethereum Foundation",
    description: "Core development team implementing Pectra upgrade features including EIP-7702, EIP-7251, and BLS12-381 precompiles.",
    website: "https://ethereum.org",
    github: "https://github.com/ethereum",
    eipNumbers: [7702, 7251, 2537, 4844],
    implementationDetails: "Protocol-level implementation of Pectra upgrade features in all major Ethereum clients, including EOA account abstraction, execution layer exits, and blob transactions.",
    status: "Active",
    logo: "https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
  },
  {
    id: "6",
    name: "Aave Protocol",
    description: "Leading DeFi lending protocol supporting hundreds of ERC-20 tokens with advanced features like flash loans and yield farming.",
    website: "https://aave.com",
    github: "https://github.com/aave",
    eipNumbers: [20, 165],
    implementationDetails: "Comprehensive ERC-20 integration for lending, borrowing, and yield farming with aToken wrappers and interface detection.",
    status: "Active",
    logo: "https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
  },
  {
    id: "7",
    name: "Chainlink",
    description: "Decentralized oracle network with LINK token implementing ERC-20 standard for secure data feeds and VRF services.",
    website: "https://chain.link",
    github: "https://github.com/smartcontractkit",
    eipNumbers: [20],
    implementationDetails: "LINK token serves as payment for oracle services with standard ERC-20 functionality and additional oracle-specific features.",
    status: "Active",
    logo: "https://images.pexels.com/photos/730564/pexels-photo-730564.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
  },
  {
    id: "8",
    name: "Bored Ape Yacht Club",
    description: "Iconic NFT collection implementing ERC-721 standard with utility features and community governance.",
    website: "https://boredapeyachtclub.com",
    eipNumbers: [721],
    implementationDetails: "Premium ERC-721 implementation with metadata standards, provenance tracking, and utility integration for exclusive member benefits.",
    status: "Active",
    logo: "https://images.pexels.com/photos/7567432/pexels-photo-7567432.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
  },
  {
    id: "9",
    name: "Art Blocks",
    description: "Generative art platform using ERC-721 for programmable and dynamic NFT creation with on-chain art generation.",
    website: "https://artblocks.io",
    eipNumbers: [721, 2981],
    implementationDetails: "Advanced ERC-721 implementation with on-chain generative art, dynamic metadata, artist royalties via EIP-2981, and programmable aesthetics.",
    status: "Active",
    logo: "https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
  },
  {
    id: "10",
    name: "Safe (Gnosis Safe)",
    description: "Multi-signature wallet evolving to support EIP-4337 account abstraction features and modular plugin architecture.",
    website: "https://safe.global",
    github: "https://github.com/safe-global",
    eipNumbers: [4337, 6900],
    implementationDetails: "Integrating EIP-4337 support into existing multi-sig infrastructure for enhanced UX, automation, and modular plugin system.",
    status: "Beta",
    logo: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
  },
  {
    id: "11",
    name: "Foundation",
    description: "Creator-focused NFT platform with native EIP-2981 royalty support and ERC-721 implementation.",
    website: "https://foundation.app",
    eipNumbers: [721, 2981],
    implementationDetails: "Built-in royalty enforcement using EIP-2981 standard ensuring creators receive ongoing compensation from secondary sales.",
    status: "Active",
    logo: "https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
  },
  {
    id: "12",
    name: "SuperRare",
    description: "Digital art marketplace implementing EIP-2981 for automatic artist royalty distribution and ERC-721 NFTs.",
    website: "https://superrare.com",
    eipNumbers: [721, 2981],
    implementationDetails: "Automatic royalty calculation and distribution using EIP-2981 standard for all secondary sales with curated artist onboarding.",
    status: "Active",
    logo: "https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
  },
  {
    id: "13",
    name: "Biconomy",
    description: "Infrastructure platform providing EIP-4337 account abstraction solutions for dApps with gasless transactions.",
    website: "https://biconomy.io",
    github: "https://github.com/bcnmy",
    eipNumbers: [4337],
    implementationDetails: "Comprehensive AA infrastructure with bundler services, paymaster solutions, and SDK for developers to integrate gasless transactions.",
    status: "Active",
    logo: "https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
  },
  {
    id: "14",
    name: "Enjin",
    description: "Gaming platform implementing ERC-1155 multi-token standard for efficient gaming asset management.",
    website: "https://enjin.io",
    github: "https://github.com/enjin",
    eipNumbers: [1155, 998],
    implementationDetails: "Advanced ERC-1155 implementation for gaming assets with composable NFT support via EIP-998 for item combinations and upgrades.",
    status: "Active",
    logo: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
  },
  {
    id: "15",
    name: "Compound",
    description: "DeFi lending protocol with governance tokens implementing ERC-20 and voting standards.",
    website: "https://compound.finance",
    github: "https://github.com/compound-finance",
    eipNumbers: [20, 1202],
    implementationDetails: "COMP governance token with ERC-20 standard and voting interface implementation for decentralized protocol governance.",
    status: "Active",
    logo: "https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
  }
];

export const mockDiscussions: Discussion[] = [
  {
    id: "1",
    eipNumber: 1559,
    author: "EthDev42",
    content: "The implementation of EIP-1559 has significantly improved fee predictability. Has anyone analyzed the impact on miner revenue and the deflationary effects of ETH burning?",
    timestamp: "2024-01-15T10:30:00Z",
    replies: [
      {
        id: "2",
        eipNumber: 1559,
        author: "DataAnalyst",
        content: "According to recent data, over 4.2M ETH has been burned since implementation. Miner revenue has stabilized while user experience improved dramatically. The fee burning mechanism is working as intended with significant deflationary pressure.",
        timestamp: "2024-01-15T11:15:00Z",
        replies: []
      },
      {
        id: "3",
        eipNumber: 1559,
        author: "EconomicsExpert",
        content: "The economic implications are fascinating. EIP-1559 has effectively made ETH a deflationary asset during high network usage periods. This fundamentally changes Ethereum's monetary policy.",
        timestamp: "2024-01-15T12:00:00Z",
        replies: []
      }
    ]
  },
  {
    id: "4",
    eipNumber: 4337,
    author: "AAExplorer",
    content: "Account Abstraction via EIP-4337 is revolutionary for UX. The ability to sponsor gas fees and batch transactions will onboard millions of new users. When can we expect broader wallet adoption?",
    timestamp: "2024-01-14T14:20:00Z",
    replies: [
      {
        id: "5",
        eipNumber: 4337,
        author: "WalletDev",
        content: "We're seeing rapid adoption. Major wallets like Argent and Safe are already implementing EIP-4337. The infrastructure is maturing quickly with bundlers and paymasters going live.",
        timestamp: "2024-01-14T15:30:00Z",
        replies: []
      }
    ]
  },
  {
    id: "6",
    eipNumber: 7702,
    author: "PectraResearcher",
    content: "EIP-7702 provides an elegant solution for EOA account abstraction. The backward compatibility is impressive! This will make account abstraction accessible to existing EOA users without migration.",
    timestamp: "2024-12-10T09:15:00Z",
    replies: [
      {
        id: "7",
        eipNumber: 7702,
        author: "DevExpert",
        content: "Agreed! The temporary code setting mechanism is brilliant. EOAs can gain smart contract capabilities for single transactions while maintaining their existing infrastructure. This is the bridge we needed.",
        timestamp: "2024-12-10T10:30:00Z",
        replies: []
      },
      {
        id: "8",
        eipNumber: 7702,
        author: "SecurityAuditor",
        content: "The security model is well thought out. The authorization list prevents unauthorized code execution while enabling powerful features like sponsored transactions and batched operations.",
        timestamp: "2024-12-10T11:45:00Z",
        replies: []
      }
    ]
  },
  {
    id: "9",
    eipNumber: 721,
    author: "NFTCreator",
    content: "ERC-721 has been the foundation of the entire NFT ecosystem. The standard's simplicity and flexibility enabled everything from art to gaming to utility tokens. What improvements are being considered?",
    timestamp: "2024-01-12T16:00:00Z",
    replies: [
      {
        id: "10",
        eipNumber: 721,
        author: "StandardsExpert",
        content: "Extensions like EIP-2981 for royalties and EIP-998 for composable NFTs are adding powerful features while maintaining backward compatibility. The ecosystem continues to evolve.",
        timestamp: "2024-01-12T17:15:00Z",
        replies: []
      }
    ]
  },
  {
    id: "11",
    eipNumber: 2981,
    author: "ArtistAdvocate",
    content: "EIP-2981 royalty standard is crucial for creator economics. Automatic royalty enforcement across marketplaces ensures artists get compensated for their work's ongoing value.",
    timestamp: "2024-01-11T13:30:00Z",
    replies: []
  },
  {
    id: "12",
    eipNumber: 4844,
    author: "L2Developer",
    content: "Proto-danksharding via EIP-4844 has dramatically reduced L2 costs. Blob transactions are a game-changer for rollup scalability. The data availability improvements are exactly what we needed.",
    timestamp: "2024-03-15T08:45:00Z",
    replies: [
      {
        id: "13",
        eipNumber: 4844,
        author: "ScalingExpert",
        content: "The cost reductions are incredible. Some L2s are seeing 90%+ fee reductions. This makes Ethereum truly competitive for everyday transactions while maintaining security.",
        timestamp: "2024-03-15T09:30:00Z",
        replies: []
      }
    ]
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
    summary: "The fee burning mechanism introduced by EIP-1559 has permanently removed over 4.2 million ETH from circulation, contributing to significant deflationary pressure and changing Ethereum's monetary policy."
  },
  {
    id: "2",
    title: "Major Wallets Accelerate Account Abstraction Integration",
    source: "DeFi Pulse",
    url: "#",
    publishedAt: "2024-01-14T00:00:00Z",
    eipNumbers: [4337],
    summary: "Leading wallet providers including MetaMask, Argent, and Safe announce comprehensive support for EIP-4337, bringing gasless transactions and improved UX to millions of users."
  },
  {
    id: "3",
    title: "NFT Royalty Standards Achieve 95% Marketplace Adoption",
    source: "NFT Now",
    url: "#",
    publishedAt: "2024-01-13T00:00:00Z",
    eipNumbers: [2981],
    summary: "EIP-2981 royalty standards are now supported by 95% of major NFT marketplaces, ensuring creator compensation across platforms and establishing a sustainable creator economy."
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
    title: "Proto-Danksharding Reduces L2 Costs by 90% Following EIP-4844",
    source: "L2Beat",
    url: "#",
    publishedAt: "2024-03-20T00:00:00Z",
    eipNumbers: [4844],
    summary: "Blob transactions introduced by EIP-4844 have dramatically reduced Layer 2 transaction costs, with some rollups seeing over 90% fee reductions while maintaining security guarantees."
  },
  {
    id: "6",
    title: "BLS12-381 Precompiles Enable Advanced Cryptography on Ethereum",
    source: "Ethereum Research",
    url: "#",
    publishedAt: "2024-02-10T00:00:00Z",
    eipNumbers: [2537],
    summary: "EIP-2537 implementation enables efficient BLS signature verification and zero-knowledge proof systems, opening new possibilities for privacy and scalability solutions."
  },
  {
    id: "7",
    title: "Composable NFTs Gain Traction in Gaming Ecosystem",
    source: "Gaming Weekly",
    url: "#",
    publishedAt: "2024-01-08T00:00:00Z",
    eipNumbers: [998, 1155],
    summary: "EIP-998 composable NFTs combined with ERC-1155 multi-tokens are revolutionizing gaming assets, enabling complex item systems and cross-game interoperability."
  },
  {
    id: "8",
    title: "Modular Smart Contract Accounts Standardized via EIP-6900",
    source: "Web3 Daily",
    url: "#",
    publishedAt: "2024-01-05T00:00:00Z",
    eipNumbers: [6900],
    summary: "EIP-6900 establishes standards for modular smart contract accounts, enabling a plugin ecosystem where developers can build compatible account extensions."
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
      activeProjects: 150
    },
    charts: {
      adoptionOverTime: [
        { date: "2023-03", value: 0 },
        { date: "2023-06", value: 5 },
        { date: "2023-09", value: 15 },
        { date: "2023-12", value: 25 },
        { date: "2024-01", value: 35 }
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
      transactionVolume: "2K/day",
      gasUsage: "500K gas/day",
      activeProjects: 25
    },
    charts: {
      adoptionOverTime: [
        { date: "2024-10", value: 0 },
        { date: "2024-11", value: 5 },
        { date: "2024-12", value: 15 }
      ],
      gasUsageOverTime: [
        { date: "2024-12-01", value: 100000 },
        { date: "2024-12-07", value: 300000 },
        { date: "2024-12-14", value: 500000 }
      ]
    }
  },
  {
    eipNumber: 4844,
    metrics: {
      adoptionRate: 85,
      transactionVolume: "150K blobs/day",
      gasUsage: "50M blob gas/day",
      activeProjects: 45
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
        { date: "2024-12-01", value: 30000000 },
        { date: "2024-12-07", value: 40000000 },
        { date: "2024-12-14", value: 50000000 }
      ]
    }
  }
];