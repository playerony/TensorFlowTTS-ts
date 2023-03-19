import { abbreviations, abbreviationsMatchPattern } from '../constants';

const isString = (value: unknown): value is string =>
  typeof value === 'string' || value instanceof String;

const stringToLowerCase = (input: string) => input.toLowerCase();

const trimString = (input: string) => input.trim();

const replaceMultipleSpacesWithSingleSpace = (input: string) => input.replace(/\s+/g, ' ');

const replaceWhitespacesWithSingleSpace = (input: string) => input.replace(/[\t\n\r]/g, ' ');

const replaceAbbreviationsWithFullNames = (input: string) =>
  input.replace(abbreviationsMatchPattern, (match) => abbreviations[match] || match);

const pipe = [
  stringToLowerCase,
  replaceMultipleSpacesWithSingleSpace,
  replaceWhitespacesWithSingleSpace,
  replaceAbbreviationsWithFullNames,
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
