# ToDo

- auth context
- login page

## Vercel deployment

Deploy this repository as a Vite project:

- Root directory: leave blank; this repository is already the frontend root
- Build command: `npm run build`
- Output directory: `dist`

Add this Vercel environment variable before deploying:

```env
VITE_API_URL=/api
```

The repository's `vercel.json` proxies `/api/*` to the Render backend. Use `/api` in Vercel production as well, then redeploy.
