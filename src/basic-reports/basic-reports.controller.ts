import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { BasicReportsService } from './basic-reports.service';

@Controller('basic-reports')
export class BasicReportsController {
  constructor(private readonly basicReportsService: BasicReportsService) {}

  @Get()
  getHelloReport(@Res() response: Response) {
    const pdfDoc = this.basicReportsService.hello();
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Hello world Report';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('employment-letter')
  getEmploymentLetterReport(@Res() response: Response) {
    const pdfDoc = this.basicReportsService.employmentLetter();
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Employment Letter Report';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('employment-letter/:id')
  async getEmploymentLetterByIdReport(
    @Res() response: Response,
    @Param('id') id: string,
  ) {
    const pdfDoc = await this.basicReportsService.employmentLetterById(+id);
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Employment Letter by ID Report';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('countries')
  async getCountriesReport(@Res() response: Response) {
    const pdfDoc = await this.basicReportsService.getCountries();
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Countries Report';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }
}
