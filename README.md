# 🛡️ Unanswered Avenger

> "Your questions deserve answers. Or else..."

Are you tired of people ghosting your questions on Twitter? Let **Unanswered Avenger** serve cold, sweet Twitter justice. It’s a bot that detects when someone ignores your tweets — especially your carefully crafted questions — and mutes or blocks them after a configurable number of offenses.

Because if they can’t answer you... they don’t deserve to follow you 😎

---

## 🧠 What It Does

- Scans your replies to others
- Detects if a reply is a **question** (supports Persian and Turkish in Arabic script)
- Waits for a configurable time (default: 24 hours)
- Checks if the user responded
- Tracks repeat offenders (default: 3 strikes)
- **Mutes or blocks** them automatically
- Logs everything to **daily log files**

---

## ⚙️ How It Works

1. Loads your Twitter user ID and username from `.env`
2. Fetches your latest replies using Twitter API v2
3. Detects which replies are actual questions
4. Waits for X hours (default: 24) to see if the user replied
5. Tracks how many times each user has ignored your questions
6. If they reach the limit (default: 3), they’re muted or blocked
7. All actions are logged in `logs/YYYY-MM-DD.log`

---

## 🧰 Requirements

### Node.js & NPM

Make sure you have Node.js v16+ installed:

```bash
node -v
npm -v
```

### Install dependencies

```bash
npm install
```

---

## 📦 Setup

### 1. Clone the repo

```bash
git clone https://github.com/yourname/unanswered-avenger.git
cd unanswered-avenger
```

### 2. Create a `.env` file

```
TWITTER_BEARER_TOKEN=your_token_here
UNANSWERED_LIMIT=3
TIME_LIMIT_HOURS=24
ACTION_TYPE=mute # or block
CHECK_INTERVAL=3600000 # 1 hour
MY_TWITTER_USER_ID=xxx
MY_TWITTER_USERNAME=your_twitter_name
PERSIAN_QUESTION_WORDS=
TURKISH_QUESTION_WORDS=
```

// or copy the .env.sample file

> 🛑 Note: This project uses OAuth 2.0 Bearer Token (App-Only), so you cannot use endpoints like `/users/me`. You must manually set your user ID and username.

### 3. Run it!

```bash
npm run dev
```

> The Avenger will run periodically and log actions to the `logs/` folder.

---

## 📁 Example Log

```
[2025-03-23T12:30:45.123Z] User: 147258369 | Action: mute | Attempts: 3 | Reason: Ignored question
```


---

## 🤝 Contributing

Feel free to fork and PR. Just don’t ghost my issues 😉

---

## 📜 License

MIT — Use, modify, and mute responsibly.

---

It's a hubby project! made with <3 for U