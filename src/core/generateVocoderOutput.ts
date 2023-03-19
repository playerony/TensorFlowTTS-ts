import * as tf from '@tensorflow/tfjs';

const prepareInputs = (stringAsNumbers: number[]) => ({
  input_ids: tf.tensor([stringAsNumbers], undefined, 'int32'),
  speaker_ids: tf.tensor([0], undefined, 'int32'),
  'speed_ratios:0': tf.tensor([1], undefined, 'float32'),
  f0_ratios: tf.tensor([1], undefined, 'float32'),
  energy_ratios: tf.tensor([1], undefined, 'float32'),
});

const getFirstArrayElement = <T>(array: T[] | T): T => (Array.isArray(array) ? array[0] : array);

const executeText2MelModel =
  (text2melModel: tf.GraphModel) => async (inputs: ReturnType<typeof prepareInputs>) => {
    const mel = await text2melModel.executeAsync(inputs);

    return getFirstArrayElement(mel);
  };

export const generateVocoderOutputInstance =
  (vocoderModel: tf.GraphModel, text2melModel: tf.GraphModel) =>
  async (stringAsNumbers: number[]) => {
    const inputs = prepareInputs(stringAsNumbers);
    const mel = await executeText2MelModel(text2melModel)(inputs);

    const vocoderModelResponse = vocoderModel.execute(mel);

    return getFirstArrayElement(vocoderModelResponse);
  };
