import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

import { IOpenAiError, IOpenAiResponse } from '@/types/interfaces/openai.interface'

export async function POST (req: NextRequest, res: NextResponse) {
  const { message } = await req.json()
  const openai: OpenAI = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_GPT_API_KEY
  })

  try {
    // @ts-expect-error
    const chatCompletion: IOpenAiResponse = await openai.chat.completions.create({
      messages: [{
        role: 'user',
        content: message
      }],
      model: 'gpt-4'
    })

    return NextResponse.json({ message: chatCompletion }, { status: 200 })
  } catch (e: IOpenAiError | unknown) {
    if (typeof e === 'object' && e !== null && 'status' in e) {
      const error = e as IOpenAiError
      return NextResponse.json(error, { status: error.status ?? 500 })
    }
    return NextResponse.json({ message: 'Unknown error occurred' }, { status: 500 })
  }
}
