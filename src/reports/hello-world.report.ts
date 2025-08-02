import type { TDocumentDefinitions } from 'pdfmake/interfaces';

interface ReportOptions {
  name: string;
}

export const getHelloWorldReport = (
  options: ReportOptions,
): TDocumentDefinitions => {
  const { name } = options;
  const docDefinitions: TDocumentDefinitions = { content: [`Hello ${name}`] };

  return docDefinitions;
};
