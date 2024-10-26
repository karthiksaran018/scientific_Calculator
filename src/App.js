import React, { useState } from 'react';
import { evaluate } from 'mathjs';
import './App.css';
import backgroundVideo from './assets/bg1.mp4'; // Import the video file

function App() {
  const [expression, setExpression] = useState(''); // Current input expression
  const [result, setResult] = useState(''); // Calculation result
  const [history, setHistory] = useState([]); // Store recent history

  // Handle button clicks for numbers and operations
  const handleButtonClick = (value) => {
    if (value === 'sin(' || value === 'cos(' || value === 'tan(') {
      setExpression((prev) => prev + `${value}(`);
    } else {
      setExpression((prev) => prev + value);
    }
  };

  // Handle calculation
  const handleCalculate = () => {
    try {
      // Replace trig functions to consider degrees
      let modifiedExpression = expression
        .replace(/sin\(/g, 'sin(')
        .replace(/cos\(/g, 'cos(')
        .replace(/tan\(/g, 'tan(');

      // Evaluate expression
      const evalResult = evaluate(modifiedExpression);
      setResult(evalResult);
      setHistory((prevHistory) => [
        ...prevHistory,
        { expression, result: evalResult },
      ]);
      setExpression(''); // Clear input after calculation
    } catch (error) {
      setResult('Error');
    }
  };

  // Handle clearing the calculator
  const handleClear = () => {
    setExpression('');
    setResult('');
  };

  // Function to use history item
  const handleUseHistoryItem = (item) => {
    setExpression(item.expression);
    setResult('');
  };

  return (
    <div className="app">
      {/* Video Background */}
      <video autoPlay loop muted playsInline className="video-bg">
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Calculator Container */}
      <div className="calculator-container">
        <div className="calculator">
          <div className="display">
            <div className="expression">{expression || '0'}</div>
            <div className="result">{result}</div>
          </div>
          <div className="buttons">
            {/* Basic Calculator Buttons */}
            <button onClick={() => handleButtonClick('1')}>1</button>
            <button onClick={() => handleButtonClick('2')}>2</button>
            <button onClick={() => handleButtonClick('3')}>3</button>
            <button onClick={() => handleButtonClick('+')}>+</button>
            <button onClick={() => handleButtonClick('4')}>4</button>
            <button onClick={() => handleButtonClick('5')}>5</button>
            <button onClick={() => handleButtonClick('6')}>6</button>
            <button onClick={() => handleButtonClick('-')}>-</button>
            <button onClick={() => handleButtonClick('7')}>7</button>
            <button onClick={() => handleButtonClick('8')}>8</button>
            <button onClick={() => handleButtonClick('9')}>9</button>
            <button onClick={() => handleButtonClick('*')}>*</button>
            <button onClick={() => handleButtonClick('.')}>.</button>
            <button onClick={() => handleButtonClick('0')}>0</button>
            <button onClick={handleCalculate}>=</button>
            <button onClick={() => handleButtonClick('/')}>/</button>

            {/* Advanced Calculator Buttons */}
            <button onClick={() => handleButtonClick('sin(')}>sin</button>
            <button onClick={() => handleButtonClick('cos(')}>cos</button>
            <button onClick={() => handleButtonClick('tan(')}>tan</button>
            <button onClick={() => handleButtonClick('sqrt(')}>√</button>
            <button onClick={() => handleButtonClick('^')}>^</button>
            <button onClick={() => handleButtonClick('log(')}>log</button>
            <button onClick={handleClear}>C</button>
          </div>
        </div>
        
        {/* History Section */}
        <div className="history">
          <h3>Recent History</h3>
          <ul>
            {history.map((item, index) => (
              <li key={index} onClick={() => handleUseHistoryItem(item)}>
                {item.expression} = {item.result}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
