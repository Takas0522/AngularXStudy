export const dateFormat = (date: Date, format: string): string => {
  let resDate = format;
  if (resDate.includes('yyyy')) {
    const year = date.getFullYear();
    resDate = resDate.replace('yyyy', year.toString());
  }
  if (resDate.includes('ggg')) {
      if (date >= new Date(2019, 4, 1, 0, 0, 0, 0)) {
        resDate = resDate.replace('ggg', '令和');
      }
      if (date >= new Date(1989, 0, 8, 0, 0, 0, 0)) {
        resDate = resDate.replace('ggg', '平成');
      }
  }
  return resDate;
};
