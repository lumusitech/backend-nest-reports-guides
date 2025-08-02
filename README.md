# Reports - Nestjs with PDFMaker

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

After clone, run:

```sh
pnpm i
# generate .env file with .env.template file as reference
docker compose -up -d
npx prisma generate
pnpm start:dev
```

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
