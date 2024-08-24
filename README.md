# Clon Teslo Shop

## Getting Started

1. Clone repository
2. Copy file .env.template and rename a .env
3. Install dependencies
4. Up Data base `docker compose up -d`
5. Run migrations `npx prisma migrate dev`
6. Run seed of data base `pnpm run seed`
7. Run project

This project use pnpm

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your
browser to see the result.

# Deploy

Use a vercel database for deply

1. Create data base in vercel
2. Copy url of the data base
3. Run migrations `npx prisma migrate deploy`
4. Run seed `pnpm seed`
