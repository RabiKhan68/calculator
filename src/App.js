import React, {use, useEffect, useState} from 'react';
import './App.css';
import {evaluate} from 'mathjs';

function App() {
  const [input, setInput] = useState('');
  const [darkMode, setDarkMode] = useState (
    localStorage.getItem('darkMode') === 'true'
  );

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const handleClick = (value) => {
    setInput(input + value);
  };

  const handleClear = () => {
    setInput('');
  };

  const handleEqual = () => {
    try {
      const result = evaluate(input);
      setInput(result.toString());
    } catch (error) {
      setInput('Error');
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      const {key} = event;
      if(/[\d+\-*/.%()]/.test(key)) setInput((prev) => prev + key);
      if(key === 'Enter') handleEqual();
      if(key === 'Backspace') setInput((prev) => prev.slice(0, -1));
      if(key === 'Escape') handleClear();
    };
    window.addEventListener("Keydown", handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const scientificOps = {
    sin: () => setInput(Math.sin(eval(input)).toString()),
    cos: () => setInput(Math.cos(eval(input)).toString()),
    tan: () => setInput(Math.tan(eval(input)).toString()),
    sqrt: () => setInput(Math.sqrt(eval(input)).toString()),
    pow2: () => setInput(Math.pow(eval(input), 2).toString()),
    log: () => setInput(Math.log10(eval(input)).toString()),
    ln: () => setInput(Math.log(eval(input)).toString()),
    pi: () => setInput(input + Math.pi),
    e: () => setInput(input + Math.E),
  };

  return (
    <div className={`app ${darkMode ? "dark" : "light"}`}>
      <div className="calculator">
        <div className="top-bar">
          <h2>Scientific Calculator</h2>
          <button className="mode-toggle" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "Light" : "Dark"}
          </button>
        </div>

        <div className="display">{input || "0"}</div>

        <div className="scientific-buttons">
          <button onClick={scientificOps.sin}>sin</button>
          <button onClick={scientificOps.cos}>cos</button>
          <button onClick={scientificOps.tan}>tan</button>
          <button onClick={scientificOps.sqrt}>√</button>
          <button onClick={scientificOps.pow2}>x²</button>
          <button onClick={scientificOps.log}>log</button>
          <button onClick={scientificOps.ln}>ln</button>
          <button onClick={scientificOps.pi}>π</button>
          <button onClick={scientificOps.e}>e</button>
        </div>

        <div className="buttons">
          <button onClick={handleClear} className="clear">C</button>
          <button onClick={() => handleClick("(")}>(</button>
          <button onClick={() => handleClick(")")}>)</button>
          <button onClick={() => handleClick("/")}>/</button>

          <button onClick={() => handleClick("7")}>7</button>
          <button onClick={() => handleClick("8")}>8</button>
          <button onClick={() => handleClick("9")}>9</button>
          <button onClick={() => handleClick("*")}>×</button>

          <button onClick={() => handleClick("4")}>4</button>
          <button onClick={() => handleClick("5")}>5</button>
          <button onClick={() => handleClick("6")}>6</button>
          <button onClick={() => handleClick("-")}>−</button>

          <button onClick={() => handleClick("1")}>1</button>
          <button onClick={() => handleClick("2")}>2</button>
          <button onClick={() => handleClick("3")}>3</button>
          <button onClick={() => handleClick("+")}>+</button>

          <button onClick={() => handleClick("0")} className="zero">0</button>
          <button onClick={() => handleClick(".")}>.</button>
          <button onClick={handleEqual} className="equal">=</button>
        </div>
      </div>
    </div>
  );
}

export default App;