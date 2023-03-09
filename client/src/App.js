import './App.css';
import { useState, useEffect } from 'react';
import Wrapper from "./Components/Wrapper.js";
import Screen from "./Components/Screen.js";
import ButtonBox from "./Components/ButtonBox.js";
import Button from "./Components/Button.js";

const Buttons = ["M+", "MR", "C", "/", 7, 8, 9, "*", 4, 5, 6, "-", 1, 2, 3, "+", 0, ".", "="]

function App() {
  const [savedNum, setSavedNum] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [operation, setOperation] = useState([0]);

  useEffect(() => {
      ReadMemory();
  }, [])

  function ClickHandler(e){
    const clicked = e.target.value;
    console.log(clicked);

    switch (clicked){
      case "+":
      case "-":
      case "/":
      case "*":
      case ".":
        setOperation([...operation, clicked]);
        break;
      case "=":
        setOperation([...operation, clicked]);
        math();
        break;
      case "C":
        setOperation([0]);
        break;
      case "M+":
        SaveToMemory()
          .then(()=>setSavedNum(operation.join("")));
        break;
      case "MR":
        ReadMemory()
          .then((saved)=>setOperation([saved]));
        break;
      default:
        var lastElement = operation[operation.length-1];

        switch (lastElement){
          case 0:
            setOperation([clicked]);
            break;
          default:
            setOperation([...operation, clicked]);
            break;
        }
    }
  }

  function math(){
    setOperation([eval(operation.join(""))]);
  }

  async function SaveToMemory(){
    setIsLoading(true);
    let url = "http://localhost:3001/save";
    let data = operation.join("");

    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ operation: data }),
    });
    setIsLoading(false);
  }

  async function ReadMemory(){
    setIsLoading(true);
    let response = await fetch("http://localhost:3001/saved");
    let data = await response.json();
    setSavedNum(data.operation);
    setIsLoading(false);
    return data.operation;
  }
  
  console.log("SavedNum is: " + savedNum);
  return (
    <div className="App">
      <div className="header">
        <h1>Tappointment Web Calculator</h1>
      </div>

      <div className='saved'>
        <h3>Memory: {isLoading ? "Loading..." : ((savedNum===null) ? "No number saved in memory" : savedNum)}</h3>
      </div>
      
      <Wrapper>
      <Screen value={operation.join("")} />
        <ButtonBox>
          {Buttons.map((value, i) => {
            return (<Button
                      key={i}
                      className={value === "=" ? "equals" : ""}
                      value={value}
                      onClick={e=>ClickHandler(e)}
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
