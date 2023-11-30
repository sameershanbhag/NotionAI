import { Configuration, OpenAIApi } from 'openai-edge';

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(config);

export async function generateImagePrompt(name: string) {
    try {
        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages:[
            {
                role: 'system',
                content: 'You are a creative AI Assistant responsible to generate a great descriptive images for my notes. Your output will be used byt he DALLE API to generate thumbnails. The description should be minimalistic.'
            },
            {
                role: 'user',
                content: `Please generate a thumbnail description for my notebook title ${name}`
            }
        ]
        });
        const data = await response.json();
        const image_description = data.choices[0].message.content;
        return image_description as string
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function generateImage(image_descrition: string) {
    try{
        const respose = await openai.createImage({
            prompt: image_descrition,
            n: 1,
            size: '256x256',
        })
        const data = await respose.json();
        const image_url = data.data[0].url;
        return image_url as string;
    } catch (error) {
        console.log(error);
        throw error;
    }
}