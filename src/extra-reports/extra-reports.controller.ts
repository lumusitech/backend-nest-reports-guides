import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { ExtraReportsService } from './extra-reports.service';

@Controller('extra-reports')
export class ExtraReportsController {
  constructor(private readonly extraReportsService: ExtraReportsService) {}

  @Get('html-report')
  async getHtmlReport(@Res() response: Response) {
    const pdfDoc = await this.extraReportsService.generateHtmlReport();
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Hello world Report';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('community-report')
  getCommunityReport(@Res() response: Response) {
    const pdfDoc = this.extraReportsService.generateCommunityReport();
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Billing Report';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }
}
