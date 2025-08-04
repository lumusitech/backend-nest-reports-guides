import type {
  Content,
  StyleDictionary,
  TDocumentDefinitions,
} from 'pdfmake/interfaces';
import { DateFormatter } from 'src/helpers';
import { CurrencyFormatter } from './../helpers/currency-formatter';
import { footerSection } from './sections';

const logo: Content = {
  image: 'src/assets/tucan-banner.png',
  width: 100,
  height: 30,
  margin: [10, 30],
};

const styles: StyleDictionary = {
  header: {
    fontSize: 20,
    bold: true,
    margin: [0, 20, 0, 0],
  },
  subHeader: {
    bold: true,
    fontSize: 16,
    marginBottom: 10,
  },
};

export const orderByIdContent = (): TDocumentDefinitions => {
  return {
    styles: styles,
    pageMargins: [40, 60],
    header: logo,

    content: [
      // HEADER
      { text: 'Tucan Code', style: 'header' },

      // COMPANY ADDRESS AND ORDER NUMBER
      {
        columns: [
          {
            text: '15 Montgomery Str, Suite 100\nOttawa On K2Y 9X1, Canada\nBN: 12783671823\nhttps://pagocam.com',
            bold: true,
          },
          {
            text: [
              { text: 'Recibo No#: 123123\n', bold: true },
              `Fecha del recibo: ${DateFormatter.getDDMMMMYYYY(new Date())}\nPagar antes de ${DateFormatter.getDDMMMMYYYY(new Date())}\n`,
            ],
            alignment: 'right',
          },
        ],
      },

      // QR CODE - WEB
      //? basic usage
      //   { qr: 'text in QR' },

      //? colored QR
      //   { qr: 'text in QR', foreground: 'red', background: 'yellow' },

      //? resized QR
      //   { qr: 'text in QR', fit: 500 },
      {
        qr: 'https://pagocam.com',
        fit: 75,
        alignment: 'right',
      },

      // CUSTOMER ADDRESS
      { text: 'Cobrar a:\n', style: 'subHeader' },
      {
        text: 'Razón Social: Richter Supermarket\nMichael Holz\nGrenzacherweg 237\n',
      },

      // DETAILS ORDER TABLE
      {
        margin: [0, 20, 0, 0],
        layout: 'headerLineOnly',
        table: {
          headerRows: 1,
          widths: ['auto', '*', 'auto', 'auto', 'auto'],
          body: [
            ['ID', 'Descripción', 'Cantidad', 'Precio', 'Total'],
            [
              '1',
              'some description',
              '2',
              {
                text: CurrencyFormatter.formatCurrency(4000),
                alignment: 'right',
              },
              {
                text: CurrencyFormatter.formatCurrency(8000),
                alignment: 'right',
              },
            ],
          ],
        },
      },

      // SEPARATION
      '\n\n',

      // TOTALS TABLE
      {
        columns: [
          {
            width: '*',
            text: '',
          },
          {
            width: 'auto',
            layout: 'noBorders',
            table: {
              body: [
                [
                  'Subtotal: ',
                  {
                    text: CurrencyFormatter.formatCurrency(1500),
                    bold: true,
                    alignment: 'right',
                  },
                ],
                [
                  { text: 'Total: ', bold: true },
                  {
                    text: CurrencyFormatter.formatCurrency(5000),
                    bold: true,
                    alignment: 'right',
                  },
                ],
              ],
            },
          },
        ],
      },
    ],

    // FOOTER
    footer: footerSection,
  };
};
