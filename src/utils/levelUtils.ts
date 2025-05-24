interface LevelCompletion {
  completed: boolean;
  attempts: number;
}

export function getLevelCompletion(level: number): LevelCompletion {
  const savedData = localStorage.getItem(`level-${level}`);
  if (!savedData) {
    return { completed: false, attempts: 0 };
  }
  
  try {
    return JSON.parse(savedData);
  } catch (e) {
    return { completed: false, attempts: 0 };
  }
}

export function saveLevelCompletion(level: number, completed: boolean, attempts?: number): void {
  const current = getLevelCompletion(level);
  const newData: LevelCompletion = {
    completed: completed || current.completed,
    attempts: attempts !== undefined ? attempts : current.attempts
  };
  
  localStorage.setItem(`level-${level}`, JSON.stringify(newData));
}

export function getTotalLevelsCompleted(): number {
  let count = 0;
  for (let i = 1; i <= 10; i++) {
    if (getLevelCompletion(i).completed) {
      count++;
    }
  }
  return count;
}

export function getCurrentLevel(): number {
  const savedLevel = localStorage.getItem('currentLevel');
  return savedLevel ? parseInt(savedLevel, 10) : 1;
}