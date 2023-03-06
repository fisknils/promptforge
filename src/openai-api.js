const dotenv = require('dotenv');
const { Configuration, OpenAIApi } = require('openai');

dotenv.config(); // load environment variables from .env file

const apiKey = process.env.OPENAI_API_KEY; // read the API key from the environment variable

require('dotenv').config(); // load environment variables from .env file


async function generateAIResponse(prompt) {
    const configuration = new Configuration({ apiKey } );

    const openai = new OpenAIApi( configuration );

    return openai.createCompletion({
        model: 'text-davinci-003',
        prompt: prompt,
        max_tokens: 2000,
        temperature: 0.5
    })
        .then((response) => {
            return response.data.choices[0].text;
        })
        .catch(err => {
            return null;
        })
}

module.exports = generateAIResponse;