import type { StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';
import { DateFormatter } from 'src/helpers';
import { headerSection } from './sections';

interface ReportValues {
  employerName: string;
  employerPosition: string;
  employeeName: string;
  employeePosition: string;
  employeeStartDate: Date;
  employeeHours: number;
  employeeWorkSchedule: string;
  employerCompany: string;
}

const styles: StyleDictionary = {
  header: {
    bold: true,
    alignment: 'center',
    fontSize: 22,
    margin: [0, 60, 0, 20],
  },
  body: {
    margin: [0, 0, 0, 70],
    alignment: 'justify',
  },
  signature: {
    bold: true,
    fontSize: 14,
  },
  footer: {
    fontSize: 10,
    alignment: 'center',
    italics: true,
  },
};

export const getEmploymentLetterById = (
  values: ReportValues,
): TDocumentDefinitions => {
  const {
    employerName,
    employerPosition,
    employeeName,
    employeePosition,
    employeeStartDate,
    employeeHours,
    employeeWorkSchedule,
    employerCompany,
  } = values;

  const docDefinitions: TDocumentDefinitions = {
    styles,
    pageMargins: [40, 60, 40, 60],
    header: headerSection({
      showLogo: true,
      showDate: true,
    }),
    content: [
      {
        text: `CONSTANCIA DE EMPLEO`,
        style: 'header',
      },
      {
        text: `Yo, ${employerName}, en mi calidad de ${employerPosition} de ${employerCompany}, 
              por medio de la presente certifico que ${employeeName} ha sido empleado en nuestra 
              empresa desde el ${DateFormatter.getDDMMMMYYYY(employeeStartDate)}.\n\n
              Durante su empleo, el Sr./Sra. ${employeeName} ha desempeñado el cargo de ${employeePosition},  demostrando  responsabilidad,  compromiso  y  habilidades  profesionales  en  sus 
              labores.\n\n
              La  jornada  laboral  del  Sr./ Sra.  ${employeeName}  es  de  ${employeeHours}  horas 
              semanales,  con  un  horario  de  ${employeeWorkSchedule},  cumpliendo  con  las  políticas  y 
              procedimientos establecidos por la empresa.\n\n
              Esta constancia se expide a solicitud del interesado para los fines que considere conveniente.`,
        style: 'body',
      },
      { text: 'Atentamente,', style: 'signature' },
      { text: employerName, style: 'signature' },
      { text: employerCompany, style: 'signature' },
      {
        text: DateFormatter.getDDMMMMYYYY(new Date()),
        style: 'signature',
      },
    ],
    footer: {
      text: 'Este documento es una constancia de empleo y no representa un compromiso laboral.',
      style: 'footer',
    },
  };

  return docDefinitions;
};
