import * as tf from '@tensorflow/tfjs';

const loadGraphModel = async (name: string) =>
  tf.loadGraphModel(
    `https://raw.githubusercontent.com/playerony/TensorFlowTTS-ts/main/models/${name}/model.json`,
  );

const loadModels = async () => {
  const vocoder = await loadGraphModel('vocoder');
  const text2mel = await loadGraphModel('text2mel');

  console.log(text2mel, vocoder);
};

loadModels();
