export const getProgress = () => {
  const progress = localStorage.getItem('germanProgress');
  return progress ? JSON.parse(progress) : {};
};

export const saveProgress = (lessonId, isCompleted) => {
  const current = getProgress();
  current[lessonId] = isCompleted;
  localStorage.setItem('germanProgress', JSON.stringify(current));
};