export function truncateText(text: string, maxLenght: number): string {
  let truncatedText = text;
  if (text.length > maxLenght) {
    truncatedText = truncatedText.substring(0, maxLenght) + "...";
  }
  return truncatedText;
}
