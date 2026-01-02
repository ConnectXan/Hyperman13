# Vercel Deployment Guide for Hyperman13

## Issues Fixed

1. **CORS Configuration**: Updated to accept all Vercel domains with regex pattern
2. **Vercel.json Configuration**: Fixed routing and build configuration
3. **Build Scripts**: Added proper build scripts for Vercel
4. **API Function**: Updated serverless function export
5. **Dependencies**: Added server dependencies to root package.json

## Environment Variables Setup

In your Vercel dashboard, add these environment variables:

```
ADMIN_USER=connectxan
ADMIN_PASS=cnxn@13
JWT_SECRET=hyper13_secret_key_2024
NODE_ENV=production
```

## Deployment Steps

1. **Push your changes to GitHub**
2. **Connect your repository to Vercel**
3. **Set environment variables in Vercel dashboard**
4. **Deploy**

## Vercel Dashboard Settings

- **Framework Preset**: Other
- **Root Directory**: Leave empty (uses root)
- **Build Command**: `npm run vercel-build`
- **Output Directory**: `client/dist`
- **Install Command**: `npm install`

## Testing After Deployment

1. Visit your deployed site
2. Navigate to `/admin` 
3. Login with:
   - Username: `connectxan`
   - Password: `cnxn@13`

## Troubleshooting

If admin panel still doesn't work:

1. Check Vercel function logs in dashboard
2. Verify environment variables are set
3. Test API endpoints directly: `https://your-app.vercel.app/api/login`

## Database Notes

- SQLite database will be created automatically in serverless environment
- Data persists between function calls during the same session
- For production, consider upgrading to a persistent database like PostgreSQL