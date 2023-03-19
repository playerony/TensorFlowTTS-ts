import * as tf from '@tensorflow/tfjs';

const convertToInt32Array = (inputArray: Uint8Array): Int32Array => {
  return new Int32Array(inputArray.buffer);
};

const convertToFloat32Array = (inputArray: Int32Array): Float32Array => {
  const float32Array = new Float32Array(inputArray.length);
  for (let i = 0; i < inputArray.length; i++) {
    float32Array[i] = inputArray[i];
  }

  return float32Array;
};

const parseToFloat32Array = (inputArray: Int32Array | Float32Array | Uint8Array): Float32Array => {
  if (inputArray instanceof Float32Array) {
    return inputArray;
  }

  if (inputArray instanceof Int32Array) {
    return convertToFloat32Array(inputArray);
  }

  if (inputArray instanceof Uint8Array) {
    const int32Array = convertToInt32Array(inputArray);
    return convertToFloat32Array(int32Array);
  }

  throw new Error('Unsupported input array type.');
};

const createAudioBuffer = (audioData: Float32Array): AudioBuffer => {
  const audioContext = new AudioContext();
  const audioBuffer = audioContext.createBuffer(1, audioData.length, 22_050);
  audioBuffer.copyToChannel(audioData, 0);

  return audioBuffer;
};

const playAudioBuffer = (audioBuffer: AudioBuffer) => {
  const audioContext = new AudioContext();
  const source = audioContext.createBufferSource();

  source.buffer = audioBuffer;
  source.connect(audioContext.destination);
  source.start();
};

export const playAudio = async (vocoderOutput: tf.Tensor<tf.Rank>) => {
  if (!vocoderOutput?.shape?.length || !vocoderOutput.shape[1]) {
    throw new Error('No audio data');
  }

  const vocoderOutputData = await vocoderOutput.data();
  const vocoderOutputDataAsFloat32Array = parseToFloat32Array(vocoderOutputData);
  const audioBuffer = createAudioBuffer(vocoderOutputDataAsFloat32Array);

  playAudioBuffer(audioBuffer);
};
