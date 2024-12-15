// TODO: Implement the chat API with Groq and web scraping with Cheerio and Puppeteer
// Refer to the Next.js Docs on how to read the Request body: https://nextjs.org/docs/app/building-your-application/routing/route-handlers
// Refer to the Groq SDK here on how to use an LLM: https://www.npmjs.com/package/groq-sdk
// Refer to the Cheerio docs here on how to parse HTML: https://cheerio.js.org/docs/basics/loading
// Refer to Puppeteer docs here: https://pptr.dev/guides/what-is-puppeteer
//

import Groq from "groq-sdk";

const client = new Groq({
  apiKey: process.env['GROQ_API_KEY'],
});

export async function POST(req: Request) {
  try {
    const prompt = await req.json();
    const chatResponse = await client.chat.completions.create({
      messages: [{ role: "user", content: prompt.message }],
      model: "llama3-8b-8192"
    })

    const serverResponse = chatResponse.choices[0].message.content;
    console.log(serverResponse);

    const response = new Response(JSON.stringify({ message: serverResponse }), { status: 200 })
    return response;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log(`An unknow error occured: ${error}`);
    }

    return new Response(null, { status: 500, statusText: "Something went wrong on the server" })

  }
}
