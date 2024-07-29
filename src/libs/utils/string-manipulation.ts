export function truncateText(text: string, maxLenght: number): string {
  let truncatedText = text;
  if (text.length > maxLenght) {
    truncatedText = truncatedText.substring(0, maxLenght) + "...";
  }
  return truncatedText;
}

/**
 * Create chat id thats a combination of both those ids (the other user & the user who is logged in)
 * That must be sorted alphabetically so that whatever order the users join the chat, it's way going
 * to be the same id for the two users when we create it.
 */

export function createChatId(a: string, b: string) {
  return a > b ? `${b}-${a}` : `${a}-${b}`;
}
