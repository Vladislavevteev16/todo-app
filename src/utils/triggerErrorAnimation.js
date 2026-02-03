const DELAY = 600;

export const triggerErrorAnimation = (current, style) => {
  let timerId;

  if (!current) {
    return;
  }

  current.classList.add(`${style}`);

  timerId = setTimeout(() => {
    current.classList.remove(`${style}`);
    clearTimeout(timerId);
  }, DELAY);
};
