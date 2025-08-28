import { EIP, Project, Discussion, NewsItem } from '../types/eip';

// Enhanced mock data with recent EIPs from 2024 and important standards
export const mockEIPs: EIP[] = [
  // Pectra Upgrade EIPs (Planned for 2025)
  {
    number: 7702,
    title: 'Set EOA account code for one transaction',
    author: ['Vitalik Buterin', 'Sam Wilson', 'Ansgar Dietrichs', 'Matt Garnett'],
    status: 'Draft',
    type: 'Standards Track',
    category: 'Core',
    created: '2024-05-07',
    updated: '2024-11-15',
    description: 'Add a new transaction type that adds a list of [address, code] tuples, and sets the code of each address for the duration of that transaction.',
    content: `## Abstract

This EIP introduces a new transaction type that allows setting the code of an Externally Owned Account (EOA) for the duration of a single transaction. This enables EOAs to temporarily act like smart contracts, providing a stepping stone toward account abstraction.

## Motivation

Account abstraction has been a long-standing goal for Ethereum. This EIP provides a simpler path forward by allowing EOAs to temporarily set code during transaction execution, enabling features like:

- Batch transactions from EOAs
- Sponsored transactions
- Custom signature schemes
- Temporary smart contract functionality

## Specification

A new transaction type is introduced with the following structure:

- \`authorization_list\`: A list of tuples \`[chain_id, address, nonce, y_parity, r, s]\`
- Each tuple authorizes setting the code at \`address\` for this transaction

During transaction execution:
1. Verify each authorization signature
2. Set the code at each authorized address
3. Execute the transaction normally
4. Restore original code after execution

## Security Considerations

- Authorizations are single-use (nonce-based)
- Code is only set for the duration of one transaction
- Original account state is preserved
- Replay protection through chain_id and nonce

## Pectra Upgrade

EIP-7702 is a key component of the Pectra upgrade, planned for 2025. It represents a major step toward account abstraction on Ethereum.`,
    discussions: 'https://ethereum-magicians.org/t/eip-7702-set-eoa-account-code-for-one-transaction/19769'
  },
  {
    number: 7002,
    title: 'Execution layer validator registration',
    author: ['Vitalik Buterin', 'Dankrad Feist', 'Diederik Loerakker'],
    status: 'Draft',
    type: 'Standards Track',
    category: 'Core',
    created: '2024-08-15',
    updated: '2024-11-20',
    description: 'Allow execution layer validators to register and participate in consensus through the execution layer.',
    content: `## Abstract

This EIP introduces a mechanism for execution layer validators to register and participate in Ethereum consensus. This is part of the broader effort to integrate execution layer and consensus layer functionality.

## Motivation

The current Ethereum architecture separates execution and consensus layers. This EIP begins the process of allowing execution layer components to participate directly in consensus, improving efficiency and reducing complexity.

## Key Features

- Validator registration through execution layer
- Direct participation in consensus
- Improved efficiency for certain operations
- Foundation for future integration

## Pectra Upgrade

EIP-7002 is planned for inclusion in the Pectra upgrade, representing a significant architectural improvement to Ethereum's consensus mechanism.`,
    discussions: 'https://ethereum-magicians.org/t/eip-7002-execution-layer-validator-registration/19800'
  },
  {
    number: 7003,
    title: 'Execution layer validator exit',
    author: ['Vitalik Buterin', 'Dankrad Feist', 'Diederik Loerakker'],
    status: 'Draft',
    type: 'Standards Track',
    category: 'Core',
    created: '2024-08-15',
    updated: '2024-11-20',
    description: 'Allow execution layer validators to exit the consensus mechanism through the execution layer.',
    content: `## Abstract

This EIP provides a mechanism for execution layer validators to exit the consensus mechanism through the execution layer, complementing EIP-7002's registration functionality.

## Motivation

For a complete validator lifecycle management system, validators need both registration and exit capabilities through the execution layer. This EIP provides the exit functionality.

## Key Features

- Validator exit through execution layer
- Proper cleanup of validator state
- Integration with existing exit mechanisms
- Security considerations for exit conditions

## Pectra Upgrade

EIP-7003 works in conjunction with EIP-7002 to provide complete validator lifecycle management in the Pectra upgrade.`,
    discussions: 'https://ethereum-magicians.org/t/eip-7003-execution-layer-validator-exit/19801'
  },
  {
    number: 7004,
    title: 'Execution layer validator slashing',
    author: ['Vitalik Buterin', 'Dankrad Feist', 'Diederik Loerakker'],
    status: 'Draft',
    type: 'Standards Track',
    category: 'Core',
    created: '2024-08-15',
    updated: '2024-11-20',
    description: 'Allow execution layer validators to be slashed through the execution layer.',
    content: `## Abstract

This EIP introduces slashing mechanisms for execution layer validators, ensuring proper penalties for malicious behavior or protocol violations.

## Motivation

Validator slashing is a critical component of Ethereum's security model. This EIP extends slashing capabilities to execution layer validators, maintaining the same security guarantees.

## Key Features

- Slashing through execution layer
- Integration with existing slashing mechanisms
- Proper penalty calculations
- Security considerations for slashing conditions

## Pectra Upgrade

EIP-7004 completes the validator management system in the Pectra upgrade, providing comprehensive slashing capabilities for execution layer validators.`,
    discussions: 'https://ethereum-magicians.org/t/eip-7004-execution-layer-validator-slashing/19802'
  },
  {
    number: 7005,
    title: 'Execution layer validator rewards',
    author: ['Vitalik Buterin', 'Dankrad Feist', 'Diederik Loerakker'],
    status: 'Draft',
    type: 'Standards Track',
    category: 'Core',
    created: '2024-08-15',
    updated: '2024-11-20',
    description: 'Distribute validator rewards through the execution layer.',
    content: `## Abstract

This EIP provides a mechanism for distributing validator rewards through the execution layer, completing the validator reward system for execution layer validators.

## Motivation

Validator rewards are essential for incentivizing proper validator behavior. This EIP ensures that execution layer validators receive appropriate rewards for their participation in consensus.

## Key Features

- Reward distribution through execution layer
- Integration with existing reward mechanisms
- Proper reward calculations
- Economic incentives for validator participation

## Pectra Upgrade

EIP-7005 completes the validator reward system in the Pectra upgrade, ensuring proper economic incentives for execution layer validators.`,
    discussions: 'https://ethereum-magicians.org/t/eip-7005-execution-layer-validator-rewards/19803'
  },
  {
    number: 7703,
    title: 'Set EOA account code for one transaction (Alternative)',
    author: ['Vitalik Buterin', 'Sam Wilson'],
    status: 'Draft',
    type: 'Standards Track',
    category: 'Core',
    created: '2024-05-07',
    updated: '2024-11-15',
    description: 'Alternative approach to EIP-7702 for setting EOA account code temporarily.',
    content: `## Abstract

This EIP provides an alternative approach to EIP-7702 for setting EOA account code temporarily. It offers a different mechanism for achieving similar functionality with potentially different trade-offs.

## Motivation

EIP-7702 represents one approach to temporary account code setting. This EIP explores an alternative implementation that may offer different benefits in terms of security, efficiency, or implementation complexity.

## Key Differences from EIP-7702

- Different authorization mechanism
- Alternative security model
- Potentially different gas costs
- Different implementation approach

## Pectra Upgrade

EIP-7703 is being considered as an alternative to EIP-7702 for the Pectra upgrade, providing the community with options for implementing temporary account code functionality.`,
    discussions: 'https://ethereum-magicians.org/t/eip-7703-alternative-eoa-account-code-setting/19770'
  },
  // Recent 2024 EIPs
  {
    number: 4844,
    title: 'Shard Blob Transactions',
    author: ['Vitalik Buterin', 'Dankrad Feist', 'Diederik Loerakker', 'George Kadianakis', 'Matt Garnett', 'Mofi Taiwo', 'Ansgar Dietrichs'],
    status: 'Final',
    type: 'Standards Track',
    category: 'Core',
    created: '2022-02-25',
    updated: '2024-03-13',
    description: 'Introduce a new transaction type for blob-carrying transactions which contain a large amount of data that cannot be accessed by EVM execution, but whose commitment can be accessed.',
    content: `## Abstract

This EIP introduces shard blob transactions, a new transaction type that carries blob data. Blobs are large (~125 kB) data chunks that are stored temporarily and are much cheaper than calldata, making them ideal for rollup data availability.

## Motivation

Layer 2 scaling solutions like optimistic rollups and zk-rollups need to post transaction data to Ethereum for data availability. Currently, this data is posted as expensive calldata. Blob transactions provide a cheaper alternative specifically designed for this use case.

## Key Features

- **Blob Data**: Up to 6 blobs per transaction, each ~125 kB
- **Temporary Storage**: Blobs are pruned after ~18 days
- **Cheaper Costs**: Significantly cheaper than calldata
- **KZG Commitments**: Cryptographic commitments to blob data
- **Separate Fee Market**: Independent pricing from regular gas

## Benefits for Rollups

- Reduced transaction costs for L2 users
- Increased throughput for rollup solutions
- Maintained data availability guarantees
- Smooth transition path for existing rollups

## Implementation Status

EIP-4844 was successfully activated in the Dencun upgrade on March 13, 2024, and is now live on Ethereum mainnet.`,
    discussions: 'https://ethereum-magicians.org/t/eip-7702-set-eoa-account-code-for-one-transaction/19769'
  },
  {
    number: 4844,
    title: 'Shard Blob Transactions',
    author: ['Vitalik Buterin', 'Dankrad Feist', 'Diederik Loerakker', 'George Kadianakis', 'Matt Garnett', 'Mofi Taiwo', 'Ansgar Dietrichs'],
    status: 'Final',
    type: 'Standards Track',
    category: 'Core',
    created: '2022-02-25',
    updated: '2024-03-13',
    description: 'Introduce a new transaction type for blob-carrying transactions which contain a large amount of data that cannot be accessed by EVM execution, but whose commitment can be accessed.',
    content: `## Abstract

This EIP introduces shard blob transactions, a new transaction type that carries blob data. Blobs are large (~125 kB) data chunks that are stored temporarily and are much cheaper than calldata, making them ideal for rollup data availability.

## Motivation

Layer 2 scaling solutions like optimistic rollups and zk-rollups need to post transaction data to Ethereum for data availability. Currently, this data is posted as expensive calldata. Blob transactions provide a cheaper alternative specifically designed for this use case.

## Key Features

- **Blob Data**: Up to 6 blobs per transaction, each ~125 kB
- **Temporary Storage**: Blobs are pruned after ~18 days
- **Cheaper Costs**: Significantly cheaper than calldata
- **KZG Commitments**: Cryptographic commitments to blob data
- **Separate Fee Market**: Independent pricing from regular gas

## Benefits for Rollups

- Reduced transaction costs for L2 users
- Increased throughput for rollup solutions
- Maintained data availability guarantees
- Smooth transition path for existing rollups

## Implementation Status

EIP-4844 was successfully activated in the Dencun upgrade on March 13, 2024, and is now live on Ethereum mainnet.`,
    discussions: 'https://ethereum-magicians.org/t/eip-4844-shard-blob-transactions/8430'
  },
  {
    number: 7212,
    title: 'Precompile for secp256r1 Curve Support',
    author: ['Ulaş Erdoğan', 'Doğan Alpaslan'],
    status: 'Final',
    type: 'Standards Track',
    category: 'Core',
    created: '2023-06-19',
    updated: '2024-03-13',
    description: 'Add precompiled contract for signature verifications in the "secp256r1" elliptic curve.',
    content: `## Abstract

This EIP proposes adding a precompiled contract to support signature verification for the secp256r1 elliptic curve (also known as P-256). This curve is widely used in traditional systems and enables better integration with existing infrastructure.

## Motivation

The secp256r1 curve is:
- NIST standard curve used in many systems
- Supported by hardware security modules (HSMs)
- Used in mobile device secure enclaves
- Required for WebAuthn/FIDO2 integration
- Enables better enterprise adoption

## Specification

A new precompiled contract at address 0x100 that:
- Takes signature and message hash as input
- Returns success/failure of verification
- Uses standard secp256r1 curve parameters
- Implements ECDSA signature verification

## Use Cases

- WebAuthn integration for web3 wallets
- Hardware wallet compatibility
- Enterprise system integration
- Mobile wallet security improvements
- Cross-chain compatibility with other networks

This precompile was activated in the Dencun upgrade and is now available on Ethereum mainnet.`,
    discussions: 'https://ethereum-magicians.org/t/eip-7212-precompile-for-secp256r1-curve-support/14789'
  },
  {
    number: 6963,
    title: 'Multi-Revocable NFTs',
    author: ['Zainan Victor Zhou', 'Zheng Yan'],
    status: 'Draft',
    type: 'Standards Track',
    category: 'ERC',
    created: '2023-04-27',
    updated: '2024-10-15',
    description: 'An extension to ERC-721 that allows multiple parties to revoke NFT ownership under predefined conditions.',
    content: `## Abstract

This EIP extends ERC-721 to support multi-party revocation mechanisms. Multiple authorized parties can revoke NFT ownership under predefined conditions, enabling use cases like compliance, dispute resolution, and conditional ownership.

## Motivation

Traditional NFTs have permanent ownership that cannot be revoked. However, many real-world use cases require revocation capabilities:

- Regulatory compliance requirements
- Dispute resolution mechanisms
- Conditional ownership agreements
- Anti-fraud measures
- Legal compliance in various jurisdictions

## Key Features

- **Multi-Party Revocation**: Multiple parties can be authorized to revoke
- **Condition-Based**: Revocation only under predefined conditions
- **Transparent Process**: All revocation attempts are logged
- **Appeal Mechanisms**: Built-in dispute resolution
- **Backward Compatibility**: Fully compatible with ERC-721

## Use Cases

- Real estate tokenization with legal compliance
- Academic credentials with institutional oversight
- Supply chain tracking with quality control
- Digital identity with regulatory compliance
- Gaming assets with anti-cheat mechanisms`,
    discussions: 'https://ethereum-magicians.org/t/eip-6963-multi-revocable-nfts/14087'
  },
  {
    number: 7677,
    title: 'Limited Transferability NFTs',
    author: ['Zainan Victor Zhou'],
    status: 'Draft',
    type: 'Standards Track',
    category: 'ERC',
    created: '2024-04-12',
    updated: '2024-09-20',
    description: 'An extension to ERC-721 that allows creators to limit the transferability of NFTs based on various conditions.',
    content: `## Abstract

This EIP introduces mechanisms to limit NFT transferability based on predefined conditions. Creators can set rules that restrict when, how, and to whom NFTs can be transferred, enabling new use cases while maintaining the core NFT functionality.

## Motivation

Many NFT use cases require transfer restrictions:
- Soulbound tokens for identity and achievements
- Time-locked transfers for vesting schedules
- Whitelist-only transfers for exclusive communities
- Geographic restrictions for compliance
- Conditional transfers based on external factors

## Transfer Restriction Types

1. **Time-based**: Transfers only allowed after specific dates
2. **Whitelist-based**: Transfers only to approved addresses
3. **Approval-based**: Transfers require third-party approval
4. **Condition-based**: Transfers based on external conditions
5. **Quantity-based**: Limited number of transfers allowed

## Implementation

The standard extends ERC-721 with:
- \`isTransferAllowed()\` function to check transfer eligibility
- \`getTransferRestrictions()\` to query current restrictions
- Events for restriction changes and transfer attempts
- Flexible restriction framework for various use cases

This enables creators to build more sophisticated NFT ecosystems while maintaining user ownership rights.`,
    discussions: 'https://ethereum-magicians.org/t/eip-7677-limited-transferability-nfts/19234'
  },
  {
    number: 7579,
    title: 'Minimal Modular Smart Accounts',
    author: ['Konrad Kopp', 'zeroknots'],
    status: 'Draft',
    type: 'Standards Track',
    category: 'ERC',
    created: '2024-01-17',
    updated: '2024-11-08',
    description: 'A standard for minimal modular smart accounts that enables composable account functionality through a plugin system.',
    content: `## Abstract

This EIP defines a standard for minimal modular smart accounts that support a plugin architecture. This enables composable account functionality where different modules can be added or removed to customize account behavior.

## Motivation

Current smart account implementations are monolithic and difficult to upgrade or customize. A modular approach enables:

- Composable functionality through plugins
- Easier upgrades and maintenance
- Standardized interfaces across implementations
- Reduced development complexity
- Better security through module isolation

## Key Components

### Core Account
- Minimal base functionality
- Module management system
- Execution routing
- Access control

### Module Types
1. **Validators**: Custom signature validation logic
2. **Executors**: Custom execution logic
3. **Hooks**: Pre/post execution hooks
4. **Fallback Handlers**: Custom fallback behavior

### Module Interface
- Standardized installation/uninstallation
- Metadata and capability declaration
- Inter-module communication
- Security boundaries

## Benefits

- **Modularity**: Add/remove functionality as needed
- **Standardization**: Common interfaces across accounts
- **Security**: Isolated module execution
- **Flexibility**: Support for various use cases
- **Upgradability**: Easy to add new features

This standard aims to become the foundation for next-generation smart accounts in the Ethereum ecosystem.`,
    discussions: 'https://ethereum-magicians.org/t/erc-7579-minimal-modular-smart-accounts/17749'
  },

  // Classic Important EIPs
  {
    number: 1559,
    title: 'Fee market change for ETH 1.0 chain',
    author: ['Vitalik Buterin', 'Eric Conner', 'Rick Dudley', 'Matthew Slipper', 'Ian Norden', 'Abdelhamid Bakhta'],
    status: 'Final',
    type: 'Standards Track',
    category: 'Core',
    created: '2019-04-13',
    updated: '2021-08-05',
    description: 'Introduces a base fee that is burned and a priority fee for miners, making gas fees more predictable.',
    content: `## Abstract

This EIP introduces a new fee market mechanism that includes a fixed-per-block network fee that is burned and dynamically expands/contracts block sizes to deal with transient congestion.

## Motivation

The current "first price auction" fee model in Ethereum has several issues:
- Mismatch between volatility of transaction fee levels and social cost of transactions
- Needless delays for users
- Inefficiencies of first price auctions
- Instability of blockchains with no block reward

## Specification

The proposal introduces:
- **Base Fee**: A network-wide base fee that is burned
- **Priority Fee**: A tip paid to miners
- **Dynamic Block Size**: Blocks can be up to 2x the target size
- **Base Fee Adjustment**: Increases/decreases based on block fullness

## Benefits

- More predictable transaction fees
- Reduced fee volatility
- Better user experience
- Deflationary pressure on ETH supply
- Improved fee estimation

EIP-1559 was successfully implemented in the London hard fork on August 5, 2021, and has significantly improved the Ethereum user experience.`,
    discussions: 'https://ethereum-magicians.org/t/eip-1559-fee-market-change-for-eth-1-0-chain/2783'
  },
  {
    number: 721,
    title: 'Non-Fungible Token Standard',
    author: ['William Entriken', 'Dieter Shirley', 'Jacob Evans', 'Nastassia Sachs'],
    status: 'Final',
    type: 'Standards Track',
    category: 'ERC',
    created: '2018-01-24',
    updated: '2018-06-21',
    description: 'A standard interface for non-fungible tokens, also known as deeds.',
    content: `## Abstract

A standard interface for non-fungible tokens (NFTs). This standard provides basic functionality to track and transfer NFTs, where each token is unique and not interchangeable.

## Motivation

NFTs represent ownership over digital or physical assets. A standard interface allows:
- Wallet/broker/auction applications to work with any NFT
- Simple management of multiple NFT types
- Efficient transfer mechanisms
- Clear ownership tracking

## Core Functions

- \`balanceOf(owner)\`: Count of tokens owned by an address
- \`ownerOf(tokenId)\`: Find the owner of an NFT
- \`transferFrom(from, to, tokenId)\`: Transfer ownership
- \`approve(to, tokenId)\`: Grant permission to transfer
- \`getApproved(tokenId)\`: Get approved address for a token

## Optional Extensions

- **Metadata**: Token name, description, and image
- **Enumerable**: Iterate over all tokens
- **Receiver**: Safe transfer to contracts

## Impact

ERC-721 has become the foundation for:
- Digital art and collectibles
- Gaming assets
- Domain names
- Real estate tokenization
- Identity and credentials
- Membership tokens

The standard has enabled a multi-billion dollar NFT ecosystem and continues to be the most widely adopted NFT standard.`,
    discussions: 'https://github.com/ethereum/eips/issues/721'
  },
  {
    number: 4337,
    title: 'Account Abstraction Using Alt Mempool',
    author: ['Vitalik Buterin', 'Yoav Weiss', 'Kristof Gazso', 'Namra Patel', 'Dror Tirosh', 'Shahaf Nacson', 'Tjaden Hess'],
    status: 'Draft',
    type: 'Standards Track',
    category: 'ERC',
    created: '2021-09-29',
    updated: '2024-08-15',
    description: 'An account abstraction proposal that completely avoids consensus-layer protocol changes, instead relying on higher-layer infrastructure.',
    content: `## Abstract

This proposal introduces account abstraction without requiring changes to the consensus layer. It defines a higher-layer pseudo-transaction object called a UserOperation, which users send to a separate mempool.

## Motivation

Account abstraction aims to allow users to use smart contract wallets containing arbitrary verification logic instead of EOAs as their primary account. Benefits include:

- **Multisig wallets**: Multiple signatures required for transactions
- **Social recovery**: Recover accounts using trusted contacts
- **Sponsored transactions**: Third parties can pay gas fees
- **Custom signature schemes**: Support for different cryptographic schemes
- **Batch transactions**: Execute multiple operations atomically
- **Session keys**: Temporary keys for specific applications

## Key Components

### UserOperation
A pseudo-transaction object that contains:
- Target contract and calldata
- Gas limits and fee parameters
- Signature and nonce
- Paymaster information (optional)

### EntryPoint Contract
A singleton contract that:
- Validates UserOperations
- Executes account operations
- Handles gas payments
- Manages paymaster interactions

### Bundlers
Off-chain actors that:
- Collect UserOperations from the mempool
- Bundle them into transactions
- Submit to the EntryPoint contract
- Earn fees for their service

### Paymasters
Optional contracts that:
- Sponsor gas fees for users
- Enable gasless transactions
- Support subscription models
- Allow payment in ERC-20 tokens

## Current Status

EIP-4337 is being actively implemented across the ecosystem with growing adoption from wallet providers and infrastructure teams.`,
    discussions: 'https://ethereum-magicians.org/t/erc-4337-account-abstraction-via-entry-point-contract-specification/7160'
  },
  {
    number: 20,
    title: 'Token Standard',
    author: ['Fabian Vogelsteller', 'Vitalik Buterin'],
    status: 'Final',
    type: 'Standards Track',
    category: 'ERC',
    created: '2015-11-19',
    updated: '2015-11-19',
    description: 'A standard interface for tokens on Ethereum.',
    content: `## Abstract

The following standard allows for the implementation of a standard API for tokens within smart contracts. This standard provides basic functionality to transfer tokens, as well as allow tokens to be approved so they can be spent by another on-chain third party.

## Motivation

A standard interface allows any tokens on Ethereum to be re-used by other applications: from wallets to decentralized exchanges.

## Core Functions

- \`totalSupply()\`: Returns the total token supply
- \`balanceOf(account)\`: Returns the account balance
- \`transfer(to, amount)\`: Moves tokens from caller to recipient
- \`allowance(owner, spender)\`: Returns remaining allowance
- \`approve(spender, amount)\`: Sets allowance for spender
- \`transferFrom(from, to, amount)\`: Moves tokens using allowance

## Events

- \`Transfer(from, to, value)\`: Emitted when tokens are transferred
- \`Approval(owner, spender, value)\`: Emitted when allowance is set

## Impact

ERC-20 has become the foundation of the token economy:
- Thousands of tokens implement this standard
- Enables decentralized exchanges
- Powers DeFi protocols
- Supports stablecoins and governance tokens
- Creates interoperability across applications

The standard's simplicity and effectiveness have made it one of the most successful Ethereum standards, enabling a multi-trillion dollar token ecosystem.`,
    discussions: 'https://github.com/ethereum/eips/issues/20'
  },
  {
    number: 1155,
    title: 'Multi Token Standard',
    author: ['Witek Radomski', 'Andrew Cooke', 'Philippe Castonguay', 'James Therien', 'Eric Binet', 'Ronan Sandford'],
    status: 'Final',
    type: 'Standards Track',
    category: 'ERC',
    created: '2018-06-17',
    updated: '2019-06-21',
    description: 'A standard interface for contracts that manage multiple token types.',
    content: `## Abstract

This standard outlines a smart contract interface that can represent any number of fungible and non-fungible token types. Existing standards such as ERC-20 require deployment of separate contracts per token type.

## Motivation

Tokens standards like ERC-20 and ERC-721 require a separate contract to be deployed for each token type or collection. This places a lot of redundant bytecode on the Ethereum blockchain and limits certain functionality by the nature of separating each token contract into its own permissioned address.

## Key Features

- **Multi-token support**: Single contract can manage multiple token types
- **Batch operations**: Transfer multiple tokens in one transaction
- **Fungible and non-fungible**: Supports both token types
- **Gas efficiency**: Reduced deployment and transaction costs
- **Atomic swaps**: Exchange multiple tokens atomically

## Core Functions

- \`balanceOf(account, id)\`: Get balance of specific token type
- \`balanceOfBatch(accounts, ids)\`: Get multiple balances efficiently
- \`safeTransferFrom(from, to, id, amount, data)\`: Transfer tokens safely
- \`safeBatchTransferFrom(from, to, ids, amounts, data)\`: Batch transfer
- \`setApprovalForAll(operator, approved)\`: Approve operator for all tokens

## Use Cases

- **Gaming**: Items, currencies, and collectibles in one contract
- **Digital art**: Collections with multiple pieces
- **DeFi**: Multiple token types in one protocol
- **Supply chain**: Different product types and quantities
- **Membership**: Various tiers and benefits

ERC-1155 has become popular in gaming and NFT projects due to its flexibility and efficiency.`,
    discussions: 'https://github.com/ethereum/eips/issues/1155'
  },
  {
    number: 2981,
    title: 'NFT Royalty Standard',
    author: ['Zach Burks', 'James Morgan', 'Blaine Malone', 'James Seibel'],
    status: 'Final',
    type: 'Standards Track',
    category: 'ERC',
    created: '2020-09-15',
    updated: '2021-01-21',
    description: 'A standardized way to retrieve royalty payment information for NFTs.',
    content: `## Abstract

This standard allows contracts, such as NFTs that support ERC-721 and ERC-1155 interfaces, to signal a royalty amount to be paid to the NFT creator or rights holder every time the NFT is sold or re-sold.

## Motivation

There are many marketplaces for NFTs with multiple unique royalty payment implementations that are not easily compatible or usable by other marketplaces. Just as ERC-721 standardized NFTs and allowed them to be compatible across platforms, this standard does the same for NFT royalties.

## Specification

The standard defines a single function:

\`\`\`solidity
function royaltyInfo(uint256 tokenId, uint256 salePrice) 
    external view returns (address receiver, uint256 royaltyAmount);
\`\`\`

This function:
- Takes a token ID and sale price as input
- Returns the royalty recipient and amount
- Allows different royalties per token
- Supports percentage-based calculations

## Benefits

- **Creator compensation**: Ensures creators earn from secondary sales
- **Marketplace compatibility**: Works across different platforms
- **Flexible implementation**: Supports various royalty models
- **Transparent royalties**: Clear royalty information for all parties
- **Reduced disputes**: Standardized royalty calculation

## Adoption

ERC-2981 has been widely adopted by:
- Major NFT marketplaces (OpenSea, Foundation, SuperRare)
- NFT creation platforms
- Artist and creator tools
- Gaming and metaverse projects

The standard has helped establish creator royalties as a fundamental part of the NFT ecosystem.`,
    discussions: 'https://github.com/ethereum/eips/issues/2981'
  },
  {
    number: 3074,
    title: 'AUTH and AUTHCODE opcodes',
    author: ['Vitalik Buterin', 'Martin Swende'],
    status: 'Final',
    type: 'Standards Track',
    category: 'Core',
    created: '2020-10-14',
    updated: '2021-04-15',
    description: 'Add AUTH and AUTHCODE opcodes for EIP-3074 invoker contracts.',
    content: `## Abstract

This EIP introduces two new opcodes, AUTH and AUTHCODE, that enable EIP-3074 invoker contracts to authenticate and execute transactions on behalf of externally owned accounts (EOAs).

## Motivation

EIP-3074 aims to bring account abstraction-like functionality to EOAs without requiring consensus changes. The AUTH and AUTHCODE opcodes are essential for this functionality.

## Specification

### AUTH Opcode
- Verifies a signature against an EOA
- Sets authentication context for the transaction
- Enables invoker contracts to act on behalf of EOAs

### AUTHCODE Opcode
- Returns the authenticated address
- Allows invoker contracts to verify authentication
- Provides security guarantees for delegated execution

## Benefits

- Enables account abstraction for EOAs
- Supports batch transactions
- Allows sponsored transactions
- Maintains backward compatibility
- No consensus layer changes required

EIP-3074 was included in the Prague upgrade and is now live on Ethereum mainnet.`,
    discussions: 'https://ethereum-magicians.org/t/eip-3074-auth-and-authcode-opcodes/4880'
  },
  {
    number: 5656,
    title: 'MCOPY - Memory copying instruction',
    author: ['Alex Beregszaszi', 'Paweł Bylica'],
    status: 'Final',
    type: 'Standards Track',
    category: 'Core',
    created: '2021-09-01',
    updated: '2024-03-13',
    description: 'Add a new instruction to copy memory areas.',
    content: `## Abstract

This EIP introduces the MCOPY instruction, which copies a memory area from one location to another. This provides a more efficient way to copy memory compared to using existing instructions.

## Motivation

Memory copying is a common operation in smart contracts, especially for:
- String manipulation
- Array operations
- Data serialization
- Buffer management

Currently, memory copying requires multiple MSTORE and MLOAD operations, which is inefficient.

## Specification

The MCOPY instruction:
- Takes three parameters: destination offset, source offset, and length
- Copies memory from source to destination
- Handles overlapping memory regions correctly
- Is more gas-efficient than equivalent MLOAD/MSTORE sequences

## Benefits

- Reduced gas costs for memory operations
- Better performance for data manipulation
- Cleaner contract code
- Improved developer experience

MCOPY was activated in the Dencun upgrade and is now available on Ethereum mainnet.`,
    discussions: 'https://ethereum-magicians.org/t/eip-5656-mcopy-memory-copying-instruction/10170'
  },
  {
    number: 6780,
    title: 'SELFDESTRUCT only in same transaction',
    author: ['Vitalik Buterin', 'Martin Swende'],
    status: 'Final',
    type: 'Standards Track',
    category: 'Core',
    created: '2022-11-10',
    updated: '2024-03-13',
    description: 'Change SELFDESTRUCT to only work in the same transaction as contract creation.',
    content: `## Abstract

This EIP changes the behavior of the SELFDESTRUCT opcode so that it only works when called in the same transaction as the contract was created.

## Motivation

The current SELFDESTRUCT behavior has several issues:
- State cleanup happens at the end of the transaction
- Can cause unexpected behavior in complex transactions
- Makes state management more complex
- Can lead to gas estimation issues

## Specification

SELFDESTRUCT will only work when:
- Called in the same transaction as contract creation
- The contract is being created via CREATE or CREATE2
- The opcode is called before the transaction ends

## Benefits

- Simpler state management
- More predictable behavior
- Better gas estimation
- Reduced complexity in transaction processing
- Maintains security guarantees

This change was implemented in the Dencun upgrade to improve the overall Ethereum experience.`,
    discussions: 'https://ethereum-magicians.org/t/eip-6780-selfdestruct-only-in-same-transaction/14107'
  },
  {
    number: 1153,
    title: 'Transient Storage Opcodes',
    author: ['Vitalik Buterin', 'Alexey Akhunov', 'Martin Swende'],
    status: 'Final',
    type: 'Standards Track',
    category: 'Core',
    created: '2018-06-15',
    updated: '2024-03-13',
    description: 'Add TSTORE and TLOAD opcodes for transient storage.',
    content: `## Abstract

This EIP introduces two new opcodes, TSTORE and TLOAD, for transient storage. Transient storage is similar to regular storage but is automatically cleared at the end of each transaction.

## Motivation

Transient storage is useful for:
- Reentrancy locks
- Temporary state during complex transactions
- Cross-contract communication within a transaction
- Avoiding storage pollution

## Specification

### TSTORE Opcode
- Stores a value in transient storage
- Key and value are 32-byte words
- Automatically cleared at transaction end

### TLOAD Opcode
- Loads a value from transient storage
- Returns 0 if key doesn't exist
- Gas cost similar to SLOAD

## Benefits

- Automatic cleanup prevents storage bloat
- Useful for reentrancy protection
- Enables better cross-contract communication
- Maintains transaction atomicity
- Gas-efficient temporary storage

TSTORE and TLOAD were activated in the Cancun upgrade and are now available on Ethereum mainnet.`,
    discussions: 'https://ethereum-magicians.org/t/eip-1153-transient-storage-opcodes/2616'
  },
  {
    number: 2537,
    title: 'Precompile for BLS12-381 curve operations',
    author: ['Vitalik Buterin', 'Dankrad Feist', 'Diederik Loerakker', 'Alex Vlasov'],
    status: 'Final',
    type: 'Standards Track',
    category: 'Core',
    created: '2020-02-22',
    updated: '2021-12-14',
    description: 'Add precompiled contracts for BLS12-381 curve operations.',
    content: `## Abstract

This EIP introduces precompiled contracts for BLS12-381 curve operations, enabling efficient implementation of BLS signature verification and other cryptographic operations.

## Motivation

BLS signatures are important for:
- Ethereum 2.0 consensus
- Scalable signature schemes
- Threshold cryptography
- Zero-knowledge proofs
- Cross-chain communication

## Specification

Three precompiled contracts are added:

### 0x0f - BLS12_G1ADD
- Point addition on G1
- Input: 128 bytes (two G1 points)
- Output: 128 bytes (sum of points)

### 0x10 - BLS12_G1MUL
- Scalar multiplication on G1
- Input: 160 bytes (G1 point + scalar)
- Output: 128 bytes (resulting point)

### 0x11 - BLS12_PAIRING
- Bilinear pairing check
- Input: 384 bytes (G1 and G2 points)
- Output: 32 bytes (1 if pairing is valid, 0 otherwise)

## Benefits

- Enables BLS signature verification
- Supports Ethereum 2.0 infrastructure
- Enables advanced cryptographic protocols
- Gas-efficient curve operations
- Foundation for future scaling solutions

BLS12-381 precompiles were activated in the Berlin upgrade and are essential for Ethereum 2.0.`,
    discussions: 'https://ethereum-magicians.org/t/eip-2537-precompile-for-bls12-381-curve-operations/3978'
  },
  {
    number: 2930,
    title: 'Optional access lists',
    author: ['Vitalik Buterin', 'Martin Swende'],
    status: 'Final',
    type: 'Standards Track',
    category: 'Core',
    created: '2020-09-04',
    updated: '2021-04-15',
    description: 'Add optional access lists to transactions.',
    content: `## Abstract

This EIP introduces optional access lists to transactions, allowing users to specify which accounts and storage slots will be accessed during transaction execution.

## Motivation

Access lists help with:
- Gas estimation accuracy
- Transaction fee optimization
- Better user experience
- Reduced failed transactions
- More predictable gas costs

## Specification

Transactions can include an optional access list that specifies:
- Account addresses that will be accessed
- Storage slots that will be accessed
- Pre-warming of accessed accounts and slots

## Benefits

- More accurate gas estimation
- Reduced transaction failures
- Better fee optimization
- Improved user experience
- Foundation for EIP-1559

Access lists were introduced in the Berlin upgrade and are now widely used for better gas estimation.`,
    discussions: 'https://ethereum-magicians.org/t/eip-2930-optional-access-lists/4563'
  },
  {
    number: 3198,
    title: 'BASEFEE opcode',
    author: ['Vitalik Buterin', 'Rick Dudley', 'Matthew Slipper', 'Ian Norden', 'Abdelhamid Bakhta'],
    status: 'Final',
    type: 'Standards Track',
    category: 'Core',
    created: '2021-01-13',
    updated: '2021-08-05',
    description: 'Add BASEFEE opcode to return the base fee of the current block.',
    content: `## Abstract

This EIP introduces the BASEFEE opcode, which returns the base fee of the current block. This is essential for EIP-1559 fee market functionality.

## Motivation

The BASEFEE opcode is needed for:
- EIP-1559 fee market implementation
- Gas price calculations
- Fee estimation algorithms
- Smart contract fee logic
- User experience improvements

## Specification

The BASEFEE opcode:
- Returns the base fee of the current block
- Returns a 32-byte value
- Gas cost: 2
- Always available in blocks with EIP-1559

## Benefits

- Enables EIP-1559 functionality
- Supports dynamic fee calculations
- Improves gas estimation
- Better user experience
- Foundation for fee market improvements

BASEFEE was activated in the London upgrade alongside EIP-1559 and is now a core part of Ethereum's fee mechanism.`,
    discussions: 'https://ethereum-magicians.org/t/eip-3198-basefee-opcode/5055'
  },
  {
    number: 3529,
    title: 'Reduction in refunds',
    author: ['Vitalik Buterin', 'Martin Swende'],
    status: 'Final',
    type: 'Standards Track',
    category: 'Core',
    created: '2021-04-22',
    updated: '2021-08-05',
    description: 'Reduces gas refunds for SELFDESTRUCT and SSTORE operations.',
    content: `## Abstract

This EIP reduces the gas refunds for SELFDESTRUCT and SSTORE operations to prevent gas price manipulation and improve network security.

## Motivation

High gas refunds can be exploited to:
- Manipulate gas prices
- Create economic attacks
- Reduce network security
- Cause unpredictable behavior
- Enable spam attacks

## Specification

Gas refunds are reduced:
- SELFDESTRUCT: 24,000 → 0 gas refund
- SSTORE: 15,000 → 4,800 gas refund (when clearing storage)
- SSTORE: 5,000 → 2,100 gas refund (when resetting to non-zero)

## Benefits

- Prevents gas price manipulation
- Improves network security
- Reduces economic attacks
- More predictable gas costs
- Better long-term sustainability

This change was implemented in the London upgrade to improve Ethereum's economic security.`,
    discussions: 'https://ethereum-magicians.org/t/eip-3529-reduction-in-refunds/6108'
  },
  {
    number: 3541,
    title: 'Reject transactions starting with the 0xEF byte',
    author: ['Vitalik Buterin', 'Martin Swende'],
    status: 'Final',
    type: 'Standards Track',
    category: 'Core',
    created: '2021-04-13',
    updated: '2021-08-05',
    description: 'Reject transactions that start with the 0xEF byte to prevent confusion with EIP-3541 contracts.',
    content: `## Abstract

This EIP rejects transactions that start with the 0xEF byte to prevent confusion with EIP-3541 contracts and improve network security.

## Motivation

EIP-3541 reserves the 0xEF byte for contract deployment. Allowing transactions to start with this byte could cause:
- Confusion between transactions and contracts
- Potential security issues
- Unclear transaction semantics
- Network inconsistencies

## Specification

Transactions starting with the 0xEF byte are rejected with an invalid transaction error.

## Benefits

- Prevents confusion with EIP-3541 contracts
- Improves network security
- Clear separation between transactions and contracts
- Better error handling
- Consistent network behavior

This change was implemented in the London upgrade to support EIP-3541 contract format.`,
    discussions: 'https://ethereum-magicians.org/t/eip-3541-reject-transactions-starting-with-0xef/6109'
  },
  {
    number: 3675,
    title: 'Upgrade CREATE2',
    author: ['Vitalik Buterin', 'Martin Swende'],
    status: 'Final',
    type: 'Standards Track',
    category: 'Core',
    created: '2021-06-18',
    updated: '2021-08-05',
    description: 'Upgrade CREATE2 to support EIP-3541 contract format.',
    content: `## Abstract

This EIP upgrades the CREATE2 opcode to support the new contract format introduced in EIP-3541, ensuring compatibility with the new contract header.

## Motivation

EIP-3541 introduces a new contract format with a header. CREATE2 needs to be updated to:
- Support the new format
- Maintain backward compatibility
- Ensure proper contract deployment
- Support future contract features

## Specification

CREATE2 is updated to:
- Handle the new contract format
- Validate contract headers
- Support EIP-3541 features
- Maintain existing functionality

## Benefits

- Supports new contract format
- Maintains backward compatibility
- Enables future contract features
- Better contract validation
- Improved deployment process

This upgrade was implemented in the London upgrade alongside EIP-3541.`,
    discussions: 'https://ethereum-magicians.org/t/eip-3675-upgrade-create2/6107'
  },
  {
    number: 7623,
    title: 'Calldata gas cost reduction',
    author: ['Vitalik Buterin', 'Ansgar Dietrichs'],
    status: 'Draft',
    type: 'Standards Track',
    category: 'Core',
    created: '2024-08-15',
    updated: '2024-11-20',
    description: 'Reduce calldata gas costs to improve data availability and reduce transaction costs.',
    content: `## Abstract

This EIP proposes reducing the gas cost of calldata to make data availability more affordable and improve the overall user experience on Ethereum.

## Motivation

Current calldata costs are relatively high, which affects:
- Data availability for rollups
- Transaction costs for users
- Adoption of data-heavy applications
- Cross-chain communication costs

## Specification

The proposal reduces calldata gas costs from:
- Current: 16 gas per non-zero byte, 4 gas per zero byte
- Proposed: 8 gas per non-zero byte, 2 gas per zero byte

## Benefits

- Reduced transaction costs
- Better data availability
- Improved rollup economics
- Enhanced user experience
- Support for data-heavy applications

This change would make Ethereum more cost-effective for applications requiring significant data transmission.`,
    discussions: 'https://ethereum-magicians.org/t/eip-7623-calldata-gas-cost-reduction/19845'
  },
  {
    number: 7703,
    title: 'Set EOA account code for one transaction (Alternative)',
    author: ['Vitalik Buterin', 'Sam Wilson'],
    status: 'Draft',
    type: 'Standards Track',
    category: 'Core',
    created: '2024-06-20',
    updated: '2024-12-01',
    description: 'Alternative approach to EIP-7702 for setting EOA account code temporarily.',
    content: `## Abstract

This EIP provides an alternative implementation to EIP-7702, offering a different approach to allowing EOAs to temporarily set account code during transaction execution.

## Motivation

While EIP-7702 provides one approach to account abstraction, this EIP explores an alternative method that:
- Uses different authorization mechanisms
- Provides alternative security guarantees
- Offers different trade-offs in implementation
- Enables different use cases

## Specification

The alternative approach:
- Uses different signature schemes
- Implements different authorization flows
- Provides alternative security models
- Enables different account abstraction patterns

## Benefits

- Alternative implementation path
- Different security trade-offs
- Enables different use cases
- Provides implementation flexibility
- Supports various account abstraction approaches

This EIP is being developed as an alternative to EIP-7702 to provide more options for account abstraction implementation.`,
    discussions: 'https://ethereum-magicians.org/t/eip-7703-alternative-eoa-code-setting/19850'
  },
  {
    number: 7685,
    title: 'General execution layer requests',
    author: ['Vitalik Buterin', 'Dankrad Feist'],
    status: 'Draft',
    type: 'Standards Track',
    category: 'Core',
    created: '2024-09-10',
    updated: '2024-12-15',
    description: 'Enable execution layer to request data from consensus layer.',
    content: `## Abstract

This EIP introduces a mechanism for the execution layer to request data from the consensus layer, enabling better integration between the two layers.

## Motivation

Current Ethereum architecture has limited communication between execution and consensus layers. This EIP enables:
- Better data sharing between layers
- Improved protocol coordination
- Enhanced security mechanisms
- Better user experience
- More efficient operations

## Specification

The proposal introduces:
- Request mechanisms from execution to consensus layer
- Data response protocols
- Security and validation mechanisms
- Error handling procedures

## Benefits

- Better layer integration
- Improved protocol coordination
- Enhanced security features
- Better user experience
- More efficient operations

This EIP is part of the broader effort to improve Ethereum's architecture and layer coordination.`,
    discussions: 'https://ethereum-magicians.org/t/eip-7685-general-execution-layer-requests/19855'
  },
  {
    number: 7688,
    title: 'Cross-rollup transaction format',
    author: ['Vitalik Buterin', 'Dankrad Feist', 'Diederik Loerakker'],
    status: 'Draft',
    type: 'Standards Track',
    category: 'Core',
    created: '2024-10-05',
    updated: '2024-12-10',
    description: 'Standardize transaction format for cross-rollup operations.',
    content: `## Abstract

This EIP defines a standardized transaction format for cross-rollup operations, enabling seamless interaction between different rollup solutions.

## Motivation

As the rollup ecosystem grows, there's a need for:
- Standardized cross-rollup communication
- Interoperability between different rollups
- Better user experience across rollups
- Reduced complexity for developers
- Enhanced security for cross-rollup operations

## Specification

The standard defines:
- Common transaction format
- Cross-rollup communication protocols
- Security and validation mechanisms
- Error handling procedures
- Metadata standards

## Benefits

- Improved rollup interoperability
- Better user experience
- Reduced development complexity
- Enhanced security
- Standardized communication

This EIP is essential for the future of the multi-rollup Ethereum ecosystem.`,
    discussions: 'https://ethereum-magicians.org/t/eip-7688-cross-rollup-transaction-format/19860'
  },
  {
    number: 7692,
    title: 'PeerDAS - Peer-to-peer data availability sampling',
    author: ['Vitalik Buterin', 'Dankrad Feist', 'Diederik Loerakker'],
    status: 'Draft',
    type: 'Standards Track',
    category: 'Core',
    created: '2024-11-01',
    updated: '2024-12-20',
    description: 'Implement peer-to-peer data availability sampling for improved scalability.',
    content: `## Abstract

This EIP implements peer-to-peer data availability sampling (PeerDAS) to improve Ethereum's scalability and data availability guarantees.

## Motivation

Data availability is crucial for:
- Rollup security
- State transition validation
- Network scalability
- User experience
- Protocol security

## Specification

PeerDAS introduces:
- Peer-to-peer sampling protocols
- Data availability verification
- Network coordination mechanisms
- Security guarantees
- Performance optimizations

## Benefits

- Improved scalability
- Better data availability
- Enhanced security
- Reduced costs
- Better user experience

This EIP is part of Ethereum's long-term scaling roadmap and will significantly improve the network's capacity.`,
    discussions: 'https://ethereum-magicians.org/t/eip-7692-peerdas-peer-to-peer-data-availability-sampling/19865'
  },
  {
    number: 7730,
    title: 'Ethereum execution layer specification',
    author: ['Vitalik Buterin', 'Dankrad Feist', 'Diederik Loerakker'],
    status: 'Draft',
    type: 'Standards Track',
    category: 'Core',
    created: '2024-12-01',
    updated: '2024-12-25',
    description: 'Formal specification for the Ethereum execution layer.',
    content: `## Abstract

This EIP provides a formal specification for the Ethereum execution layer, defining the precise behavior and requirements for execution layer implementations.

## Motivation

A formal specification is needed for:
- Implementation consistency
- Security verification
- Protocol clarity
- Developer guidance
- Testing and validation

## Specification

The specification covers:
- Execution layer architecture
- State transition rules
- Transaction processing
- Gas calculation
- Error handling
- Security requirements

## Benefits

- Implementation consistency
- Better security
- Clearer protocol definition
- Improved developer experience
- Enhanced testing capabilities

This EIP provides the foundation for consistent and secure execution layer implementations.`,
    discussions: 'https://ethereum-magicians.org/t/eip-7730-ethereum-execution-layer-specification/19870'
  },
  {
    number: 7002,
    title: 'Execution layer validator registration',
    author: ['Vitalik Buterin', 'Dankrad Feist'],
    status: 'Draft',
    type: 'Standards Track',
    category: 'Core',
    created: '2024-07-15',
    updated: '2024-11-30',
    description: 'Enable execution layer validators to register with the consensus layer.',
    content: `## Abstract

This EIP enables execution layer validators to register with the consensus layer, improving coordination between the two layers.

## Motivation

Better coordination between execution and consensus layers is needed for:
- Improved security
- Better performance
- Enhanced user experience
- Protocol efficiency
- Network stability

## Specification

The proposal defines:
- Validator registration mechanisms
- Communication protocols
- Security requirements
- Validation procedures
- Error handling

## Benefits

- Better layer coordination
- Improved security
- Enhanced performance
- Better user experience
- Protocol efficiency

This EIP is part of the effort to improve Ethereum's overall architecture and performance.`,
    discussions: 'https://ethereum-magicians.org/t/eip-7002-execution-layer-validator-registration/19875'
  },
  {
    number: 7003,
    title: 'Execution layer validator exit',
    author: ['Vitalik Buterin', 'Dankrad Feist'],
    status: 'Draft',
    type: 'Standards Track',
    category: 'Core',
    created: '2024-07-20',
    updated: '2024-12-05',
    description: 'Enable execution layer validators to exit gracefully from the consensus layer.',
    content: `## Abstract

This EIP defines the process for execution layer validators to exit gracefully from the consensus layer, ensuring proper cleanup and security.

## Motivation

Validator exit procedures are important for:
- Network security
- Proper resource cleanup
- Validator lifecycle management
- Protocol stability
- User protection

## Specification

The exit process includes:
- Exit request mechanisms
- Validation procedures
- Security checks
- Cleanup processes
- Finalization steps

## Benefits

- Improved security
- Better resource management
- Proper validator lifecycle
- Enhanced protocol stability
- Better user protection

This EIP complements EIP-7002 by providing a complete validator lifecycle management system.`,
    discussions: 'https://ethereum-magicians.org/t/eip-7003-execution-layer-validator-exit/19880'
  },
  {
    number: 7004,
    title: 'Execution layer validator slashing',
    author: ['Vitalik Buterin', 'Dankrad Feist'],
    status: 'Draft',
    type: 'Standards Track',
    category: 'Core',
    created: '2024-08-01',
    updated: '2024-12-12',
    description: 'Define slashing mechanisms for execution layer validators.',
    content: `## Abstract

This EIP defines slashing mechanisms for execution layer validators who violate protocol rules or behave maliciously.

## Motivation

Slashing mechanisms are essential for:
- Network security
- Protocol enforcement
- Validator accountability
- User protection
- Economic security

## Specification

The slashing system includes:
- Violation detection
- Slashing procedures
- Penalty calculations
- Appeal mechanisms
- Recovery processes

## Benefits

- Enhanced network security
- Better protocol enforcement
- Improved validator accountability
- Better user protection
- Stronger economic security

This EIP provides the security mechanisms needed for a robust validator system.`,
    discussions: 'https://ethereum-magicians.org/t/eip-7004-execution-layer-validator-slashing/19885'
  },
  {
    number: 7005,
    title: 'Execution layer validator rewards',
    author: ['Vitalik Buterin', 'Dankrad Feist'],
    status: 'Draft',
    type: 'Standards Track',
    category: 'Core',
    created: '2024-08-10',
    updated: '2024-12-18',
    description: 'Define reward mechanisms for execution layer validators.',
    content: `## Abstract

This EIP defines reward mechanisms for execution layer validators who participate in network consensus and validation.

## Motivation

Proper reward mechanisms are needed for:
- Validator incentives
- Network participation
- Economic security
- Protocol sustainability
- User experience

## Specification

The reward system includes:
- Reward calculation methods
- Distribution mechanisms
- Performance metrics
- Economic parameters
- Validation procedures

## Benefits

- Better validator incentives
- Improved network participation
- Enhanced economic security
- Protocol sustainability
- Better user experience

This EIP completes the validator economic system by providing proper incentives for participation.`,
    discussions: 'https://ethereum-magicians.org/t/eip-7005-execution-layer-validator-rewards/19890'
  }
];

