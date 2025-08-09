import { Injectable } from '@nestjs/common';
import fs from 'fs';
import type { BufferOptions, TDocumentDefinitions } from 'pdfmake/interfaces';
import { getHtmlContent } from 'src/helpers';
import { PrinterService } from 'src/printer/printer.service';
import { footerSection, getCommunityReport, headerSection } from 'src/reports';

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

  generateCommunityReport() {
    const docDefinitions = getCommunityReport();
    const doc = this.printerService.createPDF(docDefinitions);
    return doc;
  }

  generateCustomSizeReport() {
    const doc = this.printerService.createPDF({
      //? pageSize allow us to change the page size
      //? pageSize: 'A4',
      //? Or we can define exact size for tickets and others
      pageSize: {
        width: 200,
        height: 'auto',
      },
      content: [
        {
          qr: 'https://devtalles.com',
          fit: 100,
          alignment: 'center',
        },
        {
          text: 'Reporte con tamaño personalizado',
          fontSize: 16,
          alignment: 'center',
          margin: [0, 20],
        },
      ],
    });
    return doc;
  }
}
