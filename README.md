
# HealthConnect AI

A comprehensive digital health platform connecting patients with medical professionals.

## 🚀 Deployment Instructions

### 1. Push to GitHub
1. Open your terminal in the project root.
2. Initialize git: `git init`
3. Add files: `git add .`
4. Commit: `git commit -m "Initial commit"`
5. Create a new repository on [GitHub](https://github.com/new).
6. Link and push:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

### 2. Deploy to Vercel
1. Go to [Vercel](https://vercel.com/new).
2. Import your GitHub repository.
3. **CRITICAL**: Under "Environment Variables", add:
   - `API_KEY`: Your Google Gemini API Key.
4. Click **Deploy**.

## 🛠 Tech Stack
- **React 19** (Frontend)
- **Vite** (Build Tool)
- **Gemini 3 Flash** (AI Triage & Summarization)
- **Tailwind CSS** (Styling)
