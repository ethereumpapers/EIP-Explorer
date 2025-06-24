import { EIP, Project, Discussion, NewsItem, LiveData } from '../types/eip';

export const mockEIPs: EIP[] = [
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
    content: `## Abstract

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
    number: 721,
    title: "Non-Fungible Token Standard",
    author: ["William Entriken", "Dieter Shirley", "Jacob Evans", "Nastassia Sachs"],
    status: "Final",
    type: "Standards Track",
    category: "ERC",
    created: "2018-01-24",
    updated: "2018-07-17",
    description: "A standard interface for non-fungible tokens, also known as deeds.",
    content: `## Abstract

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
    number: 4337,
    title: "Account Abstraction Using Alt Mempool",
    author: ["Vitalik Buterin", "Yoav Weiss", "Kristof Gazso", "Namra Patel", "Dror Tirosh", "Shahaf Nacson", "Tjaden Hess"],
    status: "Draft",
    type: "Standards Track",
    category: "ERC",
    created: "2021-09-29",
    updated: "2023-06-29",
    description: "An account abstraction proposal which completely avoids the need for consensus-layer protocol changes.",
    content: `## Abstract

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
    number: 20,
    title: "Token Standard",
    author: ["Fabian Vogelsteller", "Vitalik Buterin"],
    status: "Final",
    type: "Standards Track",
    category: "ERC",
    created: "2015-11-19",
    updated: "2015-11-19",
    description: "A standard interface for tokens.",
    content: `## Abstract

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
    number: 2981,
    title: "NFT Royalty Standard",
    author: ["Zach Burks", "James Morgan", "Blaine Malone", "James Seibel"],
    status: "Final",
    type: "Standards Track",
    category: "ERC",
    created: "2020-09-15",
    updated: "2023-01-07",
    description: "A standardized way to retrieve royalty payment information for non-fungible tokens (NFTs).",
    content: `## Abstract

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
  }
];

export const mockProjects: Project[] = [
  {
    id: "1",
    name: "OpenSea",
    description: "Leading NFT marketplace utilizing ERC-721 and ERC-1155 standards for trading digital assets.",
    website: "https://opensea.io",
    github: "https://github.com/ProjectOpenSea",
    eipNumbers: [721, 1155, 2981],
    implementationDetails: "Full implementation of NFT standards with advanced trading features and royalty support.",
    status: "Active"
  },
  {
    id: "2",
    name: "MetaMask",
    description: "Popular Web3 wallet implementing EIP-1559 fee mechanisms and Account Abstraction features.",
    website: "https://metamask.io",
    github: "https://github.com/MetaMask",
    eipNumbers: [1559, 4337],
    implementationDetails: "Advanced fee estimation and smart contract wallet integration.",
    status: "Active"
  },
  {
    id: "3",
    name: "Uniswap V3",
    description: "Decentralized exchange protocol leveraging ERC-20 token standards for automated market making.",
    website: "https://uniswap.org",
    github: "https://github.com/Uniswap",
    eipNumbers: [20],
    implementationDetails: "Concentrated liquidity pools with ERC-20 token support and advanced AMM mechanics.",
    status: "Active"
  },
  {
    id: "4",
    name: "Argent Wallet",
    description: "Smart contract wallet implementing Account Abstraction for enhanced user experience.",
    website: "https://argent.xyz",
    github: "https://github.com/argentlabs",
    eipNumbers: [4337],
    implementationDetails: "Native Account Abstraction support with social recovery and gasless transactions.",
    status: "Beta"
  }
];

export const mockDiscussions: Discussion[] = [
  {
    id: "1",
    eipNumber: 1559,
    author: "EthDev42",
    content: "The implementation of EIP-1559 has significantly improved fee predictability. Has anyone analyzed the impact on miner revenue?",
    timestamp: "2024-01-15T10:30:00Z",
    replies: [
      {
        id: "2",
        eipNumber: 1559,
        author: "DataAnalyst",
        content: "According to recent data, miner revenue has stabilized while user experience improved dramatically. The fee burning mechanism is working as intended.",
        timestamp: "2024-01-15T11:15:00Z",
        replies: []
      }
    ]
  },
  {
    id: "3",
    eipNumber: 4337,
    author: "AAExplorer",
    content: "Account Abstraction is revolutionary for UX. When can we expect broader wallet adoption?",
    timestamp: "2024-01-14T14:20:00Z",
    replies: []
  }
];

export const mockNews: NewsItem[] = [
  {
    id: "1",
    title: "EIP-1559 Burns Over 4 Million ETH Since Implementation",
    source: "Ethereum Foundation",
    url: "#",
    publishedAt: "2024-01-15T00:00:00Z",
    eipNumbers: [1559],
    summary: "The fee burning mechanism introduced by EIP-1559 has permanently removed over 4 million ETH from circulation, contributing to deflationary pressure."
  },
  {
    id: "2",
    title: "Major Wallets Begin Account Abstraction Integration",
    source: "DeFi Pulse",
    url: "#",
    publishedAt: "2024-01-14T00:00:00Z",
    eipNumbers: [4337],
    summary: "Leading wallet providers announce support for EIP-4337, bringing gasless transactions and improved UX to millions of users."
  },
  {
    id: "3",
    title: "NFT Royalty Standards Gain Marketplace Adoption",
    source: "NFT Now",
    url: "#",
    publishedAt: "2024-01-13T00:00:00Z",
    eipNumbers: [2981],
    summary: "EIP-2981 royalty standards are now supported by 95% of major NFT marketplaces, ensuring creator compensation across platforms."
  }
];

export const mockLiveData: LiveData[] = [
  {
    eipNumber: 1559,
    metrics: {
      adoptionRate: 100,
      transactionVolume: "1.2M/day",
      gasUsage: "15M gwei/day",
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
      gasUsage: "8M gwei/day",
      activeProjects: 12000
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
  }
];