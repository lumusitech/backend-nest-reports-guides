import htmlToPdfMake from 'html-to-pdfmake';
import { JSDOM } from 'jsdom';

export const getHtmlContent = (html: string) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const { window } = new JSDOM();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  return htmlToPdfMake(html, { window });
};
