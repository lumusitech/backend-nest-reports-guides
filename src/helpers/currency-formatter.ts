export class CurrencyFormatter {
  //   static formatCurrency(value: number): string {
  //     return `$${value.toFixed(2)}`;
  //   }

  //? Better
  static formatCurrency(value: number): string {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
    }).format(value);
  }
}
