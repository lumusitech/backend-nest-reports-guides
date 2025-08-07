import htmlToPdfMake from 'html-to-pdfmake';
import { JSDOM } from 'jsdom';

interface ContentReplacer {
  [key: string]: string; // idem to Record<string, string>
}

export const getHtmlContent = (
  html: string,
  replaces: ContentReplacer = {},
) => {
  //? replaces is an object with key-value pairs to replace in the html
  Object.entries(replaces).forEach(([key, value]) => {
    const keyPlaceholder = `{{ ${key} }}`; //? to get from html {{ client }} or {{ title }} or others

    html = html.replaceAll(keyPlaceholder, value);
  });

  const { window } = new JSDOM();

  return htmlToPdfMake(html, { window });
};
