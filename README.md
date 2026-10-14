<div align="center">

<img src="frontend/public/favicon.svg" alt="VibeNest logo" width="84" />

# VibeNest

**Come home to how you feel.**

A full-stack wellness companion for tracking moods, journaling, breathing, listening, setting small goals, and seeing the patterns in all of it. ML reads the emotion in what you write.

</div>

<p align="center">
  <img src="frontend/public/images/soundscape.jpg" alt="VibeNest Soundscape page" width="100%" />
</p>

---

## Overview

VibeNest is built around one idea: small, regular check-ins add up to self-knowledge. Each day you log how you feel, write a few lines, take a short breathing break or play a calming track, and tick off a goal or two. VibeNest keeps a streak, turns your entries into charts, and uses language models to pick up the emotions and themes in your journal text.

The interface is a dark, low-light "room" in a warm wine, rose and honey palette. A soft ambient glow behind the app shifts colour with the mood you pick, and turns calm green while you breathe.

> **Note:** VibeNest is a self-reflection tool. Its ML output is not a diagnosis and is not a substitute for professional care. If you are struggling, please reach out to a qualified professional or someone you trust.

## Features

| | |
|---|---|
| **Mood check-in** | Pick from 13 moods and add a note. Each check-in feeds your streak and your daily stats. |
| **Journal** | Write entries on a paper-stack page and flip back through past ones. Entries are analysed for emotion and wellbeing signals. |
| **Breathe** | Guided 5, 10, 15 or 20 minute sessions on a 12-second inhale / exhale rhythm, with optional ambient sound. |
| **Soundscape** | A library of calming tracks. Finishing a track counts towards your listens and your streak. |
| **Timer** | A focus or rest timer with a progress ring, pause and stop, and optional ambient sound. |
| **Goals & Activity** | Set goals with an emoji and a due date, complete today's goals, revisit recent ones and pick from suggested activities. |
| **Insights** | Weekly goal completion, mood distribution, week-over-week comparisons, a 7-day mood trend, your top tracks and a daily reflection box. |
| **Streaks** | A running streak, always visible, that rewards showing up. |
| **Auth** | Email and password sign-up and log-in with JWT sessions. |

<p align="center">
  <img src="frontend/public/images/insights.jpg" alt="VibeNest Insights dashboard" width="49%" />
  <img src="frontend/public/images/checkin.jpg" alt="VibeNest mood check-in" width="49%" />
</p>

## How it works

```
┌────────────────────┐      REST / JSON       ┌─────────────────────┐      ┌───────────────┐
│  React + Vite SPA  │  ───────────────────▶  │  Node + Express API │ ───▶ │    MongoDB    │
│  (frontend/)       │  ◀───────────────────  │  (backend/)         │ ◀─── │   (Mongoose)  │
└────────────────────┘      JWT bearer        └──────────┬──────────┘      └───────────────┘
                                                          │ batched text
                                                          ▼
                                             ┌─────────────────────────┐
                                             │  DistilBERT classifiers │
                                             │  (ml-services/)         │
                                             └─────────────────────────┘
```

1. The SPA talks to the API with a JWT stored after log-in.
2. When a journal entry is saved, the API splits the text into segments and sends them in one batch to two DistilBERT sequence classifiers.
3. The **emotion model** labels each segment as one of `sadness`, `joy`, `love`, `anger`, `fear` or `surprise`.
4. The **wellbeing model** labels each segment with one of seven categories. The most frequent label is kept as a gentle signal alongside the entry.
5. Results roll up into daily stats, which power the Insights charts.

## Tech stack

**Frontend**
- React 19, Vite, React Router
- Chart.js for charts, React Icons for iconography
- Hand-written CSS with a design-token system. No UI framework.
- Self-hosted fonts: Bricolage Grotesque (display), Figtree (interface), Instrument Serif (writing)

**Backend**
- Node.js, Express
- MongoDB with Mongoose
- JSON Web Tokens and bcrypt for authentication
- Axios for calling the ML inference endpoints

**ML**
- Two fine-tuned DistilBERT text classifiers (model configs and tokenizers live in `ml-services/`)

## Project structure

```
VibeNest/
├── frontend/                 React single-page app
│   ├── public/               favicon and product screenshots
│   └── src/
│       ├── pages/            Welcome, Cover, Login, Signup, Main shell
│       ├── feature/          Check-in, Journal, Breathe, Soundscape, Timer, Goals, Activity, Insights
│       ├── components/       Sidebar, cards, charts, forms, shared UI
│       ├── theme/            Mood palette and chart theme
│       ├── styles/           Design tokens (theme.css) and per-component styles
│       └── config.js         API base URL
├── backend/
│   └── src/
│       ├── routes/           Express route modules
│       ├── controllers/      Auth and user controllers
│       ├── models/           Mongoose schemas
│       ├── middleware/       JWT auth middleware
│       └── config/           Database connection
└── ml-services/
    ├── emotion_model_v2/     Emotion classifier config + tokenizer
    └── mental_health_model/  Wellbeing classifier config + tokenizer
```

## API overview

All routes are prefixed with `/api`. Routes marked 🔒 require a `Bearer` token.

| Area | Routes |
|---|---|
| Auth | `POST /auth/signup` · `POST /auth/check-email` · `POST /auth/login` |
| Users | `GET /users/:loginId` · `PUT /users/:loginId` |
| Mood check-ins | 🔒 `POST /feelingentries` · 🔒 `GET /feelingentries/recent` |
| Daily stats | 🔒 `GET /dailystats/:date` · 🔒 `POST /dailystats/update` · 🔒 `GET /dailystats/recent` · 🔒 `GET /dailystats/last` |
| Journal | 🔒 `POST /journal` · 🔒 `GET /journal/recent` |
| Goals | 🔒 `POST /goals` · 🔒 `GET /goals` · 🔒 `GET /goals/recent` · 🔒 `GET /goals/pending` · 🔒 `GET /goals/overdue` · 🔒 `PUT /goals/:id/complete` |
| Activities | `GET /activities` · `GET /activities/suggest` · `POST /activities` |
| Reflections | 🔒 `POST /reflections` · 🔒 `GET /reflections/recent` |
| Soundscape | 🔒 `GET /soundscape/tracks` · 🔒 `POST /soundscape/:trackId/listen` · 🔒 `GET /soundscape/user/listens` · 🔒 `POST /soundscape/add` |
| Timer audio | `GET /timeraudio` · `GET /timeraudio/:name` · `POST /timeraudio/add` |
| Streak | 🔒 `GET /streak` · 🔒 `POST /streak/update` |

## Design language

VibeNest is deliberately **not blue**. The palette is a warm, low-light room:

| Token | Colour | Used for |
|---|---|---|
| Night | `#150B12` | Page background |
| Surface | `#26141F` | Cards and panels |
| Ink | `#F8EBEE` | Primary text |
| Rose | `#FF5C8A` | Primary actions and focus |
| Honey | `#FFC25A` | Streaks and highlights |
| Ember | `#FF8A3D` | Warm secondary accent |
| Mint | `#7FE0C3` | Calm states |

Every mood has its own colour, and that colour drives the ambient glow, the tiles, and the charts. Motion respects `prefers-reduced-motion`, interactive elements are keyboard reachable, and the layout adapts from phone to desktop.
