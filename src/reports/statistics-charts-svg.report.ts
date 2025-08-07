import type { TDocumentDefinitions } from 'pdfmake/interfaces';

import { getStackedBarsLineChart } from './charts';
import { getBarsChart } from './charts/bars.chart';
import { getDonutChart } from './charts/donut.chart';
import { getLineChart } from './charts/line.chart';
import { footerSection, headerSection } from './sections';

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
  const [donutChart, lineChart, barsChart, stackedBarsLineChart] =
    await Promise.all([
      getDonutChart({
        entries: options.topCountries.map((country) => ({
          label: country.country,
          value: country.customersCount,
        })),
        position: 'left',
      }),
      getLineChart(),
      getBarsChart(),
      getStackedBarsLineChart(),
    ]);

  return {
    pageMargins: [40, 100, 40, 60],
    header: headerSection({
      title: options.title ?? 'Estadísticas de Clientes',
      subtitle: options.subtitle ?? 'Informe de clientes por país',
      showLogo: true,
      showDate: true,
    }),
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

      {
        image: lineChart,
        width: 500,
        alignment: 'center',
        margin: [0, 40, 0, 0],
      },

      {
        columnGap: 10,
        columns: [
          {
            image: barsChart,
            width: 250,
            height: 180,
            alignment: 'left',
            margin: [0, 40, 0, 0],
          },
          {
            image: stackedBarsLineChart,
            width: 250,
            height: 180,
            alignment: 'left',
            margin: [0, 40, 0, 0],
          },
        ],
      },
    ],
    footer: footerSection,
  };
};
