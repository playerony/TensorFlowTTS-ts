import * as tf from '@tensorflow/tfjs';

const parseToFloat32Array = (inputArray: Int32Array | Float32Array | Uint8Array): Float32Array => {
  if (inputArray instanceof Float32Array) {
    return inputArray;
  }

  if (inputArray instanceof Int32Array) {
    const float32Array = new Float32Array(inputArray.length);

    for (let i = 0; i < inputArray.length; i++) {
      float32Array[i] = inputArray[i];
    }

    return float32Array;
  }

  if (inputArray instanceof Uint8Array) {
    const int32Array = new Int32Array(inputArray.buffer);
    const float32Array = new Float32Array(int32Array.length);

    for (let i = 0; i < int32Array.length; i++) {
      float32Array[i] = int32Array[i];
    }

    return float32Array;
  }

  throw new Error('Unsupported input array type.');
};

export const playAudio = async (vocoderOutput: tf.Tensor<tf.Rank>) => {
  if (!vocoderOutput.shape[1]) {
    throw new Error('No audio data');
  }

  const vocoderOutputData = await vocoderOutput.data();
  const vocoderOutputDataAsFloat32Array = parseToFloat32Array(vocoderOutputData);

  const audioContext = new AudioContext();
  const buf = audioContext.createBuffer(1, vocoderOutput.shape[1], 22_050);

  buf.copyToChannel(vocoderOutputDataAsFloat32Array, 0);
  const source = audioContext.createBufferSource();

  source.buffer = buf;
  source.connect(audioContext.destination);
  source.start();
};
