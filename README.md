# 💙 Life Support
A free, colourful, and easy-to-use app designed to help elderly users and their families stay connected, organised, and informed.

## 📖 Overview
Life Support was built with love for users like Grandma Olivia — seniors who may not be tech-savvy but deserve a simple, vibrant, and reliable tool to manage their daily lives while staying close to family. The app allows an elderly user and their family members to communicate, share to-do lists, track medications and appointments, check the weather, and more — all in one place.

## 🎯 App Features 
**✅ MVP — Minimum Viable Product**
The core features that must be implemented:
* **User Authentication:** Secure login.
* **Messaging:** Real-time chat.
* **To-Do / Task Management:** View, add, edit, and delete daily/weekly tasks and plans.
* **Shared Plans:** View and share each other's to-do lists.
* **Export / Download:** Download and email task lists to one another.
* **Weather Widget:** Show daily weather for at least two locations (Sarasota, FL & Thousand Oaks, CA).
* **Quick Links:** Add and access frequently visited websites (e.g., NYT, WWD).
* **Colourful, Accessible UI:** Vibrant, colour-coded interface easy to navigate for seniors.

  **🚀 MMP — Minimum Marketable Product**
Features to enhance user experience and stand out from competing projects:
* **Pop-up Motivational Messages:**  Cheerful, randomised messages to brighten Grandma's day
* **Medication & Appointment Reminders:** Push or in-app notifications with customizable schedules
* **Community Session Reminders:** Alerts for weekly group sessions or social events
* **Offline Support:**  Basic functionality even without internet
* **Voice-Friendly Design:** Large buttons, readable fonts, and high-contrast colours
* **Multi-location Weather:** Expandable to more than two locations
* **Profile Customisation:**  Avatar, display name, colour theme preferences

## 🛠️ Tech Stack
| Layer | Technology |
|-------|-----------|
| Frontend framework | React + Vite |
| Styling | CSS (App.css / index.css) |
| Backend & auth | Firebase (Authentication + Firestore) |
| Hosting | Vercel / Netlify |
| Weather | OpenWeatherMap API |
| Real-time messaging | Firebase Firestore (real-time listeners) |


## 📁 Project Structure
```
profswipe/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── screen/
│   │   ├── Dashboard.jsx
│   │   ├── ForgotPassword.jsx
│   │   ├── Links.jsx
│   │   ├── Login.jsx
│   │   ├── Messages.jsx
│   │   └── Tasks.jsx
│   ├── shared/
│   │   ├── AddTaskModal.jsx
│   │   ├── BottomNav.jsx
│   │   ├── CheerPopup.jsx
│   │   └── Topbar.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── main.jsx
│   ├── firebase.js
│   └── index.css
├── .env
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── vite.config.js
└── README.md
```
## UML 
```
┌─────────────────────────────────────────────────────────────────┐
│                     CLIENT — React + Vite                        │
│                                                                   │
│  ┌─────────────┐  ┌─────────────┐  ┌──────────┐  ┌──────────┐  │
│  │    Login    │  │  Dashboard  │  │ Messages │  │  Tasks   │  │
│  │ ForgotPass  │  │  (Weather)  │  │  (Chat)  │  │  Links   │  │
│  └──────┬──────┘  └──────┬──────┘  └────┬─────┘  └────┬─────┘  │
│         │                │               │              │         │
│         └────────────────┴───────────────┴──────────────┘         │
│                                    │                               │
│              ┌─────────────────────▼─────────────────────┐        │
│              │            Shared Components               │        │
│              │   BottomNav · Topbar · CheerPopup          │        │
│              │   AddTaskModal                             │        │
│              └─────────────────────┬─────────────────────┘        │
└────────────────────────────────────┼────────────────────────────── ┘
                                     │
                     ┌───────────────▼───────────────┐
                     │          firebase.js           │
                     │    Config & init layer         │
                     └───────────────┬───────────────┘
                                     │
          ┌──────────────────────────┼──────────────────────────┐
          │                          │                           │
┌─────────▼────────┐      ┌──────────▼─────────┐     ┌─────────▼────────┐
│  Firebase Auth   │      │    Firestore DB     │     │ OpenWeather API  │
│                  │      │                     │     │                  │
│  · Login         │      │  · Messages         │     │  · Sarasota, FL  │
│  · Forgot pass   │      │  · Tasks / lists    │     │  · Thousand      │
│  · Session mgmt  │      │  · User links       │     │    Oaks, CA      │
└──────────────────┘      │  · User profiles    │     └──────────────────┘
                           └─────────────────────┘
```

## Live Demo 
https://prog-5.vercel.app/ 

## Behavioural Model
<img width="1280" height="993" alt="Blank diagram" src="https://github.com/user-attachments/assets/96bc54c2-0eae-460f-9d51-300ef1d16d71" />

## 👥 Team
Name    Role
* Rich-Ann Campbell  Project Manager 
* Makayla Hardware   Frontend Developer 
* Sara-Lee Brown     Backend Developer 




