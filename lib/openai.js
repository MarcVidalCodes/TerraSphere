import OpenAI from 'openai';
import { OPENAI_API_KEY } from '@env';

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

export const processImage = async (base64Image) => {
    try {
            // Ensure the image is in JPEG format and not too large
            const maxSize = 20 * 1024 * 1024; // 20 MB
        
            // Calculate the size of the base64 string (rough estimate)
            const imageData = base64Image.split(',')[1]; // Remove the prefix
            const imageSize = (imageData.length * 3) / 4; // Approximate size in bytes
        
            if (imageSize > maxSize) {
              throw new Error('Image size exceeds the 20 MB limit.');
            }
        
            const completion = await openai.chat.completions.create({
              model: "gpt-4o-mini",
              messages: [
                {
                  role: 'user',
                  content: [
                    {
                      type: "text",
                      text: "ONLY return the number i tell you to return. If image is watering a plant, say '1'. If it is watering a plant outdoors, say '2'. If it is of someone or any indication of picking up trash or holding trash in hand, say '5'. If it appears to be a person planting a plant or tree, say '10",
            },
                    {
                      type: "image_url",
                      image_url: {
                        url: base64Image, 
                        detail: "low",
                      },
                    },
                  ],
                },
              ],
              max_tokens: 100,
            });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error fetching response:', error);
    return 'Error fetching response';
  }
}
