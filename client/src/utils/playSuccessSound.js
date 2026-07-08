export const playSuccessSound = () => {
  const AudioContext =
    window.AudioContext || window.webkitAudioContext;

  const audioContext = new AudioContext();

  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(
    880,
    audioContext.currentTime
  );

  gainNode.gain.setValueAtTime(
    0.3,
    audioContext.currentTime
  );

  oscillator.start();

  oscillator.frequency.exponentialRampToValueAtTime(
    1320,
    audioContext.currentTime + 0.15
  );

  gainNode.gain.exponentialRampToValueAtTime(
    0.0001,
    audioContext.currentTime + 0.3
  );

  oscillator.stop(audioContext.currentTime + 0.3);
};