export const lowercaseId = idGenerator("abcdefghijklmnopqrstuvwxyz", 10);

export function idGenerator(alphabet: string, defaultLength: number) {
  return function generateId(length: number = defaultLength): string {
    let id = "";
    const alphabetLength = alphabet.length;
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * alphabetLength);
      id += alphabet[randomIndex];
    }
    return id;
  };
}
