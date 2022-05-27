/**
 * automatically links '>>number'
 */
export const autolink = (str: string, maxNumber: number) => {
  return str.replaceAll(/&gt;&gt;(\d+)/g, (match, number) => {
    if (maxNumber < number) {
      return match;
    }
    return `<a class="number-link" href="#${number}">${match}</a>`;
  });
};
