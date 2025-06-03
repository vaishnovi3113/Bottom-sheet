import React, { useState, useEffect } from 'react';
import BottomSheet from './components/BottomSheet';
import './App.css';

function App() {
  const [position, setPosition] = useState('closed');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setPosition('closed');
      if (e.key === 'ArrowUp') setPosition(prev => 
        prev === 'closed' ? 'half' : 'full');
      if (e.key === 'ArrowDown') setPosition(prev => 
        prev === 'full' ? 'half' : 'closed');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="App">
      <h1 className="hh1">Bottom Sheet Demo</h1>
      <p className="hh">Control the sheet using buttons on the right or keyboard arrows</p>
      
      <div className="card">
        <h2 className='hh1'>Key Features</h2>
        <ul className='tech-highlights'>
          <li>⚡ Smooth Spring Animations</li>
          <li>⚡ Three Snap Positions</li>
          <li>⚡ Multi-Input Control</li>
          <li>⚡ Responsive</li>
        </ul>
      </div>

      <div className="control-panel">
        <h3>Sheet Controls</h3>
        <div className="control-buttons">
          <button
            className={`control-btn ${position === 'closed' ? 'active' : ''}`}
            onClick={() => setPosition('closed')}
          >
            <span className="control-icon">↓</span>
            <span className="control-text">Minimize</span>
          </button>
          <button
            className={`control-btn ${position === 'half' ? 'active' : ''}`}
            onClick={() => setPosition('half')}
          >
            <span className="control-icon">↔</span>
            <span className="control-text">Half Open</span>
          </button>
          <button
            className={`control-btn ${position === 'full' ? 'active' : ''}`}
            onClick={() => setPosition('full')}
          >
            <span className="control-icon">↑</span>
            <span className="control-text">Full Open</span>
          </button>
        </div>
      </div>

      <BottomSheet position={position} setPosition={setPosition}>
        <h2 className="hh1">Technical Highlights</h2>
        <h2>Core Stack</h2>
        <div className="static-content">
          <p>⚛️ React 18 </p>
          <p>JavaScript</p>
          <p> Pure CSS</p>
        </div>
      </BottomSheet>
    </div>
  );
}

export default App;