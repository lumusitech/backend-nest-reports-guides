import { Injectable } from '@nestjs/common';
import type { BufferOptions } from 'pdfmake/interfaces';
import { PrinterService } from 'src/printer/printer.service';
import { getHelloWorldReport } from 'src/reports';

@Injectable()
export class ExtraReportsService {
  constructor(private readonly printerService: PrinterService) {}

  // eslint-disable-next-line @typescript-eslint/require-await
  async generateHtmlReport() {
    // Logic to generate the HTML report
    const docDefinitions = getHelloWorldReport({ name: 'Luciano' });
    const options: BufferOptions = {};
    const doc = this.printerService.createPDF(docDefinitions, options);
    return doc;
  }
}