export const mockProjects: Project[] = [
  {
    id: 'metamask',
    name: 'MetaMask',
    description: 'Leading Web3 wallet with comprehensive EIP support including EIP-1559, EIP-4337, EIP-7702, and EIP-3074.',
    logo: 'https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    website: 'https://metamask.io',
    github: 'https://github.com/MetaMask',
    eipNumbers: [1559, 4337, 7702, 3074, 2930, 3198],
    implementationDetails: 'Full EIP-1559 integration with advanced fee estimation, EIP-4337 account abstraction support, EIP-7702 implementation for enhanced EOA functionality, and EIP-3074 invoker support.',
    status: 'Active'
  },
  {
    id: 'opensea',
    name: 'OpenSea',
    description: 'World\'s largest NFT marketplace supporting ERC-721, ERC-1155, EIP-2981, and EIP-6963 standards.',
    logo: 'https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    website: 'https://opensea.io',
    github: 'https://github.com/ProjectOpenSea',
    eipNumbers: [721, 1155, 2981, 6963, 7677],
    implementationDetails: 'Comprehensive NFT marketplace with full ERC-721/1155 support, EIP-2981 royalty enforcement, EIP-6963 multi-revocable NFT support, and EIP-7677 transfer restrictions.',
    status: 'Active'
  },
  {
    id: 'uniswap',
    name: 'Uniswap',
    description: 'Leading DEX protocol built on ERC-20 token standard with EIP-1559 and EIP-2930 support.',
    logo: 'https://images.pexels.com/photos/7567526/pexels-photo-7567526.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    website: 'https://uniswap.org',
    github: 'https://github.com/Uniswap',
    eipNumbers: [20, 1559, 2930, 3198, 3529],
    implementationDetails: 'Core DEX infrastructure supporting all ERC-20 tokens with EIP-1559 fee optimization, EIP-2930 access lists for better gas estimation, and EIP-3529 refund optimizations.',
    status: 'Active'
  },
  {
    id: 'argent',
    name: 'Argent',
    description: 'Smart contract wallet implementing EIP-4337, EIP-7579, and EIP-1153 for advanced functionality.',
    logo: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    website: 'https://argent.xyz',
    github: 'https://github.com/argentlabs',
    eipNumbers: [4337, 7579, 1153, 1559],
    implementationDetails: 'Native EIP-4337 implementation with EIP-7579 modular smart account architecture, EIP-1153 transient storage for reentrancy protection, and social recovery.',
    status: 'Active'
  },
  {
    id: 'base-rollup',
    name: 'Base',
    description: 'Coinbase\'s L2 rollup utilizing EIP-4844, EIP-5656, and EIP-6780 for optimized performance.',
    website: 'https://base.org',
    github: 'https://github.com/base-org',
    eipNumbers: [4844, 5656, 6780, 1153],
    implementationDetails: 'Layer 2 optimistic rollup leveraging EIP-4844 blob transactions, EIP-5656 MCOPY for efficient memory operations, and EIP-6780 SELFDESTRUCT optimizations.',
    status: 'Active'
  },
  {
    id: 'arbitrum',
    name: 'Arbitrum',
    description: 'Leading L2 scaling solution implementing EIP-4844, EIP-1153, and EIP-5656 for enhanced performance.',
    website: 'https://arbitrum.io',
    github: 'https://github.com/OffchainLabs',
    eipNumbers: [4844, 1153, 5656, 6780],
    implementationDetails: 'Optimistic rollup with EIP-4844 blob transaction support, EIP-1153 transient storage for gas optimization, and EIP-5656 memory copying for better performance.',
    status: 'Active'
  },
  {
    id: 'polygon',
    name: 'Polygon',
    description: 'Multi-chain scaling platform with comprehensive EIP support including EIP-4844 and EIP-1153.',
    website: 'https://polygon.technology',
    github: 'https://github.com/maticnetwork',
    eipNumbers: [4844, 1153, 5656, 1559, 2930],
    implementationDetails: 'Multi-chain scaling solution with EIP-4844 blob transaction support, EIP-1153 transient storage optimization, and EIP-5656 memory operations for improved performance.',
    status: 'Active'
  },
  {
    id: 'optimism',
    name: 'Optimism',
    description: 'Optimistic rollup implementing EIP-4844, EIP-1153, and EIP-5656 for reduced costs and better performance.',
    website: 'https://optimism.io',
    github: 'https://github.com/ethereum-optimism',
    eipNumbers: [4844, 1153, 5656, 6780, 1559],
    implementationDetails: 'Optimistic rollup with EIP-4844 blob transactions for reduced data costs, EIP-1153 transient storage for gas optimization, and EIP-5656 memory copying for better efficiency.',
    status: 'Active'
  },
  {
    id: 'rainbow-wallet',
    name: 'Rainbow',
    description: 'Mobile-first Web3 wallet with EIP-4337, EIP-1559, and EIP-3074 support for enhanced user experience.',
    website: 'https://rainbow.me',
    github: 'https://github.com/rainbow-me',
    eipNumbers: [4337, 1559, 3074, 2930, 3198],
    implementationDetails: 'Mobile-first wallet with EIP-4337 account abstraction, EIP-1559 fee optimization, EIP-3074 invoker support, and advanced transaction features.',
    status: 'Active'
  },
  {
    id: 'coinbase-wallet',
    name: 'Coinbase Wallet',
    description: 'Coinbase\'s self-custody wallet with EIP-4337, EIP-1559, and EIP-7212 secp256r1 support.',
    website: 'https://wallet.coinbase.com',
    github: 'https://github.com/coinbase',
    eipNumbers: [4337, 1559, 7212, 2930, 3198],
    implementationDetails: 'Self-custody wallet with EIP-4337 account abstraction, EIP-1559 fee optimization, EIP-7212 secp256r1 curve support for WebAuthn integration, and advanced security features.',
    status: 'Active'
  },
  {
    id: 'zerion',
    name: 'Zerion',
    description: 'DeFi portfolio manager with comprehensive EIP support including EIP-1559, EIP-4337, and EIP-1155.',
    website: 'https://zerion.io',
    github: 'https://github.com/zeriontech',
    eipNumbers: [1559, 4337, 1155, 721, 2981, 2930],
    implementationDetails: 'DeFi portfolio manager with EIP-1559 fee optimization, EIP-4337 account abstraction, EIP-1155 multi-token support, and comprehensive NFT management.',
    status: 'Active'
  },
  {
    id: 'gnosis-safe',
    name: 'Gnosis Safe',
    description: 'Multi-signature wallet with EIP-4337, EIP-7579, and EIP-1153 for advanced smart account functionality.',
    website: 'https://safe.global',
    github: 'https://github.com/safe-global',
    eipNumbers: [4337, 7579, 1153, 1559, 2930],
    implementationDetails: 'Multi-signature wallet with EIP-4337 account abstraction, EIP-7579 modular smart account architecture, EIP-1153 transient storage, and advanced security features.',
    status: 'Active'
  },
  {
    id: 'starknet',
    name: 'Starknet',
    description: 'Zero-knowledge rollup implementing EIP-4844, EIP-1153, and EIP-5656 for enhanced performance.',
    website: 'https://starknet.io',
    github: 'https://github.com/starkware-libs',
    eipNumbers: [4844, 1153, 5656, 6780, 1559],
    implementationDetails: 'ZK-rollup with EIP-4844 blob transaction support, EIP-1153 transient storage optimization, EIP-5656 memory operations, and advanced zero-knowledge proofs.',
    status: 'Active'
  },
  {
    id: 'linea',
    name: 'Linea',
    description: 'ConsenSys zkEVM rollup with comprehensive EIP support including EIP-4844 and EIP-1153.',
    website: 'https://linea.build',
    github: 'https://github.com/ConsenSys',
    eipNumbers: [4844, 1153, 5656, 6780, 1559, 2930],
    implementationDetails: 'zkEVM rollup with EIP-4844 blob transactions, EIP-1153 transient storage, EIP-5656 memory copying, and full EVM compatibility.',
    status: 'Active'
  },
  {
    id: 'scroll',
    name: 'Scroll',
    description: 'zkEVM rollup implementing EIP-4844, EIP-1153, and EIP-5656 for optimal performance.',
    website: 'https://scroll.io',
    github: 'https://github.com/scroll-tech',
    eipNumbers: [4844, 1153, 5656, 6780, 1559],
    implementationDetails: 'zkEVM rollup with EIP-4844 blob transaction support, EIP-1153 transient storage, EIP-5656 memory operations, and native EVM compatibility.',
    status: 'Active'
  },
  {
    id: 'taiko',
    name: 'Taiko',
    description: 'Type-1 zkEVM implementing EIP-4844, EIP-1153, and EIP-5656 for maximum compatibility.',
    website: 'https://taiko.xyz',
    github: 'https://github.com/taikoxyz',
    eipNumbers: [4844, 1153, 5656, 6780, 1559, 2930],
    implementationDetails: 'Type-1 zkEVM with EIP-4844 blob transactions, EIP-1153 transient storage, EIP-5656 memory copying, and full Ethereum compatibility.',
    status: 'Active'
  },
  {
    id: 'polygon-zk',
    name: 'Polygon zkEVM',
    description: 'Zero-knowledge EVM with EIP-4844, EIP-1153, and EIP-5656 support.',
    website: 'https://polygon.technology/polygon-zkevm',
    github: 'https://github.com/0xPolygonHermez',
    eipNumbers: [4844, 1153, 5656, 6780, 1559],
    implementationDetails: 'zkEVM with EIP-4844 blob transaction support, EIP-1153 transient storage optimization, EIP-5656 memory operations, and advanced zero-knowledge proofs.',
    status: 'Active'
  },
  {
    id: 'mantle',
    name: 'Mantle',
    description: 'Modular L2 with EIP-4844, EIP-1153, and EIP-5656 implementation.',
    website: 'https://mantle.xyz',
    github: 'https://github.com/mantlenetworkio',
    eipNumbers: [4844, 1153, 5656, 6780, 1559, 2930],
    implementationDetails: 'Modular L2 with EIP-4844 blob transactions, EIP-1153 transient storage, EIP-5656 memory copying, and innovative modular architecture.',
    status: 'Active'
  },
  {
    id: 'blast',
    name: 'Blast',
    description: 'Native yield L2 with EIP-4844, EIP-1153, and EIP-5656 support.',
    website: 'https://blast.io',
    github: 'https://github.com/blast-io',
    eipNumbers: [4844, 1153, 5656, 6780, 1559],
    implementationDetails: 'Native yield L2 with EIP-4844 blob transaction support, EIP-1153 transient storage, EIP-5656 memory operations, and built-in yield mechanisms.',
    status: 'Active'
  },
  {
    id: 'mode',
    name: 'Mode',
    description: 'Modular L2 with EIP-4844, EIP-1153, and EIP-5656 implementation.',
    website: 'https://mode.network',
    github: 'https://github.com/mode-network',
    eipNumbers: [4844, 1153, 5656, 6780, 1559, 2930],
    implementationDetails: 'Modular L2 with EIP-4844 blob transactions, EIP-1153 transient storage, EIP-5656 memory copying, and innovative modular design.',
    status: 'Active'
  },
  {
    id: 'frax',
    name: 'Frax',
    description: 'DeFi protocol with comprehensive EIP support including EIP-1559, EIP-4337, and EIP-1155.',
    website: 'https://frax.finance',
    github: 'https://github.com/FraxFinance',
    eipNumbers: [1559, 4337, 1155, 721, 2981, 2930],
    implementationDetails: 'DeFi protocol with EIP-1559 fee optimization, EIP-4337 account abstraction, EIP-1155 multi-token support, and comprehensive DeFi features.',
    status: 'Active'
  },
  {
    id: 'aave',
    name: 'Aave',
    description: 'DeFi lending protocol with EIP-1559, EIP-4337, and EIP-1155 support.',
    website: 'https://aave.com',
    github: 'https://github.com/aave',
    eipNumbers: [1559, 4337, 1155, 721, 2981, 2930],
    implementationDetails: 'DeFi lending protocol with EIP-1559 fee optimization, EIP-4337 account abstraction, EIP-1155 multi-token support, and advanced lending features.',
    status: 'Active'
  },
  {
    id: 'compound',
    name: 'Compound',
    description: 'DeFi lending protocol with EIP-1559, EIP-4337, and EIP-1155 implementation.',
    website: 'https://compound.finance',
    github: 'https://github.com/compound-finance',
    eipNumbers: [1559, 4337, 1155, 721, 2981, 2930],
    implementationDetails: 'DeFi lending protocol with EIP-1559 fee optimization, EIP-4337 account abstraction, EIP-1155 multi-token support, and algorithmic interest rates.',
    status: 'Active'
  }
];

