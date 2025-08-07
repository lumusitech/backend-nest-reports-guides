import type { TDocumentDefinitions } from 'pdfmake/interfaces';

import { getDonutChart } from './charts/donut.chart';

export interface TopCountry {
  country: string;
  customersCount: number;
}

export interface ReportOptions {
  title?: string;
  subtitle?: string;
  topCountries: TopCountry[];
}

export const getStatisticsChartSvg = async (
  options: ReportOptions,
): Promise<TDocumentDefinitions> => {
  const donutChart = await getDonutChart({
    entries: options.topCountries.map((country) => ({
      label: country.country,
      value: country.customersCount,
    })),
    position: 'left',
  });
  return {
    content: [
      {
        columns: [
          {
            width: '65%',
            stack: [
              {
                text: 'Top 10 países con más clientes',
                alignment: 'center',
                margin: [0, 0, 0, 10],
              },
              {
                image: donutChart,
                width: 320,
              },
            ],
          },

          {
            layout: 'lightHorizontalLines',
            width: '35%',
            table: {
              headerRows: 1,
              widths: ['60%', '30%'],
              body: [
                ['País', 'Clientes'],
                ...options.topCountries.map((c) => [
                  c.country,
                  c.customersCount,
                ]),
              ],
            },
          },
        ],
      },
    ],
  };
};
