import * as Pitchfinder from 'pitchfinder';

onmessage = (e) => {
  const { peaks, sampleRate = 8000 } = e.data;
  const detectPitch = Pitchfinder.YIN({ sampleRate });
  const duration = peaks.length / sampleRate;
  const bpm = peaks.length / duration / 60;
  const frequencies = Pitchfinder.frequencies(detectPitch, peaks, { tempo: bpm });

  // Find the baseline frequency (the value that appears most often)
  const frequencyMap: Record<number, number> = {};
  let maxAmount = 0;
  let baseFrequency = 0;
  frequencies.forEach((frequency) => {
    if (!frequency) return;
    const tolerance = 10;
    frequency = Math.round(frequency * tolerance) / tolerance;
    if (!frequencyMap[frequency]) frequencyMap[frequency] = 0;
    frequencyMap[frequency] += 1;
    if (frequencyMap[frequency] > maxAmount) {
      maxAmount = frequencyMap[frequency];
      baseFrequency = frequency;
    }
  });

  postMessage({
    frequencies,
    baseFrequency,
  });
};
