# Resume Analyzer Angular App

Frontend for a Resume Analyzer project.

## Features
- Register
- Login
- JWT token storage
- Auth interceptor
- Single or batch resume upload
- Upload progress
- Resume history dashboard
- Resume score details page

## Backend endpoints expected

```http
POST /api/auth/register
POST /api/auth/login
POST /api/resumes/upload
GET  /api/resumes
GET  /api/resumes/{id}
```

## Important architecture note
Angular should not upload to S3 using AWS secret keys. The backend should either:

1. Receive files from Angular, upload to S3, save metadata, call scoring API, then return result.
2. Or generate presigned S3 upload URLs, let Angular upload directly to S3, then call backend to start analysis.

This scaffold uses option 1 for simplicity.

## Run

```bash
npm install
npm start
```

API base URL is in:

```ts
src/app/core/api.config.ts
```
