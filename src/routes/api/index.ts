import type { RequestHandler } from "@builder.io/qwik-city";
// import { Configuration, OpenAIApi } from "openai";

// console.log(completion.data.choices[0].message);

export const onGet: RequestHandler<any> = async (requestEvent: any) => {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${requestEvent.env.get("openai_key")}`,
      },
      // body: '{\n     "model": "gpt-3.5-turbo",\n     "messages": [{"role": "user", "content": "Say this is a test!"}],\n     "temperature": 0.7\n   }',
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: "Say this is a test!",
          },
        ],
        temperature: 0.7,
      }),
    });
    const completion = await response.json();
    // const configuration = new Configuration({
    //   apiKey: requestEvent.env.get("openai_key"),
    // });
    // const openai = new OpenAIApi(configuration);
    // const completion = await openai.createChatCompletion({
    //   model: "gpt-3.5-turbo",
    //   messages: [{ role: "user", content: "Hello world" }],
    // });

    // console.log("RENDER NORMAL");
    // console.log(completion.data.choices[0].message);
    requestEvent.json(200, { response: completion });
    // requestEvent.json(200, { message: "Hello world" });
  } catch (error) {
    console.log("RENDER ERROR");
    console.log(error);
    requestEvent.json(200, {
      falla: "Hay error aca",
      error: error,
      api: requestEvent.env.get("openai_key"),
    });
  }
};
