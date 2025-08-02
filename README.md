# Reports - Nestjs with PDFMaker

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

After clone, run:

```sh
pnpm i
# run the queries with your DB Manager like PgAdmin4 (insert employees, countries, etc.).
# Just select all content within file, copy, paste in your query runner and then execute for insertion
# generate .env file with .env.template file as reference
docker compose -up -d
npx prisma generate # update the prisma client with new schemas added
pnpm start:dev
```

**NOTE:** After insert other tables within your DB, run `npx prisma db pull` for add the new schemas to `schema.prisma` file. The, run `npx prisma generate` to update the prisma client with the new schemas added.

---

## Key Topics Covered

This section lays the groundwork for working with PDF reports and provides detailed explanations of how the PdfMake tool operates.
Specifically:

1. Report content structure

2. Creating headers and footers

3. Working with images from the backend

4. Date formatting

5. Columns

6. Loading data into the report

7. Custom styles

8. Reusable report sections

9. Generating an employment verification letter (constancia laboral)

---

Second section. Expanding on our report generation guide, this section delves into more advanced techniques for creating robust and dynamic PDF reports using NestJS and pdfMake.

Specifically, we will cover:

1. Reusing components

2. Page numbering in footers

3. Creating and structuring tables

4. Customizing tables

5. Reusable custom styles

6. Integrating multiple tables within a single report

7. Calculating and displaying report totals

## PDF make config

Add esModuleInterop in true within tsconfig.json
The `esModuleInterop: true` setting in `tsconfig.json` is a convenience configuration that enhances TypeScript's compatibility with older JavaScript libraries or those using hybrid export patterns (like pdfmake). It ensures that import statements function as expected in most scenarios, providing a more natural and seamless experience when integrating such popular Node.js ecosystem libraries.

```json
{
  "compilerOptions": {
    // ...other config options
    "esModuleInterop": true
  }
}
```
