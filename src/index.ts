import { getGraphModel } from './core/getGraphModelByName';

const loadModels = async () => {
  const vocoder = await getGraphModel('vocoder');
  const text2mel = await getGraphModel('text2mel');

  console.log(text2mel, vocoder);
};

loadModels();
