import { StreamingTextResponse } from 'ai'

import { OpenAiStream } from '@/utils/open-ai-stream'

export const runtime = 'edge'

export async function POST (req: any, res: any) {
  // const { message } = await req.json()
  // const openai: OpenAI = new OpenAI({
  //   apiKey: process.env.NEXT_PUBLIC_GPT_API_KEY
  // })
  //
  // // res.headers.append('Content-Type', 'text/event-stream')
  // // res.headers.set('Cache-Control', 'no-cache')
  // // res.headers.set('Connection', 'keep-alive')
  // const myStream = new PassThrough()
  // myStream.write('Hello, world!')
  //
  // // Pipe the stream to the response
  // myStream.pipe(res)
  // try {
  //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //
  //   // const chatCompletion: any = await openai.chat.completions.create({
  //   //   messages: [{
  //   //     role: 'user',
  //   //     content: message
  //   //   }],
  //   //   model: 'gpt-4',
  //   //   stream: true
  //   // })
  //   //
  //
  //   return 'dsfas'
  //   // return NextResponse.json(chatCompletion, { status: 200 })
  // } catch (e: IOpenAiError | unknown) {
  //   if (typeof e === 'object' && e !== null && 'status' in e) {
  //     const error = e as IOpenAiError
  //     return NextResponse.json(error, { status: error.status ?? 500 })
  //   }
  //   return NextResponse.json({ message: 'Unknown error occurred' }, { status: 500 })
  // }

  // const openai = new OpenAI({
  //   apiKey: `${process.env.NEXT_PUBLIC_GPT_API_KEY ?? ''}`// defaults to process.env["OPENAI_API_KEY"]
  // })

  const { message } = await req.json()

  if (!message) return new Response('Missing prompt', { status: 400 })

  const payload: any = {
    messages: [{
      role: 'user',
      content: message
    }],
    model: 'gpt-4',
    stream: true
  }

  // const chatCompletion = await openai.chat.completions.create(payload)
  //
  const stream = await OpenAiStream(payload)
  return new StreamingTextResponse(stream as any)
  // return NextResponse.json(chatCompletion, { status: 200 })
}
