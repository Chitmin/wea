# Setup Dev environment

Check redis (PONG return?).
```bash
redis-cli ping
```
Install redis server if not already yet.
---

Copy `env.example` to `.env`
```bash
cp env.example .env
```
Update the `.env`
---

Run dev server
```bash
pnpm dev
```

**NOTE**: Mock OTP is '123456'
