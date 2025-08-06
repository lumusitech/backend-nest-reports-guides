import type { TDocumentDefinitions } from 'pdfmake/interfaces';

import * as Utils from 'src/helpers/chart-utils';

export interface TopCountry {
  country: string;
  customersCount: number;
}

export interface ReportOptions {
  title?: string;
  subtitle?: string;
  topCountries: TopCountry[];
}

const generateTopCountryDonut = (
  topCountries: TopCountry[],
): Promise<string> => {
  const data = {
    labels: topCountries.map((data) => data.country),
    datasets: [
      {
        label: 'Cantidad de clientes por país',
        data: topCountries.map((country) => country.customersCount),
        // backgroundColor: Object.values(Utils.CHART_COLORS),
      },
    ],
  };

  const config = {
    type: 'doughnut',
    data: data,
    options: {
      legend: {
        position: 'left',
      },
      plugins: {
        datalabels: {
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

export const getStatisticsChartSvg = async (
  options: ReportOptions,
): Promise<TDocumentDefinitions> => {
  const donutChart = await generateTopCountryDonut(options.topCountries);
  return {
    content: [
      {
        image: donutChart,
        width: 500,
      },
    ],
  };
};
