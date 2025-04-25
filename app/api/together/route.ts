import Together from "together-ai";
const together = new Together();

if (!process.env.TOGETHER_API_KEY) throw new Error("Missing Together env var");

export async function POST(req: Request) {
  const { prompt, model, max_tokens = 800 } = await req.json();

  const runner = together.chat.completions.stream({
    model,
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    max_tokens: max_tokens, // Utilise la valeur passée ou 800 par défaut
  });

  return new Response(runner.toReadableStream());
}

export const runtime = "edge";
