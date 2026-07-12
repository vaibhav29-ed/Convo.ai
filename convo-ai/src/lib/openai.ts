import OpenAI from "openai";

let _client: OpenAI | null = null;

function getOpenAI(): OpenAI {
  if (!_client) {
    _client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      baseURL: "https://integrate.api.nvidia.com/v1",
    });
  }
  return _client;
}

const openai = new Proxy({} as OpenAI, {
  get(_, prop) {
    return (getOpenAI() as any)[prop];
  },
});

export default openai;
