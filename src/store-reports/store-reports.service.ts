import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import type { BufferOptions, TDocumentDefinitions } from 'pdfmake/interfaces';
import { PrinterService } from 'src/printer/printer.service';
import { orderByIdContent } from 'src/reports/order-by-id.report';

@Injectable()
export class StoreReportsService extends PrismaClient implements OnModuleInit {
  constructor(private readonly printerService: PrinterService) {
    super();
  }
  async onModuleInit() {
    await this.$connect();
  }

  getOrderByIdReport(orderId: string) {
    console.log(orderId);

    const docDefinitions: TDocumentDefinitions = orderByIdContent();
    const options: BufferOptions = {};
    const doc = this.printerService.createPDF(docDefinitions, options);
    return doc;
  }
}
