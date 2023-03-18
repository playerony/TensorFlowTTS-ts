import * as tf from '@tensorflow/tfjs';

const loadGraphModel = (url: string) => tf.loadGraphModel(url);

const getIndexedDBKey = (name: string) => `indexeddb://${name}.model.json`;

const getGithubRawLink = (modelName: string) =>
  `https://raw.githubusercontent.com/playerony/TensorFlowTTS-ts/main/models/${modelName}/model.json`;

export const getGraphModelByName = async (name: string) => {
  const indexedDBKey = getIndexedDBKey(name);

  try {
    return await loadGraphModel(indexedDBKey);
  } catch (error) {
    const model = await loadGraphModel(getGithubRawLink(name));

    return await model.save(indexedDBKey);
  }
};
