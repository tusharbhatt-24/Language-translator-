# Lingo: Universal Language Translator

Lingo is a modern, blazing-fast, and beautifully designed language translation application. Built with a universal monorepo architecture, Lingo runs seamlessly on both Web and Mobile devices, sharing core business logic, design tokens, and API services across platforms.

## 🚀 Features
- **Universal Codebase:** Built with Yarn Workspaces. The `shared` package handles APIs and themes, while `web` (React) and `mobile` (React Native) handle the UI.
- **Cross-Platform:** Use Lingo natively on Android or directly in your web browser.
- **Live Translation:** Uses the MyMemory / LibreTranslate API for high-quality real-time translation across dozens of languages.
- **Voice Integrations:** Native device integrations for Speech-to-Text (dictation) and Text-to-Speech (spoken translations).
- **Translation History:** Automatically saves your past translations using fast local device storage.
- **Beautiful UI:** Fully responsive design, gorgeous typography, smooth animations, and automatic Dark Mode support.

## 🔗 Live Links
- **Web App:** Deploy this repository to Vercel to get a live web link.
- **Android App:** You can download the production Android App directly from the deployed Web App URL by navigating to `/lingo.apk`. 

## 🛠 Tech Stack
- **Web:** React, Vite, TypeScript
- **Mobile:** React Native, Expo, Expo Router
- **Shared:** TypeScript, Lucide Icons, Fetch API

## 📦 Local Development

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Run Web App:**
   ```bash
   cd web
   npm run dev
   ```

3. **Run Mobile App:**
   ```bash
   cd mobile
   npx expo start
   ```
