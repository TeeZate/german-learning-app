# German Learning App

A modern, interactive web application for learning the German language with personalized lessons, progress tracking, and an engaging user experience.

## Features

- **Interactive Lessons**: Comprehensive German language lessons organized by difficulty level (Beginner, Intermediate, Advanced)
- **Lesson Repository**: Browse, search, and filter all available lessons by category, tags, and difficulty
- **Progress Tracking**: Monitor your learning journey with statistics on completed lessons, words learned, and exercises
- **Personalized Dashboard**: View your current streak, level, and recommended lessons
- **Bookmarking System**: Save your favorite lessons for quick access
- **Responsive Design**: Fully responsive interface that works on desktop, tablet, and mobile devices
- **Modern UI**: Sleek, intuitive interface with animations and visual feedback

## Technologies Used

- **React 19**: Modern React with hooks and functional components
- **React Router 7**: For navigation and routing
- **Material UI 7**: Component library for consistent, responsive design
- **Framer Motion**: For smooth animations and transitions
- **SweetAlert2**: For beautiful, customizable alerts and notifications
- **Context API**: For state management across the application

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/german-learning-app.git
   cd german-learning-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Project Structure

```
src/
├── components/       # Reusable UI components
├── context/          # React Context for state management
├── pages/            # Main application pages
├── theme/            # Theme configuration
├── utils/            # Utility functions and helpers
├── App.js            # Main application component
└── index.js          # Application entry point
```

## Key Components

- **Home**: Dashboard with user progress and recommended lessons
- **LessonsRepository**: Browse and search all available lessons
- **LessonPage**: Interactive lesson content and exercises
- **Profile**: User statistics and account settings
- **Navigation**: App navigation with responsive mobile menu

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Icons provided by Material Icons
- Animations powered by Framer Motion
- UI components from Material UI
