// app/api/explain-wisdom/route.js
import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    const { wisdom } = await request.json();
    
    if (!wisdom) {
      return NextResponse.json(
        { error: 'Wisdom statement is required' },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Using a cheaper model for explanations
      messages: [
        {
          role: "system",
          content: `You provide clear, concise explanations of Naval Ravikant's philosophical statements in a way that's accessible to everyone.

Your explanations should:
- Break down complex philosophical ideas into simple, practical understanding
- Maintain the essence of Naval's philosophy
- Use everyday language and relatable examples
- Be 2-4 sentences long
- Never say "Naval means" or "Naval is saying" - just explain the concept directly
- Focus on the practical application or insight behind the statement
`
        },
        {
          role: "user",
          content: `Explain this Naval Ravikant statement in simple terms: "${wisdom}"`
        }
      ],
      temperature: 0.5,
      max_tokens: 150
    });

    const explanation = completion.choices[0].message.content.trim();
    
    return NextResponse.json({ explanation });
  } catch (error) {
    console.error('OpenAI API error:', error);
    return NextResponse.json(
      { error: 'Error generating explanation', details: error.message },
      { status: 500 }
    );
  }
}