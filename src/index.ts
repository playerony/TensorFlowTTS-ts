import * as tf from '@tensorflow/tfjs';

import { playAudio } from './core/playAudio';
import { cleanUpStringInput } from './core/cleanUpStringInput';
import { getGraphModelByName } from './core/getGraphModelByName';
import { convertStringToSequence } from './core/convertStringToSequence';
import { generateVocoderOutputInstance } from './core/generateVocoderOutput';

const getButtonElement = () => document.getElementById('speak-button') as HTMLButtonElement;

const getTextareaElement = () => document.getElementById('text-to-read-out') as HTMLInputElement;

const toggleButtonLoadingState = (buttonElement: HTMLButtonElement, isLoading: boolean) => {
  if (!buttonElement) {
    return;
  }

  buttonElement.classList[isLoading ? 'add' : 'remove']('is-loading');
};

const initializeModels = async () => {
  const vocoderModel = await getGraphModelByName('vocoder');
  const text2melModel = await getGraphModelByName('text2mel');

  return { vocoderModel, text2melModel };
};

const speak = async (input: string, vocoderModel: tf.GraphModel, text2melModel: tf.GraphModel) => {
  const parsedInput = cleanUpStringInput(input);
  const inputSequence = convertStringToSequence(parsedInput);
  const vocoderOutput = await generateVocoderOutputInstance(
    vocoderModel,
    text2melModel,
  )(inputSequence);

  await playAudio(vocoderOutput);
};

const handleButtonClick = async (
  event: MouseEvent,
  vocoderModel: tf.GraphModel,
  text2melModel: tf.GraphModel,
) => {
  const inputElement = getTextareaElement();
  if (!inputElement) {
    return;
  }

  const input = inputElement.value;
  if (!input) {
    return;
  }

  const buttonElement = event.target as HTMLButtonElement;
  toggleButtonLoadingState(buttonElement, true);
  await speak(input, vocoderModel, text2melModel);
  toggleButtonLoadingState(buttonElement, false);
};

const assignOnClickEventToButton = (vocoderModel: tf.GraphModel, text2melModel: tf.GraphModel) => {
  const buttonElement = getButtonElement();
  if (!buttonElement) {
    return;
  }

  buttonElement.addEventListener('click', (event) =>
    handleButtonClick(event, vocoderModel, text2melModel),
  );
};

const onLoad = async () => {
  const buttonElement = getButtonElement();
  toggleButtonLoadingState(buttonElement, true);

  const { vocoderModel, text2melModel } = await initializeModels();

  toggleButtonLoadingState(buttonElement, false);
  assignOnClickEventToButton(vocoderModel, text2melModel);
};

window.onload = onLoad;
