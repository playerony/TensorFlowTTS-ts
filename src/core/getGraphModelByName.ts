import * as tf from '@tensorflow/tfjs';

const loadGraphModel = (url: string) => tf.loadGraphModel(url);

const getIndexedDBKey = (name: string) => `indexeddb://${name}.model.json`;

const getGithubRawLink = (modelName: string) =>
  `https://raw.githubusercontent.com/playerony/TensorFlowTTS-ts/main/models/${modelName}/model.json`;

export const getGraphModel = async (name: string) => {
  const indexeddbKey = getIndexedDBKey(name);

  try {
    return await loadGraphModel(indexeddbKey);
  } catch (error) {
    const model = await loadGraphModel(getGithubRawLink(name));

    return await model.save(indexeddbKey);
  }
};
