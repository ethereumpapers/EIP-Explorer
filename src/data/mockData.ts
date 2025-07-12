import { EIP, Project, Discussion, NewsItem } from '../types/eip';

// Enhanced mock data with recent EIPs from 2024 and important standards
export const mockEIPs: EIP[] = [
  // Recent 2024 EIPs
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
- Replay protection through chain_id and nonce`,
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
  }
];

export const mockProjects: Project[] = [
  {
    id: 'metamask',
    name: 'MetaMask',
    description: 'Leading Web3 wallet with comprehensive EIP support including EIP-1559, EIP-4337, and EIP-7702.',
    logo: 'https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    website: 'https://metamask.io',
    github: 'https://github.com/MetaMask',
    eipNumbers: [1559, 4337, 7702],
    implementationDetails: 'Full EIP-1559 integration with advanced fee estimation, EIP-4337 account abstraction support, and upcoming EIP-7702 implementation for enhanced EOA functionality.',
    status: 'Active'
  },
  {
    id: 'opensea',
    name: 'OpenSea',
    description: 'World\'s largest NFT marketplace supporting ERC-721, ERC-1155, and EIP-2981 royalty standards.',
    logo: 'https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    website: 'https://opensea.io',
    github: 'https://github.com/ProjectOpenSea',
    eipNumbers: [721, 1155, 2981],
    implementationDetails: 'Comprehensive NFT marketplace with full ERC-721/1155 support, EIP-2981 royalty enforcement, and advanced trading features.',
    status: 'Active'
  },
  {
    id: 'uniswap',
    name: 'Uniswap',
    description: 'Leading DEX protocol built on ERC-20 token standard with automated market making.',
    logo: 'https://images.pexels.com/photos/7567526/pexels-photo-7567526.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    website: 'https://uniswap.org',
    github: 'https://github.com/Uniswap',
    eipNumbers: [20],
    implementationDetails: 'Core DEX infrastructure supporting all ERC-20 tokens with concentrated liquidity and advanced AMM mechanics.',
    status: 'Active'
  },
  {
    id: 'argent',
    name: 'Argent',
    description: 'Smart contract wallet implementing EIP-4337 for gasless transactions and social recovery.',
    logo: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    website: 'https://argent.xyz',
    github: 'https://github.com/argentlabs',
    eipNumbers: [4337],
    implementationDetails: 'Native EIP-4337 implementation with social recovery, gasless transactions, and DeFi integrations.',
    status: 'Active'
  },
  {
    id: 'base-rollup',
    name: 'Base',
    description: 'Coinbase\'s L2 rollup utilizing EIP-4844 blob transactions for reduced costs.',
    website: 'https://base.org',
    github: 'https://github.com/base-org',
    eipNumbers: [4844],
    implementationDetails: 'Layer 2 optimistic rollup leveraging EIP-4844 blob transactions for significantly reduced data availability costs.',
    status: 'Active'
  },
  {
    id: 'arbitrum',
    name: 'Arbitrum',
    description: 'Leading L2 scaling solution implementing EIP-4844 for cheaper data availability.',
    website: 'https://arbitrum.io',
    github: 'https://github.com/OffchainLabs',
    eipNumbers: [4844],
    implementationDetails: 'Optimistic rollup with EIP-4844 blob transaction support for reduced L2 transaction costs.',
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