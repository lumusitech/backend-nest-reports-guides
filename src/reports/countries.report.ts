import { countries as Country } from '@prisma/client';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { footerSection, headerSection } from './sections';

interface ReportOptions {
  title?: string;
  subtitle?: string;
  countries: Country[];
}

export const getCountryReport = (
  options: ReportOptions,
): TDocumentDefinitions => {
  const { title, subtitle, countries } = options;

  return {
    pageOrientation: 'landscape',
    header: headerSection({
      title: title ?? 'Countries Report',
      subtitle: subtitle ?? 'List of countries',
    }),
    pageMargins: [40, 110, 40, 60],
    content: [
      {
        // layout: 'headerLineOnly', 'lightHorizontalLines', 'noBorders' - go to the doc
        // or define your own custom layout
        layout: 'lightHorizontalLines',
        table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          headerRows: 1,
          widths: [50, 50, 50, '*', 'auto', '*'],

          body: [
            ['ID', 'ISO2', 'ISO3', 'NAME', 'CONTINENT', 'LOCAL NAME'],
            ...countries
              .slice(0, 30)
              .map((country) => [
                country.id.toString() ?? '',
                country.iso2 ?? '',
                country.iso3 ?? '',
                { text: country.name ?? '', bold: true },
                country.continent ?? '',
                country.local_name ?? '',
              ]),
          ],
        },
      },
    ],
    footer: footerSection,
  };
};
