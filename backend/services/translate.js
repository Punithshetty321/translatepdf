import translate from 'google-translate-api-x';

export const translateToEnglish = async (text) => {
  const result = await translate(text, {
    from: 'ta',
    to: 'en',
    forceBatch: false,             
    rejectOnPartialFail: false    
  });

  return result.text;
};