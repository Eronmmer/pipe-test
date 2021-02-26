// using this in place of eval()
const evaluate = (evalString: string): boolean | number =>
  Function(`return ${evalString}`)();

export default evaluate;
