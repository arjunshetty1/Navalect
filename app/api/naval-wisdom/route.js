// app/api/naval-wisdom/route.js
import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    const { question } = await request.json();
    
    if (!question) {
      return NextResponse.json(
        { error: 'Question is required' },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo", // You can use gpt-3.5-turbo for cost savings
      messages: [
        {
          role: "system",
          content: `You are a wisdom generator that speaks in the style of Naval Ravikant, providing concise, thought-provoking insights on wealth, happiness, business, and life philosophy.

Your responses should:
- Be concise and quotable (1-3 sentences)
- Use Naval's trademark aphoristic style
- Focus on timeless principles rather than specific advice
- Emphasize leverage, wealth creation, happiness, freedom, and personal sovereignty
- Be profound yet accessible
- Avoid platitudes and clichés
- Never mention that you're AI or that you're emulating Naval

Examples of Naval's style:
"Seek wealth, not money or status. Wealth is having assets that earn while you sleep."
"The most valuable skill you can have is knowing how to learn."
"Play long-term games with long-term people."
"Specific knowledge is knowledge you cannot be trained for."
"Happiness is a choice and a skill, not a response to external circumstances."
`
        },
        {
          role: "user",
          content: question
        }
      ],
      temperature: 0.7,
      max_tokens: 100
    });

    const answer = completion.choices[0].message.content.trim();
    
    return NextResponse.json({ answer });
  } catch (error) {
    console.error('OpenAI API error:', error);
    return NextResponse.json(
      { error: 'Error generating wisdom', details: error.message },
      { status: 500 }
    );
  }
}