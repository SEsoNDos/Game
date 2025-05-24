export function playMoveSound() {
  const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3');
  audio.volume = 0.3;
  audio.play().catch(() => {});
}

export function playCaptureSound() {
  const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3');
  audio.volume = 0.4;
  audio.play().catch(() => {});
}

export function playCheckSound() {
  const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2573/2573-preview.mp3');
  audio.volume = 0.5;
  audio.play().catch(() => {});
}

export function playLevelCompleteSound() {
  const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2574/2574-preview.mp3');
  audio.volume = 0.6;
  audio.play().catch(() => {});
}