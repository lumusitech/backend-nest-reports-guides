import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { StoreReportsService } from './store-reports.service';

@Controller('store-reports')
export class StoreReportsController {
  constructor(private readonly storeReportsService: StoreReportsService) {}

  @Get('orders/:orderId')
  async getOrder(@Param('orderId') orderId: string, @Res() response: Response) {
    const pdfDoc = await this.storeReportsService.getOrderByIdReport(+orderId);
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = `Store - Order by ID - ${orderId}`;
    pdfDoc.pipe(response);
    pdfDoc.end();
  }
}
