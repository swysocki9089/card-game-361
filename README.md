# Card Games

## About

This project is a full-stack .NET application utilizing React for the frontend, C# for backend logic, and SQL Server for data storage. The main website hosts two fully playable card games: **Solitaire** and **Blackjack**.

## Tech Stack

- **Frontend**: React
- **Backend**: C# (.NET Core)
- **Database**: SQL Server

## Features

### General

- Interactive and responsive web interface.
- Persistent user data stored in SQL Server.

### Solitaire

- Drag-and-drop functionality.
- Automatic detection of valid moves.
- Full game reset capabilities.

### Blackjack

- Local multiplayer for 1-4 players.
- Real-time updates for player actions (hit, stand, etc.).
- Dealer following standard Blackjack rules.

## Potential Future Enhancements

- Add online multiplayer functionality.
- Introduce more card games.
- improve visual effects and animations.

## Installation

### Prerequisites

- [.NET SDK](https://dotnet.microsoft.com/download) installed.
- [Node.js](https://nodejs.org/) installed.
- SQL Server instance configured.

## Running the Project

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### 1. **Clone the Project from GitHub**
   - Navigate to the repository on GitHub and clone the project using the following command:
     ```bash
     git clone <repository-url>
     ```
   - Alternatively you can paste the project URL into Visual Studio in the **Clone Repository** tab

### 2. **Open the Developer Command Prompt**
   - In Visual Studio, go to **Tools** → **Command Line** → **Developer Command Prompt**.

### 3. **Navigate to the Frontend Directory**
   - Use the command line to navigate to the **Frontend** directory:
     ```bash
     cd CardGamesSource
     ```

### 4. **Start the Development Server**
   - Run the following command to start the development server:
     ```bash
     npm run dev
     ```

### 5. **Access the Application**
   - Open your web browser and paste the following URL into the search bar:
     ```
     http://localhost:5173
     ```