export const mockDiscussions: Discussion[] = [
  {
    id: 'disc-1',
    eipNumber: 1559,
    author: 'Alice Developer',
    content: 'The implementation of EIP-1559 has been fantastic for user experience. Fee predictability has improved significantly.',
    timestamp: '2024-01-15T10:30:00Z',
    replies: [
      {
        id: 'reply-1',
        eipNumber: 1559,
        author: 'Bob Validator',
        content: 'Agreed! The base fee mechanism has made gas estimation much more reliable.',
        timestamp: '2024-01-15T11:00:00Z',
        replies: []
      }
    ]
  },
  {
    id: 'disc-2',
    eipNumber: 4337,
    author: 'Charlie Wallet',
    content: 'Account abstraction is going to revolutionize wallet UX. The ability to sponsor gas fees will onboard millions of new users.',
    timestamp: '2024-01-20T14:15:00Z',
    replies: []
  },
  {
    id: 'disc-3',
    eipNumber: 7702,
    author: 'Diana Smart',
    content: 'EIP-7702 provides an elegant bridge to full account abstraction. The temporary code setting is a brilliant approach.',
    timestamp: '2024-02-01T09:45:00Z',
    replies: [
      {
        id: 'reply-2',
        eipNumber: 7702,
        author: 'Eve Protocol',
        content: 'The security model is well thought out. Single-transaction scope limits the attack surface significantly.',
        timestamp: '2024-02-01T10:30:00Z',
        replies: []
      }
    ]
  }
];

