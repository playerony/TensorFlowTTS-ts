import { symbols } from '../constants';

const getSymbolIndex = (symbol: string) => symbols.indexOf(symbol);

const isValidSymbol = (symbol: string) => getSymbolIndex(symbol) !== -1;

export const convertStringToSequence = (input: string) => {
  const letters = input.split('');
  const filteredLetters = letters.filter(isValidSymbol);

  return filteredLetters.map(getSymbolIndex);
};
