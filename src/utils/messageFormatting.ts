const URL_REGEX = /(https?:\/\/[^\s]+)/g;

export const formatMessageText = (text: string): string => {
  return text.replace(URL_REGEX, (url) => {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-teal-600 hover:underline">${url}</a>`;
  });
};