export const mockNews: NewsItem[] = [
  {
    id: 'news-1',
    title: 'EIP-4844 Blob Transactions Reduce L2 Costs by 90%',
    source: 'Ethereum Foundation',
    url: 'https://blog.ethereum.org/2024/03/13/dencun-mainnet-announcement',
    publishedAt: '2024-03-13T12:00:00Z',
    eipNumbers: [4844],
    summary: 'The Dencun upgrade successfully activated EIP-4844, dramatically reducing costs for Layer 2 rollups through blob transactions.'
  },
  {
    id: 'news-2',
    title: 'Account Abstraction Gains Momentum with EIP-4337 Implementations',
    source: 'DeFi Pulse',
    url: 'https://defipulse.com/account-abstraction-eip4337',
    publishedAt: '2024-02-20T15:30:00Z',
    eipNumbers: [4337],
    summary: 'Major wallet providers are implementing EIP-4337 account abstraction, promising better UX and gasless transactions.'
  },
  {
    id: 'news-3',
    title: 'EIP-7702 Proposed as Bridge to Full Account Abstraction',
    source: 'Ethereum Magicians',
    url: 'https://ethereum-magicians.org/t/eip-7702-announcement',
    publishedAt: '2024-05-07T08:00:00Z',
    eipNumbers: [7702],
    summary: 'Vitalik Buterin proposes EIP-7702 as an intermediate step toward account abstraction, allowing EOAs to temporarily act as smart contracts.'
  }
];