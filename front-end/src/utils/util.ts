export const getCurrentEpoch = () => {
  const secondsSinceEpoch = Math.round(Date.now() / 1000);
  return secondsSinceEpoch;
};
