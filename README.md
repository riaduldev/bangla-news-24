# 📰 Bangla News 24

**A modern Bangla news platform built with Next.js, React, TypeScript, and Better Auth.**

🌐 **Live Demo:** [Visit Bangla News 24](https://bangla-news-24-azure.vercel.app/)

Bangla News 24 is a web-based news platform designed to deliver Bangla news through a modern, responsive, and user-friendly interface. The project combines Next.js App Router, TypeScript, Tailwind CSS, and daisyUI with authentication powered by Better Auth and MongoDB.

## ✨ Features

- 📰 **News Experience** — Browse news content through a clean and organized interface.
- 📱 **Responsive Design** — A layout designed for mobile, tablet, and desktop screens.
- 🔐 **Authentication** — User authentication powered by Better Auth.
- 🗄️ **MongoDB Integration** — MongoDB-backed authentication data storage.
- ⚡ **Next.js App Router** — File-based routing and built-in loading and error handling.
- 🎨 **Modern UI** — Tailwind CSS and daisyUI for styling and reusable UI components.
- 📢 **Marquee Text** — Scrolling text using `react-marquee-text`.
- 🔔 **Toast Notifications** — User feedback and notifications with React Toastify.
- ⏳ **Loading UI** — Custom loading experience using `loading.tsx`.
- 🚨 **Error Handling** — Custom error UI using `error.tsx`.
- 🔎 **Not Found Page** — Custom 404 experience using `not-found.tsx`.
- 🛡️ **Type Safety** — TypeScript for safer and more maintainable code.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Next.js | React framework, App Router, routing, and rendering |
| React | Component-based user interfaces |
| TypeScript | Static type checking |
| Tailwind CSS | Utility-first styling |
| daisyUI | UI components and theme utilities |
| Better Auth | Authentication and session management |
| MongoDB | Database for authentication data |
| `@better-auth/mongo-adapter` | MongoDB integration for Better Auth |
| `react-marquee-text` | Scrolling marquee text |
| React Toastify | Toast notifications |
| Node.js & npm | JavaScript runtime and package management |
| Vercel | Deployment platform |

## 📋 Prerequisites

Before running the project, make sure you have:

- [Node.js](https://nodejs.org/) installed
- npm installed
- A [MongoDB Atlas](https://www.mongodb.com/atlas) account or another accessible MongoDB instance
- A [Git](https://git-scm.com/) installation
- A [Vercel](https://vercel.com/) account for deployment

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/riaduldev/bangla-news-24.git
```

### 2. Navigate to the Project Directory

```bash
cd bangla-news-24
```

### 3. Install Dependencies

```bash
npm install
```

If these packages are not already listed in your `package.json`, install them with:

```bash
npm install react-marquee-text daisyui
```

### 4. Configure Environment Variables

Create a `.env.local` file in the project root directory.

Add the environment variables required by your authentication and database configuration:

```env
BETTER_AUTH_DB_URI=your_mongodb_connection_uri
BETTER_AUTH_SECRET=your_secure_random_secret
BETTER_AUTH_URL=http://localhost:3000
```

**Important:**

- Replace the MongoDB URI with your actual connection string.
- Use a strong, randomly generated secret for `BETTER_AUTH_SECRET`.
- Set `BETTER_AUTH_URL` to the correct base URL for your environment.
- Ensure the variable names match those referenced in `src/lib/auth.ts`.
- Configure production environment variables in your Vercel project settings.
- Never commit `.env.local` or expose database credentials and authentication secrets publicly.

If your authentication configuration uses additional variables, such as OAuth provider credentials or an email service API key, add those as required.

### 5. Set Up MongoDB

1. Create a MongoDB Atlas cluster or use an existing MongoDB instance.
2. Create a database user and configure the required network access.
3. Copy your MongoDB connection URI.
4. Add the URI to `BETTER_AUTH_DB_URI` in `.env.local`.
5. Ensure the database name in your authentication configuration matches your intended database.

The current project configuration uses the `bangla_news` database.

### 6. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 7. Build for Production

```bash
npm run build
```

To run the production build locally:

```bash
npm run start
```

## 🔐 Authentication Setup

Authentication is implemented using Better Auth and MongoDB.

The main setup includes:

1. Install Better Auth and the required MongoDB adapter.
2. Configure environment variables.
3. Create the Better Auth instance in `src/lib/auth.ts`.
4. Connect MongoDB using the configured connection URI.
5. Configure the authentication methods required by the application.
6. Mount the authentication handler in the Next.js API route.
7. Create the client-side authentication instance.
8. Integrate authentication into the relevant UI components.

### Authentication Files

```text
src/
├── app/
│   └── api/
│       └── auth/
│           └── [...all]/
│               └── route.ts
└── lib/
    ├── auth.ts
    └── auth-client.ts
```

The exact file extensions may differ depending on the project configuration.

**Note:** The authentication route should export the appropriate request handlers using the Better Auth integration configured in the project.

## 📁 Project Structure

A simplified example of the project structure:

```text
bangla-news-24/
├── public/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── auth/
│   │   │       └── [...all]/
│   │   ├── loading.tsx
│   │   ├── error.tsx
│   │   ├── not-found.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── lib/
│       ├── auth.ts
│       └── auth-client.ts
├── .env.local
├── .gitignore
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

This is a reference structure. Your actual directories and files may vary as the project evolves.

## ⚙️ Next.js App Router

The project uses Next.js App Router conventions for routing and special UI states.

- **`page.tsx`** — Renders a route's page content.
- **`layout.tsx`** — Provides shared layouts for route segments.
- **`loading.tsx`** — Displays a loading interface while route content loads.
- **`error.tsx`** — Provides a client-side error boundary for supported route errors.
- **`not-found.tsx`** — Displays a custom 404 page for missing content.

These conventions help keep the application organized and improve the user experience during navigation and error states.

## 🎨 Styling and UI

The project uses Tailwind CSS and daisyUI to build responsive interfaces.

- Utility-first styling with Tailwind CSS.
- Reusable UI components and theme utilities from daisyUI.
- Responsive layouts for different screen sizes.
- Custom loading, error, and not-found interfaces.
- Marquee text for scrolling content.
- Toast notifications for user feedback.

## 🚢 Deployment

The project can be deployed on Vercel.

1. Push the project to GitHub.
2. Import the repository into [Vercel](https://vercel.com/).
3. Configure the required environment variables in **Project Settings → Environment Variables**.
4. Ensure the MongoDB instance accepts connections from the deployed application.
5. Deploy the project and check the build logs if any errors occur.

For production deployments, configure the authentication base URL to match your deployed domain.

## 🔒 Security Considerations

- Keep `.env.local` out of version control.
- Never expose MongoDB credentials or authentication secrets in client-side code.
- Use server-side authentication and authorization checks for protected resources.
- Restrict database network access where possible.
- Validate user input before processing or storing it.
- Keep dependencies updated and review security advisories.

## 🧑‍💻 Author

**Riadul Islam**

- GitHub: [@riaduldev](https://github.com/riaduldev)
- LinkedIn: [riaduldev365](https://www.linkedin.com/in/riaduldev365/)

## 📄 License

No license has been specified for this project yet. Add a `LICENSE` file if you intend to distribute the project under an open-source license.

---

*Built with Next.js, TypeScript, and a passion for modern web development.*
