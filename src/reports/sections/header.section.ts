import type { Column, Content } from 'pdfmake/interfaces';
import { DateFormatter } from 'src/helpers';

interface headerOptions {
  title?: string;
  subtitle?: string;
  showLogo?: boolean;
  showDate?: boolean;
}

const logo: Content = {
  image: 'src/assets/tucan-code-logo.png',
  width: 100,
  height: 100,
  margin: [0, 0, 0, 20],
};

const date: Column = {
  text: DateFormatter.getDDMMMMYYYY(new Date()),
  alignment: 'right',
  margin: [20, 30],
  width: 100,
  fontSize: 10,
};

export const headerSection = (options: headerOptions): Content => {
  const { title, subtitle, showDate = true, showLogo = true } = options;

  const headerLogo: Content = showLogo ? logo : '';
  const headerDate: Content = showDate ? date : '';
  const headerTitle: Content = {
    stack: [
      {
        text: title ? title : '',
        alignment: 'center',
        margin: [0, 15, 0, 0],
        style: { fontSize: 20, bold: true },
      },
      {
        text: subtitle ? subtitle : '',
        alignment: 'center',
        margin: [0, 2, 0, 0],
        style: { fontSize: 16 },
      },
    ],
  };

  return {
    columns: [headerLogo, headerTitle, headerDate],
  };
};
