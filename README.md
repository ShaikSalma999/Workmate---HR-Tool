# Work Mate – HR & Task Management (React)

Mobile screens built from the Workmate Figma export. React 18, Vite, Tailwind CSS 3, React Router 6, Lucide icons.
No backend: accounts and app data live in `localStorage`.

```bash
npm install
npm start        # http://localhost:3000
```

On desktop the app is a plain 390px-wide, full-height column centred on the page (no device frame); on a phone it fills the screen. Content scrolls inside the screen.

## Demo account

| Sign in with | Value                                   |
| ------------ | --------------------------------------- |
| Email        | `tonald@work.com` / `Work@1234`         |
| Employee ID  | `11234` / `Work@1234`                   |
| Phone        | `+62 82150005000` (then the code)       |

No SMS or email is sent anywhere, so every verification code step (phone sign in, sign up, forgot password) accepts **`123456`**.
There is also a "Fill in the demo account" link on the sign in screen.

## What works

- **Onboarding**: 4 slides (Welcome, Manage Stress, Plan for Success, Navigate Your Work Journey) that slide across by themselves every 3 seconds and keep looping forward until the user taps, swipes, presses a key or uses Next / the dots / Skip. After that nothing moves on its own. Change `AUTO_SLIDE_MS` in `src/screens/Onboarding.jsx` to adjust the interval. The hero images keep their full height; on a short window the page scrolls.
- **Sign in**: email / employee ID / phone. Inline errors for an unregistered email, employee ID or phone, and for a wrong password. "Remember me" keeps the session in `localStorage`, otherwise it ends with the tab.
- **Sign up**: validation (format, duplicate email/phone, password rules), terms sheet, code check, then the account is created and signed in.
- **Forgot password**: email must be registered, code check, new password is saved to the account.
- **Home**: unread badges, join a meeting, open profile / messages / notifications.
- **Attendance**: clock in (location check, selfie), live ticking timer, break / back to work, clock out. History is saved. The state resets the next day.
- **Tasks**: create tasks (they appear in the list and counts), change status, comment, burnout charts.
- **Expense / Leave**: submit forms with pickers and a date (range) calendar; new requests land in Review and update the totals.
- **Messages**: chat with typing indicator, auto replies, photo sending, unread badges.
- **Notifications**: events above create notifications; tap to open, mark all as read.
- **Profile**: edit personal data, office assets, payroll list and detail with a real **PDF download**, change password (checks the current one), FAQ, versioning, reset demo data, logout.

Everything is persisted per account, so reloading keeps you signed in with your data. Profile > Settings > **Reset demo data** restores the starting data.

## Storage keys

| Key                         | Holds                                   |
| --------------------------- | --------------------------------------- |
| `workmate.accounts`         | all accounts (passwords in plain text, demo only) |
| `workmate.session`          | signed-in account id (`sessionStorage` when "Remember me" is off) |
| `workmate.data.v1.<id>`     | tasks, expenses, leaves, attendance, chats, notifications for that account |

Clear these in DevTools to start from scratch. Never store passwords like this in a real app.

## Zoom

Pinch zoom, double-tap zoom, ctrl + scroll and ctrl/cmd + `+` `-` `0` are blocked (`index.html` viewport meta, `touch-action` in `index.css`, `src/utils/disableZoom.js`). Remove the `disableZoom()` call in `src/main.jsx` and the viewport restrictions to bring zoom back.

## Motion

Pure CSS (Tailwind keyframes in `tailwind.config.js`): page slide-in, sheets that slide up and down, sliding tab pill and nav indicator, staggered list entrances, floating illustrations, growing progress bars and charts, shake on form errors, typing dots, pulse on the live clock. `prefers-reduced-motion` turns it all off.

## Structure

```
src/
  assets/       images cropped from the Figma frames
  components/   Button, TextField, Sheet, OptionSheet, CalendarSheet, Tabs, Card, ...
  screens/      one file per screen
  data/         static seed data
  hooks/        useAuth (accounts/session), useData (per-account store + actions)
  utils/        accounts, storage, formatting, pdf
tailwind.config.js   design tokens + animations
```

## Design tokens (`tailwind.config.js`)

- Colors: `gray`, `purple` (brand), `success`, `error`, `warning` scales (25-900) sampled from the Colors board, plus `ink`, `surface`, `nav`.
- Type: Inter, names match the Typography board: `text-display-lg` ... `text-headline-sm`, `text-title-md`, `text-label-md`, `text-body-sm`.
- Shapes: pill buttons, 8px inputs, 12px cards, 28px sheets and header corners.
