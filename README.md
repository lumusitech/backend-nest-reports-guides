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

**NOTE:** After inserting new tables in your database, run `npx prisma db pull` to add the new schemas to `schema.prisma`. Then, run `npx prisma generate` to update the Prisma client with the newly added schemas.

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

---

Third section. We'll Build a comprehensive purchase receipt based on a series of master-detail tables. We're going the extra mile to make this detail section as complex and true-to-life as possible.

Specifically, we'll cover:

1. QR Codes: Implementing and integrating QR codes.

2. Inner Joins: Handling data relationships using inner joins. The query below retrieves all the data needed for a specific order using native SQL. However, we will achieve the same result using Prisma.

   ```sql
    SELECT
      *
    FROM
      ORDERS
      INNER JOIN ORDER_DETAILS ON ORDERS.ORDER_ID = ORDER_DETAILS.ORDER_ID
      INNER JOIN PRODUCTS ON ORDER_DETAILS.PRODUCT_ID = PRODUCTS.PRODUCT_ID
      INNER JOIN CATEGORIES ON PRODUCTS.CATEGORY_ID = CATEGORIES.CATEGORY_ID
      INNER JOIN CUSTOMERS ON ORDERS.CUSTOMER_ID = CUSTOMERS.CUSTOMER_ID
    WHERE
      ORDERS.ORDER_ID = 10248;
   ```

   OR:

   ```sql
    SELECT
      O.ORDER_ID,
      O.ORDER_DATE,
      C.CUSTOMER_ID,
      C.CUSTOMER_NAME,
      C.CONTACT_NAME,
      OD.PRODUCT_ID,
      P.PRODUCT_NAME,
      P.PRICE,
      OD.QUANTITY,
      (P.PRICE * OD.QUANTITY) AS TOTAL_ITEM,
      CAT.CATEGORY_ID,
      CAT.CATEGORY_NAME
    FROM
      ORDERS O
      INNER JOIN CUSTOMERS C ON O.CUSTOMER_ID = C.CUSTOMER_ID
      INNER JOIN ORDER_DETAILS OD ON O.ORDER_ID = OD.ORDER_ID
      INNER JOIN PRODUCTS P ON OD.PRODUCT_ID = P.PRODUCT_ID
      INNER JOIN CATEGORIES CAT ON P.CATEGORY_ID = CAT.CATEGORY_ID
    WHERE
      O.ORDER_ID = 10248;
   ```

   Using Prisma:

   ```typescript
   const order = await this.orders.findUnique({
     where: { order_id: orderId },
     include: {
       customers: true,
       order_details: {
         include: {
           products: true,
         },
       },
     },
   });
   ```

3. Tables & Styling: Advanced table creation and custom styling.

4. Structure & Alignment: Mastering document structure and precise content alignment.

5. Prisma Data Integration: Seamlessly passing data from Prisma to your reports.

---

Fourth section. We'll learn how to generate various charts and embed them into our reports. We'll also work with SVGs, treating them just like any other image.

Specifically, we'll cover:

1. Chart.js: Generating charts using this library.

2. Prisma Count Queries: Efficiently fetching data for our charts with count queries. The query below retrieves all the data needed using native SQL. However, we will achieve the same result using Prisma.

   ```sql
     SELECT
       COUNT(*),
       COUNTRY
     FROM
       CUSTOMERS
     GROUP BY
       COUNTRY
     ORDER BY
       COUNT(*) DESC
     LIMIT
       10;
   ```

   Using Prisma:

   ```typescript
   const topCountries = await this.customers.groupBy({
     by: ['country'],
     _count: {
       _all: true,
     },
     orderBy: {
       _count: {
         country: 'desc',
       },
     },
     take: 10,
   });
   ```

3. Chart Types:
   1. Doughnut charts

   2. Line charts

   3. Bar charts

4. Custom Placement: Positioning charts precisely within the report.

5. Parameterization: Making charts reusable and dynamic with custom parameters.

---

In this final section, we'll focus on two main tasks:

1. Converting HTML content to PdfMake.

2. Developing complex table designs.

This section aims to explore simple methods for creating elaborate and complex content, allowing us to build visually appealing and sophisticated reports.

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
