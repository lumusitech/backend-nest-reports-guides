import type { TableLayout, TDocumentDefinitions } from 'pdfmake/interfaces';

const myCustomLayout: TableLayout = {
  hLineColor: () => '#5f96d4',
  vLineColor: () => '#5f96d4',
};

export const getCommunityReport = (): TDocumentDefinitions => {
  const docDefinitions: TDocumentDefinitions = {
    defaultStyle: {
      fontSize: 10,
    },
    content: [
      //? Header - Logo - Address - No. order
      {
        columns: [
          {
            image: 'src/assets/tucan-code-logo.png',
            width: 50,
          },
          {
            text: 'Forest Admin Community SAP\nRUT: 14.256.1234\nCamino montaña 1234\nTeléfono: 1165432165',
            alignment: 'center',
          },
          {
            layout: myCustomLayout,
            alignment: 'right',
            width: '22%',
            table: {
              body: [
                [
                  {
                    layout: 'noBorders',
                    table: {
                      body: [
                        ['Nro. Fac:', '123456'],
                        ['Fecha:', '01/01/2023'],
                        ['Versión:', '2024-001'],
                      ],
                    },
                  },
                ],
              ],
            },
          },
        ],
      },

      //? Horizontal line
      {
        margin: [0, 10],
        canvas: [
          {
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 520,
            y2: 5,
            lineWidth: 2,
            lineColor: '#5f96d4',
          },
        ],
      },

      //? Client Details
      {
        table: {
          widths: ['auto', '*', 'auto', '*'],
          body: [
            //? Table Header
            [
              {
                text: 'Datos del Cliente',
                fillColor: '#5775e1',
                color: 'white',
                colSpan: 4,
                // border: [false, false, false, false],
              },
              {},
              {},
              {},
            ],
            [
              {
                text: 'Razón Social',
                fillColor: '#343a40',
                color: 'white',
                bold: true,
                // border: [false, false, false, false],
              },
              {
                text: 'Nombre de la Empresa',
                fillColor: 'white',
                // border: [false, false, false, false],
              },
              {
                text: 'Dirección',
                fillColor: '#343a40',
                color: 'white',
                // border: [false, false, false, false],
              },
              {
                text: 'Fake Street 123',
                fillColor: 'white',
                // border: [false, false, false, false],
              },
            ],
            [
              {
                text: 'RUT',
                fillColor: '#343a40',
                color: 'white',
                bold: true,
                // border: [false, false, false, false],
              },
              {
                text: '',
                fillColor: 'white',
                // border: [false, false, false, false],
              },
              {
                text: 'Teléfono',
                fillColor: '#343a40',
                color: 'white',
                // border: [false, false, false, false],
              },
              {
                text: '',
                fillColor: 'white',
                // border: [false, false, false, false],
              },
            ],
            [
              {
                text: 'Giro',
                fillColor: '#343a40',
                color: 'white',
                bold: true,
                // border: [false, false, false, false],
              },
              {
                text: '',
                fillColor: 'white',
                // border: [false, false, false, false],
              },
              {
                text: 'Condición de pago',
                fillColor: '#343a40',
                color: 'white',
                // border: [false, false, false, false],
              },
              {
                text: '',
                fillColor: 'white',
                // border: [false, false, false, false],
              },
            ],
          ],
        },
      },
    ],
  };

  return docDefinitions;
};
