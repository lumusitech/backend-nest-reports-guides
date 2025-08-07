import * as Utils from 'src/helpers/chart-utils';
export const getStackedBarsLineChart = (): Promise<string> => {
  const DATA_COUNT = 7;
  const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };

  const labels = Utils.months({ count: 7 });
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: Utils.numbers(NUMBER_CFG),
        borderColor: Utils.NAMED_COLORS.red,
        backgroundColor: Utils.transparentize(Utils.NAMED_COLORS.red, 0.5),
        stack: 'combined',
        type: 'bar',
      },
      {
        label: 'Dataset 2',
        data: Utils.numbers(NUMBER_CFG),
        borderColor: Utils.NAMED_COLORS.blue,
        backgroundColor: Utils.transparentize(Utils.NAMED_COLORS.blue, 0.5),
        stack: 'combined',
      },
    ],
  };

  const config = {
    type: 'line',
    data: data,
  };

  return Utils.chartJsToImage(config);
};
