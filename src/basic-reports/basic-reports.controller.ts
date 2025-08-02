import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { BasicReportsService } from './basic-reports.service';

@Controller('basic-reports')
export class BasicReportsController {
  constructor(private readonly basicReportsService: BasicReportsService) {}

  @Get()
  hello(@Res() response: Response) {
    const pdfDoc = this.basicReportsService.hello();
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Hello world doc';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('employment-letter')
  employmentLetter(@Res() response: Response) {
    const pdfDoc = this.basicReportsService.employmentLetter();
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Employment Letter';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }
}
