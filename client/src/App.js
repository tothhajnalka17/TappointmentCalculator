import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [savedNum, setSavedNum] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
      setIsLoading(true);
      fetch("http://localhost:3001/saved")
        .then((res) => res.json())
        .then((data) => setSavedNum(data.value))
        .then(setIsLoading(false));
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <p>{isLoading ? "Loading..." : savedNum}</p>
      </header>
    </div>
  );
}

export default App;
