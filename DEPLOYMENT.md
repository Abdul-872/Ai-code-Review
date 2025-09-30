# AI Code Review - Deployment Guide

## Issues Fixed

1. **Fixed Gemini API Model Name**: Changed from `gemini-2.5-flash` (which doesn't exist) to `gemini-1.5-flash`
2. **Added Proper Error Handling**: Enhanced error handling in both backend service and controller
3. **Improved Frontend Error Display**: Better error messages and loading states
4. **Environment Configuration**: Added environment variable support for API URLs
5. **Vercel Configuration**: Added proper deployment configs for both frontend and backend

## Local Development

### Backend Setup
1. Navigate to Backend directory: `cd Backend`
2. Install dependencies: `npm install`
3. Make sure your `.env` file has the correct API key:
   ```
   GOOGLE_GEMINI_KEY=your_actual_gemini_api_key_here
   ```
4. Start the server: `npm start`

### Frontend Setup
1. Navigate to Frontend directory: `cd Frontend`
2. Install dependencies: `npm install`
3. Start the dev server: `npm run dev`

## Vercel Deployment

### Backend Deployment
1. Deploy the `Backend` folder to Vercel
2. Set environment variable in Vercel dashboard:
   - `GOOGLE_GEMINI_KEY` = your actual Gemini API key
3. Note the deployed backend URL (e.g., `https://your-backend-abc123.vercel.app`)

### Frontend Deployment
1. Update `Frontend/.env.production` with your actual backend URL:
   ```
   VITE_API_URL=https://your-backend-abc123.vercel.app
   ```
2. Deploy the `Frontend` folder to Vercel

## Environment Variables

### Backend
- `GOOGLE_GEMINI_KEY`: Your Google Gemini API key

### Frontend
- `VITE_API_URL`: Backend API URL (automatically set based on environment)

## Testing the Fix

1. Deploy both backend and frontend
2. Open your frontend URL
3. Enter some code in the editor
4. Click "review" button
5. You should see the AI code review response instead of the 500 error

## Common Issues

1. **Invalid API Key**: Make sure your Gemini API key is correct and has proper permissions
2. **CORS Issues**: The backend is configured with CORS enabled for cross-origin requests
3. **Environment Variables**: Ensure all environment variables are set correctly in Vercel dashboard