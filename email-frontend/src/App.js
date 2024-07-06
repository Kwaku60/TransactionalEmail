import React from 'react';
import EmailForm from './components/EmailForm';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Transactional Email Service</h1>
      </header>
      <main>
        <EmailForm />
      </main>
    </div>
  );
};

export default App;
