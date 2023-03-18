import { getGraphModelByName } from './core/getGraphModelByName';

const loadModels = async () => {
  const vocoderModel = await getGraphModelByName('vocoder');
  const text2melModel = await getGraphModelByName('text2mel');

  console.log(text2melModel, vocoderModel);
};

loadModels();
