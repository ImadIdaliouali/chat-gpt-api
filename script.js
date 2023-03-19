import { config } from "dotenv";
import { Configuration, OpenAIApi } from "openai";
import readline from "readline";

config();

const apiKey = process.env.API_KEY;

const openai = new OpenAIApi(new Configuration({ apiKey }));

const userInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

userInterface.prompt();

userInterface.on('line', async input => {
    const res = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: input }]
    });
    console.log(res.data.choices[0].message.content);
    userInterface.prompt();
});
