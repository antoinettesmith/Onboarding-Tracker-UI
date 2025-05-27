# 🧭 React Onboarding Progress Tracker

A comprehensive, multi-phase onboarding component built with **React** and **Tailwind CSS**. Features dynamic step layouts, progress tracking, and customizable workflows perfect for user onboarding, setup wizards, and multi-step processes.

## ✨ Features

- **Multi-Phase Workflow** – Organize complex processes into distinct phases  
- **Dynamic Step Layouts** – Different visualization styles for each phase  
- **Progress Tracking** – Visual progress bars and completion percentages  
- **Interactive Navigation** – Click to jump between phases and steps  
- **Responsive Design** – Works across desktop and mobile devices  
- **Customizable Styling** – Easy theming with custom color schemes  
- **Step Grouping** – Special grouped layout for complex setup phases  
- **Completion Detection** – Automatic celebration of completion  

## 🚀 Live Demo

[View Live Demo](https://zn4fkl.csb.app/) <!-- Replace with actual URL -->

## 📸 Screenshots

<!-- Insert images like: ![Alt text](url) -->
- Phase Navigation
- Standard Step Layout (Phases 1, 2, 4)
- Grouped Layout (Phase 3)
- Completion State

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Setup

```bash
git clone https://github.com/yourusername/react-onboarding-tracker.git
cd react-onboarding-tracker
npm install    # or yarn install
npm run dev    # or yarn dev
```

Visit `http://localhost:3000` in your browser.

### Basic Implementation

```jsx
import OnboardingProgressTracker from './components/OnboardingProgressTracker';

function App() {
  return (
    <div className="App">
      <OnboardingProgressTracker />
    </div>
  );
}
```

### Custom Phase Configuration

```jsx
const customPhases = [
  {
    name: "Getting Started",
    description: "Initial setup and account creation",
    steps: [
      { name: "Create Account", completed: false },
      { name: "Verify Email", completed: false },
      { name: "Set Password", completed: false },
    ],
  },
  // Add more phases...
];
```

## 🎨 Customization

### Color Themes

```js
 const customColors = {
    purple: "#6b65ff",
    lightGreen: "#d2ff66",
    darkGreen: "#00785d",
    borderGreen: "#00785d",
    checkmarkGreen: "#00785d",
    // New colors for the Site Setup phase groups
    essential: "#6b65ff",
    account: "#4299e1",
    final: "#9061f9",
  };
```

### Phase Types

- **Standard Phases** – Traditional step-by-step layout in rows  
- **Grouped Phases** – Horizontal flow with categorized step groups (like Phase 3)

## 🏗️ Technical Details

### Built With

- React – Component framework with hooks for state management  
- Tailwind CSS – Utility-first CSS framework for styling  
- Modern JavaScript – ES6+ features for clean, maintainable code

### Key Features Implementation

- **State Management** – Uses React useState for phase and step tracking  
- **Dynamic Rendering** – Conditional rendering based on phase type and step status  
- **Event Handling** – Interactive step completion and navigation  
- **Responsive Design** – Tailwind classes for mobile-first responsive layout  

### Component Structure

```
OnboardingProgressTracker/
├── Phase selector navigation
├── Progress bar with completion percentage
├── Dynamic step rendering (standard vs grouped)
├── Current step panel (for special phases)
├── Step content area with forms/inputs
└── Completion celebration message
```

### Project Structure

```
src/
├── App.jsx
├── OnboardingProgressTracker.jsx
├── index.css
├── index.js
├── main.css
├── tailwind.css
```

Other root files:
```
index.html
package.json
tailwind.config.js
```

## 🧪 Testing

Run the test suite:

```bash
npm run test
```

### Tests cover:

- Component rendering  
- State management  
- User interactions  
- Progress calculations  

## 📝 License

This project is licensed under the MIT License – see the LICENSE file for details.
