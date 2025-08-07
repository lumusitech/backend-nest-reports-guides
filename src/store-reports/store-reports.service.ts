import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import type { BufferOptions, TDocumentDefinitions } from 'pdfmake/interfaces';
import { PrinterService } from 'src/printer/printer.service';
import {
  getBasicChartSvg,
  getStatisticsChartSvg,
  TopCountry,
} from 'src/reports';
import {
  CompleteOrder,
  orderByIdDocDefinitions,
} from 'src/reports/order-by-id.report';

@Injectable()
export class StoreReportsService extends PrismaClient implements OnModuleInit {
  constructor(private readonly printerService: PrinterService) {
    super();
  }
  async onModuleInit() {
    await this.$connect();
  }

  async getOrderByIdReport(orderId: number) {
    const order = (await this.orders.findUnique({
      where: { order_id: orderId },
      include: {
        customers: true,
        order_details: {
          include: {
            products: true,
          },
        },
      },
    })) as unknown as CompleteOrder;

    if (!order)
      throw new NotFoundException(`Order with ID ${orderId} not found`);

    const docDefinitions: TDocumentDefinitions = orderByIdDocDefinitions({
      data: order,
    });
    const options: BufferOptions = {};
    const doc = this.printerService.createPDF(docDefinitions, options);
    return doc;
  }

  async getSVGChartReport() {
    const docDefinitions: TDocumentDefinitions = await getBasicChartSvg();
    const options: BufferOptions = {};
    const doc = this.printerService.createPDF(docDefinitions, options);
    return doc;
  }

  async getSVGStatisticsChartReport() {
    const topCountries = await this.customers.groupBy({
      by: ['country'],
      _count: {
        _all: true,
      },
      orderBy: {
        _count: {
          country: 'desc',
        },
      },
      take: 10,
    });

    const formattedTopCountries = topCountries.map(({ country, _count }) => ({
      country,
      customersCount: _count._all,
    })) as unknown as TopCountry[];

    const docDefinitions: TDocumentDefinitions = await getStatisticsChartSvg({
      topCountries: formattedTopCountries,
    });
    const options: BufferOptions = {};
    const doc = this.printerService.createPDF(docDefinitions, options);
    return doc;
  }
}
