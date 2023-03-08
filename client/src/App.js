import './App.css';
import { useState, useEffect } from 'react';
import Wrapper from "./Components/Wrapper.js";
import Screen from "./Components/Screen.js";
import ButtonBox from "./Components/ButtonBox.js";
import Button from "./Components/Button.js";

const Buttons = ["C", "+-", "%", "/", 7, 8, 9, "X", 4, 5, 6, "-", 1, 2, 3, "+", 0, ".", "="]

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
      <div className="header">
        <h1>Tappointment Web Calculator</h1>
        
      </div>
      <div className='saved'>
        <h3>Memory: {isLoading ? "Loading..." : ((savedNum===null) ? "No number saved in memory" : `${savedNum}`)}</h3>
      </div>
      
      <Wrapper>
        <Screen value="0"/>
        <ButtonBox>
          {Buttons.map((value, i) => {
            return (<Button
                      key={i}
                      className={value === "=" ? "equals" : ""}
                      value={value}
                      onClick={()=>{console.log(`${value} clicked!`)}}
                      />)})}
        </ButtonBox>
      </Wrapper>
      <div className='footer'>
        <p>Made by Hajnalka Tóth using ExpressJS and React on 3/8/2023</p>
      </div>
    </div>
  );
}

export default App;
