# Ethereum Standards Explorer

A comprehensive platform for exploring Ethereum Improvement Proposals (EIPs) with live data, project tracking, and AI-powered research assistance.

## Features

- **Comprehensive EIP Database**: Browse and search through all Ethereum Improvement Proposals
- **Live Analytics**: Real-time adoption metrics and usage statistics
- **Project Tracking**: Discover projects implementing various EIP standards
- **AI Research Assistant**: ChatGPT-powered assistant for EIP analysis and guidance
- **Community Discussions**: Engage with the community about EIP development
- **Advanced Search**: Find EIPs by content, author, status, and more

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **AI Integration**: OpenAI GPT-4 API
- **Data Sources**: GitHub API, Dune Analytics
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd ethereum-standards-explorer
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables (optional)
```bash
cp .env.example .env
# Add your API keys for enhanced functionality
```

4. Start the development server
```bash
npm run dev
```

## Environment Variables

For enhanced functionality, you can configure the following environment variables:

- `VITE_OPENAI_API_KEY`: OpenAI API key for AI assistant features
- `VITE_DUNE_API_KEY`: Dune Analytics API key for live metrics

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── services/           # API and data services
├── types/              # TypeScript type definitions
└── data/               # Mock data and constants
```

## Key Components

- **EIP Explorer**: Browse and filter EIPs by status, category, and type
- **Analytics Dashboard**: View adoption metrics and ecosystem statistics
- **Project Directory**: Discover implementations of EIP standards
- **AI Assistant**: Get intelligent insights about EIPs and implementations
- **Discussion Forums**: Community engagement and feedback

## Contributing

We welcome contributions! Please see our contributing guidelines for more information.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Ethereum Foundation for EIP standards
- OpenAI for AI capabilities
- Dune Analytics for blockchain data
- The Ethereum community for continuous innovation