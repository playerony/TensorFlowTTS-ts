import { playAudio } from './core/playAudio';
import { cleanUpStringInput } from './core/cleanUpStringInput';
import { getGraphModelByName } from './core/getGraphModelByName';
import { convertStringToSequence } from './core/convertStringToSequence';
import { generateVocoderOutputInstance } from './core/generateVocoderOutput';

const loadModels = async () => {
  const vocoderModel = await getGraphModelByName('vocoder');
  const text2melModel = await getGraphModelByName('text2mel');
  const generateVocoderOutput = generateVocoderOutputInstance(vocoderModel, text2melModel);

  const parsedInput = cleanUpStringInput('Test input string etc.');
  const inputSequence = convertStringToSequence(parsedInput);
  const vocoderOutput = await generateVocoderOutput(inputSequence);

  playAudio(vocoderOutput);
};

const assignOnClickEvent = () => {
  const buttonElement = document.querySelector('button');
  if (!buttonElement) {
    return;
  }

  buttonElement.addEventListener('click', loadModels);
};

window.onload = assignOnClickEvent;
