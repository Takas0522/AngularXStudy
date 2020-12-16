import { DataInterface } from '../models/data.interface';

const genMockData = (): DataInterface[] => {
  return Array.from(Array(10)).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      id: i,
      name: `${i}さん`,
      addDate: d
    };
  });
};

export const mockData: DataInterface[] = genMockData();
