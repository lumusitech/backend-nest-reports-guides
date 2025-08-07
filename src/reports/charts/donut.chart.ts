import * as Utils from 'src/helpers/chart-utils';

interface DonutEntry {
  label: string;
  value: number;
}
interface DonutOptions {
  position?: 'left' | 'right' | 'top' | 'bottom';
  entries: DonutEntry[];
}

export const getDonutChart = (options: DonutOptions): Promise<string> => {
  const { position = 'top' } = options;

  const data = {
    labels: options.entries.map((entry) => entry.label),
    datasets: [
      {
        label: 'Donut Dataset',
        data: options.entries.map((entry) => entry.value),
        // backgroundColor: Object.values(Utils.CHART_COLORS),
      },
    ],
  };

  const config = {
    type: 'doughnut',
    data: data,
    options: {
      legend: {
        position,
      },
      plugins: {
        datalabels: {
          //? this style could be retrieved from DonutOptions for more flexibility
          color: '#fff',
          font: {
            weight: 'bold',
            size: 16,
          },
        },
      },
    },
  };

  return Utils.chartJsToImage(config);
};
