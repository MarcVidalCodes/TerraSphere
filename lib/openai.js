import OpenAI from 'openai';
import { OPENAI_API_KEY } from '@env';

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

export const processImage = async (base64Image) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: 'user',
          content: [
            {
              type: "text",
              text: "Describe this image",
            },
            {
              type: "image_url",
              image_url: {
                url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Jempol_Ngadep_Atas_%28cropped%29.jpg/1200px-Jempol_Ngadep_Atas_%28cropped%29.jpg", 
              },
            },
          ],
        },
      ],
      max_tokens: 50,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error fetching response:', error);
    return 'Error fetching response';
  }
