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

export interface CompleteOrder {
  order_id: number;
  customer_id: number;
  order_date: Date;
  customers: Customers;
  order_details: OrderDetail[];
}

export interface Customers {
  customer_id: number;
  customer_name: string;
  contact_name: string;
  address: string;
  city: string;
  postal_code: string;
  country: string;
}

export interface OrderDetail {
  order_detail_id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  products: Products;
}

export interface Products {
  product_id: number;
  product_name: string;
  category_id: number;
  unit: string;
  price: string;
}

interface ReportValues {
  title?: string;
  subtitle?: string;
  data: CompleteOrder;
}

export const orderByIdDocDefinitions = (
  values: ReportValues,
): TDocumentDefinitions => {
  const { title, subtitle, data } = values;
  const { customers: customer, order_details: orderDetails } = data;

  console.log({ title, subtitle, data });

  const TAX_RATE = 0.16; // Assuming a tax rate of 16%
  const subtotal = orderDetails.reduce(
    (acc, actual) => acc + +actual.products.price * actual.quantity,
    0,
  );
  const total = subtotal + subtotal * TAX_RATE;

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
              { text: `Recibo No#: ${data.order_id}\n`, bold: true },
              `Fecha del recibo: ${DateFormatter.getDDMMMMYYYY(data.order_date)}\nPagar antes de ${DateFormatter.getDDMMMMYYYY(new Date())}\n`,
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
        text: `Razón Social: ${customer.customer_name}\nContacto: ${customer.contact_name}\nDirección: ${customer.address}\n`,
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
            // [
            //   '1',
            //   'some description',
            //   '2',
            //   {
            //     text: CurrencyFormatter.formatCurrency(4000),
            //     alignment: 'right',
            //   },
            //   {
            //     text: CurrencyFormatter.formatCurrency(8000),
            //     alignment: 'right',
            //   },
            // ],
            ...orderDetails.map((detail) => [
              detail.order_detail_id,
              detail.products.product_name,
              detail.quantity,
              {
                text: CurrencyFormatter.formatCurrency(+detail.products.price),
                alignment: 'right',
              },
              {
                text: CurrencyFormatter.formatCurrency(
                  +detail.products.price * detail.quantity,
                ),
                alignment: 'right',
              },
            ]),
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
                    text: CurrencyFormatter.formatCurrency(subtotal),
                    bold: true,
                    alignment: 'right',
                  },
                ],
                [
                  'Imp. (16%): ',
                  {
                    text: CurrencyFormatter.formatCurrency(subtotal * TAX_RATE),
                    alignment: 'right',
                  },
                ],
                [
                  { text: 'Total: ', bold: true },
                  {
                    text: CurrencyFormatter.formatCurrency(total),
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
