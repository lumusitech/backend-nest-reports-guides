import type { StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from './sections';

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

export const getEmploymentLetter = (): TDocumentDefinitions => {
  const docDefinitions: TDocumentDefinitions = {
    styles,
    pageMargins: [40, 60, 40, 60],
    header: headerSection({
      showLogo: true,
      showDate: true,
    }),
    content: [
      {
        text: 'CONSTANCIA DE EMPLEO',
        style: 'header',
      },
      {
        text: `Yo, [Nombre del Empleador], en mi calidad de [Cargo del Empleador] de [Nombre de la Empresa], 
              por medio de la presente certifico que [Nombre del Empleado] ha sido empleado en nuestra 
              empresa desde el [Fecha de Inicio del Empleado].\n\n
              Durante su empleo, el Sr./Sra. [Nombre del Empleado] ha desempeñado el cargo de [Cargo del 
              Empleado],  demostrando  responsabilidad,  compromiso  y  habilidades  profesionales  en  sus 
              labores.\n\n
              La  jornada  laboral  del  Sr./ Sra.  [Nombre  del  Empleado]  es  de  [Número  de  Horas]  horas 
              semanales,  con  un  horario  de  [Horario  de  Trabajo],  cumpliendo  con  las  políticas  y 
              procedimientos establecidos por la empresa.\n\n
              Esta constancia se expide a solicitud del interesado para los fines que considere conveniente.`,
        style: 'body',
      },
      { text: 'Atentamente,', style: 'signature' },
      { text: '[Nombre del Empleador],', style: 'signature' },
      { text: '[Cargo del Empleador],', style: 'signature' },
      { text: '[Nombre de la Empresa],', style: 'signature' },
      { text: '[Fecha de Emisión],', style: 'signature' },
    ],
    footer: {
      text: 'Este documento es una constancia de empleo y no representa un compromiso laboral.',
      style: 'footer',
    },
  };

  // `Atentamente,
  // [Nombre del Empleador]
  // [Cargo del Empleador]
  // [Nombre de la Empresa]
  // [Fecha de Emisión]
  // 20 de mayo de 2024
  // Este documento es una constancia de empleo y no representa un compromiso laboral.`

  return docDefinitions;
};
