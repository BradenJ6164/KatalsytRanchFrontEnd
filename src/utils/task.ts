const task = {
  wait: (ms) => new Promise(resolve => setTimeout(resolve, ms)),
};
export default task;
