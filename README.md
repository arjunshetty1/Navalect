# Navalect 
Navalect  is an AI-powered wisdom generator that offers insights and guidance in the style of Naval Ravikant. Ask questions about wealth, happiness, business, skills, or life philosophy and receive profound, Naval-style wisdom along with clear explanations.

## Features

- **Naval-Style Wisdom**: Generate concise, thought-provoking insights similar to Naval Ravikant's philosophy
- **Plain-Language Explanations**: Each piece of wisdom comes with a clear explanation in everyday language
- **Ask Anything**: From philosophical questions to specific requests for roadmaps and guidance
- **Beautiful UI**: Clean, minimalist design that works in both light and dark modes
- **Mobile-Friendly**: Responsive design that works on all devices
- **No Login Required**: Just ask and receive wisdom immediately

## Live Demo

Try it out at: [naval-compass.vercel.app](https://naval-compass.vercel.app)

## Prerequisites

- Node.js 16.8.0 or newer
- OpenAI API key

##  Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/arjunshetty1/Navalect.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory with your OpenAI API key:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## How It Works

Navalect  uses OpenAI's API to generate wisdom in Naval Ravikant's distinctive style. The app:

1. Takes your question and sends it to a carefully engineered prompt
2. Generates Naval-style wisdom based on your specific question
3. Creates a plain-language explanation of that wisdom
4. Presents both to you in a clean, minimalist interface

The system is designed to handle both philosophical questions ("How do I find happiness?") and specific requests ("Give me a roadmap for building wealth").

## Project Structure

```
naval-compass/
├── app/                  # Next.js App Router
│   ├── api/              # API routes
│   │   ├── naval-wisdom/ # Wisdom generation endpoint
│   │   └── explain-wisdom/ # Explanation generation endpoint
│   ├── components/       # React components
│   │   └── NavalismLogo.js # Logo component
│   ├── globals.css       # Global styles
│   ├── layout.js         # Root layout
│   ├── Navalect App.js # Main client component
│   └── page.js           # Home page
├── public/               # Static assets
│   └── naval-compass-logo.svg # Logo file
├── .env.local.example    # Example environment variables
├── package.json          # Dependencies and scripts
└── README.md             # This file
```

##  Configuration Options

You can customize the API calls in `app/api/naval-wisdom/route.js` and `app/api/explain-wisdom/route.js`:

- **Model**: Change to `gpt-3.5-turbo` for lower costs
- **Temperature**: Adjust between 0-1 (lower for more deterministic responses)
- **Max Tokens**: Increase for longer responses

## Usage Examples

Navalect  can handle various types of questions:

### Philosophical Questions
- "What is wealth?"
- "How do I find happiness?"
- "Should I start a company?"

### Specific Guidance
- "Give me a roadmap for building wealth"
- "What are the steps to mastering a skill?"
- "How should I think about career choices?"

## Customization

### Styling
Modify `app/globals.css` to change the appearance. The app automatically adapts to light and dark modes.

### Logo
The NavalismLogo component in `app/components/NavalismLogo.js` can be customized with different sizes.

## Acknowledgements

- Inspired by Naval Ravikant's wisdom and philosophy
- Built with [Next.js](https://nextjs.org/)
- Powered by [OpenAI](https://openai.com/)

## Disclaimer

This tool is not affiliated with or endorsed by Naval Ravikant. It's simply inspired by his wisdom and philosophy.

---

Made with ❤️ by Arjun Shetty. Feel free to contribute.
