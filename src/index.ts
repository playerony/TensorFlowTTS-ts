import { playAudio } from './core/playAudio';
import { cleanUpStringInput } from './core/cleanUpStringInput';
import { getGraphModelByName } from './core/getGraphModelByName';
import { generateVocoderOutputInstance } from './core/generateVocoderOutput';

const loadModels = async () => {
  const vocoderModel = await getGraphModelByName('vocoder');
  const text2melModel = await getGraphModelByName('text2mel');
  const generateVocoderOutput = generateVocoderOutputInstance(vocoderModel, text2melModel);

  const vocoderOutput = await generateVocoderOutput([
    46, 57, 11, 46, 56, 11, 60, 52, 55, 48, 46, 51, 44, 2, 148,
  ]);

  playAudio(vocoderOutput);
};

const assingOnClickEvent = () => {
  const buttonElement = document.querySelector('button');
  if (!buttonElement) {
    return;
  }

  buttonElement.addEventListener('click', loadModels);
};

window.onload = assingOnClickEvent;
