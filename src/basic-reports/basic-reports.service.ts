import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import type { BufferOptions } from 'pdfmake/interfaces';
import {
  getEmploymentLetter,
  getEmploymentLetterById,
  getHelloWorldReport,
} from 'src/reports';
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

  async employmentLetterById(id: number) {
    const employee = await this.employees.findUnique({ where: { id } });
    if (!employee)
      throw new NotFoundException(`Employee with id ${id} not found`);

    const employeeData = {
      employerName: 'Luciano Figueroa',
      employerPosition: 'Gerente',
      employeeName: employee.name,
      employeePosition: employee.position,
      employeeStartDate: employee.start_date,
      employeeHours: employee.hours_per_day,
      employeeWorkSchedule: employee.work_schedule,
      employerCompany: 'Lumusitech',
    };

    const docDefinitions = getEmploymentLetterById({ ...employeeData });
    return this.printerService.createPDF(docDefinitions);
  }
}
