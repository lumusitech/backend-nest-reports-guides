import { countries as Country } from '@prisma/client';
import type {
  ContentTable,
  TableLayout,
  TDocumentDefinitions,
} from 'pdfmake/interfaces';
import { footerSection, headerSection } from './sections';

interface ReportOptions {
  title?: string;
  subtitle?: string;
  countries: Country[];
}

// TODO: refactor, extract all custom layouts to other file
const myCustomLayout: TableLayout = {
  //? Remember: if necessary, add i or other name, it will take an automatic index. Same with node
  fillColor: (rowIndex: number, node: ContentTable) => {
    if (rowIndex === node.table.body.length - 1) return '#7b90be'; //? if last row add this color
    if (rowIndex === 0) return '#7b90be';
    else if (rowIndex % 2 === 0) return '#F3F3F3';
    else return 'white';
  },
  vLineWidth: () => 0,
  hLineColor: (columnIndex: number) => (columnIndex !== 1 ? '#CCCCCC' : ''),
};

export const getCountryReport = (
  options: ReportOptions,
): TDocumentDefinitions => {
  const { title, subtitle, countries } = options;

  return {
    pageOrientation: 'landscape',
    pageMargins: [40, 110, 40, 60],

    header: headerSection({
      title: title ?? 'Countries Report',
      subtitle: subtitle ?? 'List of countries',
    }),

    content: [
      {
        // layout: 'headerLineOnly', 'lightHorizontalLines', 'noBorders' - go to the doc
        // or define your own custom layout
        layout: myCustomLayout,
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
            ['', '', '', '', '', ''], //? 6 columns

            //? Table Footer - each row with 6 columns
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
              {
                text: `${countries.length} countries`,
                bold: true,
              },
            ],
          ],
        },
      },
      //? title of the next table
      {
        text: 'Totals',
        style: {
          fontSize: 18,
          bold: true,
          margin: [0, 40, 0, 0],
        },
      },
      //? Other Table -> Totals table with only 1 row
      {
        layout: {
          fillColor: (rowIndex: number) => {
            if (rowIndex === 0) return '#7b90be';
            else if (rowIndex % 2 === 0) return '#F3F3F3';
            else return 'white';
          },
          vLineWidth: () => 0,
          //? Remember: if necessary, add i or other name, it will take an automatic index.
          hLineWidth: (i: number) => (i === 1 ? 0 : 1),
        },
        table: {
          headerRows: 1,
          widths: [50, 50, 80, '*', 'auto', '*'], //? 6 columns
          body: [
            [
              //? Column 1
              {
                text: 'TOTAL OF COUNTRIES',
                colSpan: 3,
                bold: true,
                fontSize: 12,
              },
              //? Column 2
              {},
              //? Column 3
              {},
              //? Column 4
              { text: `${countries.length} countries`, bold: true },
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
