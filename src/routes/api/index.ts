import type { RequestHandler } from "@builder.io/qwik-city";
import { Configuration, OpenAIApi } from "openai";

// console.log(completion.data.choices[0].message);

export const onGet: RequestHandler<any> = async (requestEvent: any) => {
  try {
    const fakeAPI = "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";
    const configuration = new Configuration({
      apiKey: fakeAPI,
    });
    const openai = new OpenAIApi(configuration);
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "Hello world" }],
    });

    console.log("RENDER NORMAL");
    console.log(completion.data.choices[0].message);
    requestEvent.json(200, completion.data.choices[0].message);
  } catch (error) {
    console.log("RENDER ERROR");
    console.log(error);
  }
};
