# FinApp Frontend

[Em português](./README_pt.md)

## Overview

FinApp Frontend is a modern, intuitive web interface for personal finance management designed specifically for young
adults and teenagers. Built with Angular 19 and powered by Bun, this frontend provides a fast, engaging, and accessible
digital experience that replaces traditional spreadsheets with a gamified approach to financial management.

---

## Purpose

Deliver a sleek, responsive web application that makes financial management simple, fast, and attractive, promoting
financial education through an intuitive interface and practical features. This frontend serves as the "Duolingo for
finance" user interface, focused on building financial awareness with a friendly design and seamless user experience.

---

## Target Audience

- **Primary**: Young adults (18-25) and teenagers (16-18)
- Digital natives seeking simplicity, speed, and mobility in their financial tools
- Users transitioning to financial independence who prefer visual, interactive experiences

---

## Value Proposition

- **Modern UI/UX**: Clean, intuitive interface optimized for young users
- **Lightning Fast**: Built with Bun for ultra-fast development and performance
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile
- **Real-time Updates**: Live data synchronization with SignalR integration
- **Accessibility**: Designed with inclusivity and ease of use in mind

---

## Project Differentials

- **Youth-Focused Design**: Interface and language tailored specifically for young users
- **Ultra-Fast Performance**: Bun runtime provides exceptional speed and efficiency
- **Progressive Web App**: Mobile-like experience with offline capabilities
- **Micro-Interactions**: Engaging animations and feedback for better user experience
- **Component-Driven**: Modular, reusable Angular components for maintainability

---

## Expected Benefits

- **Enhanced User Engagement**: Interactive and gamified financial tracking
- **Improved Financial Habits**: Visual insights promote better spending awareness
- **Seamless Experience**: Fast loading times and smooth navigation
- **Cross-Platform Consistency**: Unified experience across all devices
- **Educational Integration**: Built-in financial tips and guidance without friction

---

## Frontend Scope

### Includes:

- **User Authentication**: Login, registration, and profile management
- **Dashboard**: Real-time financial overview and key metrics
- **Transaction Management**: Add, edit, and categorize income/expenses _(in progress)_
- **Budget Tracking**: Visual budget management and goal setting _(in progress)_
- **Financial Reports**: Interactive charts and spending insights _(in progress)_
- **Responsive Design**: Mobile-first approach with PWA capabilities
- **Real-time Features**: Live updates via SignalR integration _(in progress)_
- **Accessibility**: WCAG-compliant interface design

### Does not include:

- **Backend Logic**: All business logic handled by the FinApp API
- **Direct Database Access**: Data management through API endpoints only
- **Payment Processing**: Financial transactions handled by backend
- **Native Mobile Apps**: Web-based solution with PWA capabilities

---

## Tech Stack

- **Framework**: Angular 19 with standalone components
- **Runtime**: Bun (package manager and bundler)
- **Styling**: Tailwind CSS + Angular Material
- **State Management**: NgRx for complex state handling
- **Charts**: Chart.js for financial visualizations
- **HTTP Client**: Angular HttpClient with interceptors
- **Real-time**: SignalR client integration
- **Testing**: Jasmine + Karma + Jest
- **PWA**: Angular Service Worker
- **Build Tool**: Angular CLI with Bun integration

---

## How to Run

### Prerequisites

- Node.js (latest LTS version)
- Bun runtime
- Git
- FinApp Backend running (for API integration)

### Installation

**Install Bun (if not already installed):**

```bash
curl -fsSL https://bun.sh/install | bash
```

**Clone the repository:**

```bash
git clone https://github.com/AppFin/fin-frontend.git
cd fin-frontend
```

**Install dependencies:**

```bash
bun install
```

**Configure environment:**

- Copy `src/environments/environment.example.ts` to `src/environments/environment.ts`
- Update API endpoints and configuration based on your backend setup

### Development Commands

**Start development server:**

```bash
bun start
# or
ng serve
```

**Build for production:**

```bash
bun run build
# or
ng build
```

**Run tests:**

```bash
bun test
# or
ng test
```

**Run e2e tests:**

```bash
bun run e2e
# or
ng e2e
```

**Lint code:**

```bash
bun run lint
# or
ng lint
```

---

## Development Server

The application runs on `http://localhost:4200/` with hot module replacement enabled. The development server
automatically reloads when you modify source files.

### Code Scaffolding

Generate new components, services, and other Angular schematics:

```bash
# Generate a new component
ng generate component components/component-name

# Generate a new service
ng generate service services/service-name

# Generate a new module
ng generate module modules/module-name

# View all available schematics
ng generate --help
```

---

## API Integration

This frontend integrates with the FinApp Backend API. Ensure the backend is running and accessible at the configured
endpoint in your environment file.

---

## License

MIT License - see [LICENSE](LICENSE) file for details

---

*This README reflects the vision, architecture, and development approach of the FinApp Frontend, providing clear
guidance for developers and contributors working on the user interface.*