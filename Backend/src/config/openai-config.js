const OpenAI= require( "openai");

exports.configureOpenAi = () => {
    // Directly configure the OpenAI client with the API key
    return new OpenAI({
        apiKey: process.env.OPEN_AI_SECRECT,
        organization: process.env.OPENAI_ORGANIZATION_ID  // Optional, only needed if you use a specific organization
    });
};
