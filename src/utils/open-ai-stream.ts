import { createParser } from 'eventsource-parser'
import fetch from 'node-fetch'

export async function OpenAiStream (payload: any) {
  const encoder = new TextEncoder()
  const decoder = new TextDecoder()
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_GPT_API_KEY ?? ''}`
    },
    body: JSON.stringify(payload)
  })

  return new ReadableStream({
    async start (controller) {
      async function push (event: any) {
        if (event.type === 'event') {
          if (typeof event?.data === 'string' && event?.data === '[DONE]') {
            controller.close()
            return
          }

          const json = JSON.parse(event?.data)
          const text = json.choices?.[0].delta?.content || ''
          const queue = encoder.encode(text)

          controller.enqueue(queue)
        }
      }

      const parser = createParser(push)

      for await (const chunk of res.body) {
        parser.feed(decoder.decode(chunk as any))
      }
    }
  })
}
