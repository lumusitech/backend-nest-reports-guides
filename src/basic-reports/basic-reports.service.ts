import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import type { BufferOptions } from 'pdfmake/interfaces';
import { getEmploymentLetter, getHelloWorldReport } from 'src/reports';
import { PrinterService } from '../printer/printer.service';

@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {
  constructor(private readonly printerService: PrinterService) {
    super();
  }

  async onModuleInit() {
    await this.$connect();
  }

  hello() {
    const docDefinitions = getHelloWorldReport({ name: 'Luciano' });
    const options: BufferOptions = {};
    const doc = this.printerService.createPDF(docDefinitions, options);
    return doc;
  }

  employmentLetter() {
    const docDefinitions = getEmploymentLetter();
    const options: BufferOptions = {};
    const doc = this.printerService.createPDF(docDefinitions, options);
    return doc;
  }
}
