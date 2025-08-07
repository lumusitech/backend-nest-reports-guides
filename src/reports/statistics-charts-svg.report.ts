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
        image: donutChart,
        width: 500,
      },
    ],
  };
};
