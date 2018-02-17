export const getProbability = percents => {
  return Math.floor(Math.random() * 1000) + 1 < percents * 10;
};

export const getRandInterval = (min, max) => {
  return Math.random() * (max - min) + min;
};
