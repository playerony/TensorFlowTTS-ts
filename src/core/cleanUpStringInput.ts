import { ToWords } from 'to-words';
import replaceSpecialCharacters from 'replace-special-characters';

import {
  abbreviationsMapper,
  specialCharactersMapper,
  abbreviationsMatchPattern,
} from '../constants';

const toWords = new ToWords();

const isString = (value: unknown): value is string =>
  typeof value === 'string' || value instanceof String;

const stringToLowerCase = (input: string) => input.toLowerCase();

const trimString = (input: string) => input.trim();

const replaceMultipleSpacesWithSingleSpace = (input: string) => input.replace(/\s+/g, ' ');

const replaceWhitespacesWithSingleSpace = (input: string) => input.replace(/[\t\n\r]/g, ' ');

const replaceAbbreviationsWithFullNames = (input: string) =>
  input.replace(abbreviationsMatchPattern, (match) => abbreviationsMapper[match] || match);

const replaceSpecialCharactersWithFullNames = (input: string) =>
  Object.keys(specialCharactersMapper).reduce((result, specialCharacter) => {
    const regex = new RegExp('\\' + specialCharacter, 'g');

    return result.replace(regex, ` ${specialCharactersMapper[specialCharacter]} `);
  }, input);

const replaceNumberCommasWithEmptyString = (input: string) => input.replace(/(?<=\d),(?=\d)/g, '');

const replaceNumberDotsWithPoint = (input: string) => input.replace(/(\d+)\.(\d+)/g, '$1 point $2');

const replaceNumberWithWords = (input: string) =>
  input.replace(/\d+/g, (match) => toWords.convert(Number(match)).toLowerCase());

const replaceAllNumberDollarSignsWithText = (input: string) =>
  input.replace(/\$?([\d,]+(?:\.\d+)?)(?:\$)?/g, (match, amount) => {
    if (match === amount) {
      return match;
    }

    const parsedAmount = Number(amount);
    const suffix = parsedAmount === 1 ? 'dollar' : 'dollars';

    return `${parsedAmount.toLocaleString()} ${suffix}`;
  });

const pipe = [
  // base cleanup
  stringToLowerCase,
  replaceMultipleSpacesWithSingleSpace,
  replaceWhitespacesWithSingleSpace,
  replaceSpecialCharacters,
  // phrasal cleanup
  replaceAbbreviationsWithFullNames,
  replaceNumberCommasWithEmptyString,
  replaceAllNumberDollarSignsWithText,
  replaceNumberDotsWithPoint,
  replaceNumberWithWords,
  replaceSpecialCharactersWithFullNames,
];

export const cleanUpStringInput = (input: string | null | undefined) => {
  if (!isString(input)) {
    return '';
  }

  const trimmedInput = trimString(input);

  if (trimmedInput.length === 0) {
    return '';
  }

  return pipe.reduce((accumulator, callback) => callback(accumulator), trimmedInput);
};
