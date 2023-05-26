export const convertSeconds = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  let secondsLeft = (seconds - minutes * 60) % 60;
  if (secondsLeft < 10) secondsLeft = `0${secondsLeft}`;
  return minutes < 10 ? `0${minutes}:${secondsLeft}` : `${minutes}:${secondsLeft}`;
};
