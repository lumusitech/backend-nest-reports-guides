import { Module } from '@nestjs/common';
import { PrinterModule } from 'src/printer/printer.module';
import { ExtraReportsController } from './extra-reports.controller';
import { ExtraReportsService } from './extra-reports.service';

@Module({
  controllers: [ExtraReportsController],
  providers: [ExtraReportsService],
  imports: [PrinterModule],
})
export class ExtraReportsModule {}
