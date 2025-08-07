import * as Utils from 'src/helpers/chart-utils';

// export const getBarsChart = (): Promise<string> => {
//   const data = {
//     labels: ['Category 1', 'Category 2', 'Category 3'],
//     datasets: [
//       {
//         label: 'Bar Chart Dataset',
//         data: Utils.numbers({ count: 3, min: 0, max: 100 }),
//         backgroundColor: Utils.NAMED_COLORS.blue,
//       },
//     ],
//   };

//   const config = {
//     type: 'bar',
//     data: data,
//   };

//   //   return Utils.chartJsToImage(config, { width: 500, height: 200 });
//   return Utils.chartJsToImage(config);
// };

export const getBarsChart = (): Promise<string> => {
  const DATA_COUNT = 7;
  const NUMBER_CFG = { count: DATA_COUNT, min: -100, max: 100 };

  const labels = Utils.months({ count: 7 });
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Fully Rounded',
        data: Utils.numbers(NUMBER_CFG),
        borderColor: Utils.NAMED_COLORS.red,
        backgroundColor: Utils.transparentize(Utils.NAMED_COLORS.red, 0.5),
        borderWidth: 2,
        borderRadius: Number.MAX_VALUE,
        borderSkipped: false,
      },
      {
        label: 'Small Radius',
        data: Utils.numbers(NUMBER_CFG),
        borderColor: Utils.NAMED_COLORS.blue,
        backgroundColor: Utils.transparentize(Utils.NAMED_COLORS.blue, 0.5),
        borderWidth: 2,
        borderRadius: 5,
        borderSkipped: false,
      },
    ],
  };

  const config = {
    type: 'bar',
    data: data,
  };

  //   return Utils.chartJsToImage(config, { width: 250, height: 200 });
  return Utils.chartJsToImage(config);
};
