// App.js
import React from 'react';
import Cmp from './components/Cmp'
import { ThemeProvider } from './contexts/ThemeContext'; // Import the ThemeProvider

const App = () => {
  return (
    <ThemeProvider>
      <Cmp/>
    </ThemeProvider>
  );
};

export default App;





