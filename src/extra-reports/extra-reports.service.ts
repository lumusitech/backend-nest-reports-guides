import { Injectable } from '@nestjs/common';
import fs from 'fs';
import type { BufferOptions, TDocumentDefinitions } from 'pdfmake/interfaces';
import { getHtmlContent } from 'src/helpers';
import { PrinterService } from 'src/printer/printer.service';
import { footerSection, headerSection } from 'src/reports';

@Injectable()
export class ExtraReportsService {
  constructor(private readonly printerService: PrinterService) {}

  // eslint-disable-next-line @typescript-eslint/require-await
  async generateHtmlReport() {
    const html = fs.readFileSync('src/reports/html/basic-03.html', 'utf-8');

    const content = getHtmlContent(html, { client: 'Luciano Figueroa' });

    const docDefinitions: TDocumentDefinitions = {
      pageMargins: [40, 110, 40, 60],
      header: headerSection({
        title: 'HTML to pdf Report',
        subtitle: 'Generated from HTML',
      }),
      footer: footerSection,
      content,
    };
    const options: BufferOptions = {};
    const doc = this.printerService.createPDF(docDefinitions, options);
    return doc;
  }
}
