import type { Content } from 'pdfmake/interfaces';
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

export const headerSection = (options: headerOptions): Content => {
  const { title, subtitle, showDate = true, showLogo = true } = options;

  const headerTitle: Content = title
    ? { text: title, style: { bold: true, alignment: 'center' } }
    : '';
  const headerSubtitle: Content = subtitle ? { text: subtitle, style: {} } : '';
  const headerLogo: Content = showLogo ? logo : '';
  const headerDate: Content = showDate
    ? {
        text: DateFormatter.getDDMMMMYYYY(new Date()),
        alignment: 'right',
        margin: [20, 20],
      }
    : '';

  return {
    columns: [headerLogo, headerTitle, headerSubtitle, headerDate],
  };
};
