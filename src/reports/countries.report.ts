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
          //? 6 Columns
          widths: [50, 50, 80, '*', 'auto', '*'],

          body: [
            //? Header
            ['ID', 'ISO2', 'ISO3', 'NAME', 'CONTINENT', 'LOCAL NAME'],

            //? Dynamic Content
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

            //? Added to add a new separation line within table to then, give totals and others
            ['', '', '', '', '', ''],

            //? Table Footer - each table with 6 columns
            //! Warning: give content or empty string for each column
            [
              //? Column 1
              '',
              //? Column 2
              '',
              //? Column 3
              '',
              //? Column 4
              '',
              //? Column 5
              'TOTAL:',
              //? Column 6
              { text: `${countries.length} countries`, bold: true },
            ],
          ],
        },
      },
      // Totals table
      {
        text: 'Totals',
        style: {
          fontSize: 18,
          bold: true,
          margin: [0, 40, 0, 0],
        },
      },
      {
        layout: 'noBorders',
        table: {
          headerRows: 1,
          widths: [50, 50, 80, '*', 'auto', '*'], //? 6 columns
          body: [
            [
              //? Column 1
              { text: 'Total of countries', colSpan: 2, bold: true },
              //? Column 2
              {},
              //? Column 3
              { text: `${countries.length} countries`, bold: true },
              //? Column 4
              {},
              //? Column 5
              {},
              //? Column 6
              {},
            ],
          ],
        },
      },
    ],

    footer: footerSection,
  };
};
