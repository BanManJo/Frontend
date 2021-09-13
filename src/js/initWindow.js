console.log(
  window.innerHeight,
  document.documentElement.clientHeight,
  document.body.clientHeight
);
document.body.style.width = `${window.screen.width}px`;
document.body.style.height = `${window.innerHeight ||
  document.documentElement.clientHeight ||
  document.body.clientHeight}px`;
