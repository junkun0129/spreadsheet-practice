import { dummyTreeNodes } from "../data/categoryEx";

export const fetchData = (data: any) => {
  return new Promise((resolve, error) => {
    setTimeout(() => {
      resolve(data);
    }, 0);
  });
};
