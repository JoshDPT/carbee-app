
// takes the raw string and converts it to space-seperated capitalized words
export default function formatString(rawString: string): string {
	const stringArray: string[] = rawString
		.toLocaleLowerCase()
		.split('_')
		.map((string) => {
			const word = string.split('');
      word[0] = word[0].toLocaleUpperCase()
      return word.join('')
		})
	const formatString: string = stringArray.join(' ');
	return formatString;
}
