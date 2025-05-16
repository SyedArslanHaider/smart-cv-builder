# React Application

## Overview

This is a React frontend application starter template for your final project. It is built using modern React with Vite for fast development and optimized production builds. The project includes routing, a Playground component for isolated UI testing, and global styles for consistency.

## Getting Started

### Installation

1. Navigate to the `web` directory:
   ```bash
   cd web
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:

```bash
npm run dev
```

This will start the development server at `http://localhost:5173`.

## Project Structure

```
web/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Route-level components
│   ├── routes.jsx      # Route definitions
│   ├── main.jsx        # Application entry point
│   ├── colors.css      # Global color variables
│   ├── fonts.css       # Global font variables
│   └── index.css       # Global styles
├── public/             # Static assets
└── index.html          # HTML template
```

## Routing

To add new routes to your application:

1. Open the `src/routes.jsx` file.
2. Add a new route object to the `routes` array:

```jsx
export const routes = [
  {
    path: '/',
    element: <div>Hello, world!</div>,
  },
  // Add your new route like this:
  {
    path: '/about',
    element: <About />, // Import this component at the top of the file
  },
];
```

3. Create corresponding page components in the `src/pages` directory.

For more advanced routing features, such as nested routes, refer to the [React Router Documentation](https://reactrouter.com/).

## Playground Component

The project includes a Playground component that's only rendered when the `VITE_PLAYGROUND_ENABLED` environment variable is set to true. This helps you develop and test components in isolation without modifying pages.

### To use the Playground:

1. Create a `.env.local` file in the web directory (if not already created).
2. Add `VITE_PLAYGROUND_ENABLED=true` to the file.
3. Create your component following the naming convention:

   ```
   src/components/YourComponent/YourComponent.jsx
   ```

   For example, for a Button component:

   ```
   src/components/Button/Button.jsx
   ```

4. Access the Playground at:

   ```
   http://localhost:5173/playground/component/your-component
   ```

   For the Button example:

   ```
   http://localhost:5173/playground/component/button
   ```

Note: The component name in the URL should be kebab-case (lowercase with hyphens), but your actual component files should use PascalCase.

## Global Styles

### Configuring Fonts and Colors

To ensure consistency and maintainability in your project, we have set up global configurations for fonts and colors. These configurations are defined in separate CSS files:

- **`fonts.css`**: Contains font families and font size variables.
- **`colors.css`**: Contains color variables.

#### How to Configure Fonts

1. Open the `src/fonts.css` file.
2. Update the `--font-primary` and `--font-secondary` variables to your desired font families. For example:
   ```css
   :root {
     --font-primary: 'Roboto', sans-serif;
     --font-secondary: 'Times New Roman', serif;
   }
   ```
3. Adjust the font size variables (`--font-size-small`, `--font-size-medium`, etc.) as needed.

#### How to Configure Colors

1. Open the `src/colors.css` file.
2. Update the color variables to match your design system. For example:
   ```css
   :root {
     --color-primary: #ff5733;
     --color-secondary: #333333;
     --color-success: #28a745;
     --color-danger: #dc3545;
     --color-warning: #ffc107;
     --color-info: #17a2b8;
     --color-light: #f8f9fa;
     --color-dark: #343a40;
   }
   ```

#### Using Google Fonts

Google Fonts is a great resource for adding custom fonts to your project. To use Google Fonts:

1. Visit [Google Fonts](https://fonts.google.com/).
2. Select the font you want to use and copy the `<link>` tag provided.
3. Paste the `<link>` tag into the `<head>` section of your `index.html` file. For example:
   ```html
   <link
     href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
     rel="stylesheet"
   />
   ```
4. Update the `--font-primary` or `--font-secondary` variables in `fonts.css` to use the new font. For example:
   ```css
   :root {
     --font-primary: 'Roboto', sans-serif;
   }
   ```

## Code Quality Tools

- **ESLint**: JavaScript/JSX linting.
- **Prettier**: Code formatting.
- **Stylelint**: CSS/SCSS linting.

## Customization Ideas

- Add a state management solution (Context API, Redux, Zustand, etc.).
- Set up API integration with the backend.
- Implement authentication.
- Add a CSS framework or styling solution (Tailwind, styled-components, etc.).
- Configure testing with Jest and React Testing Library.
- Create common UI components (buttons, forms, modals, etc.).

## Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [Stylelint Documentation](https://stylelint.io/)
- [Google Fonts Documentation](https://fonts.google.com/)
