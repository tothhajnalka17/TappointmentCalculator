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

  function clickHandler(e){
    const clicked = e.target.value;

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
        saveToMemory()
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

  function inputValidation(input){
    let regex = /[a-zA-Z ^@~`!@#$%^&()_\\';:"\?><,]/g;
    return input.replace(regex, '');
  }

  function math(){
    let filteredInput = inputValidation(operation);
    setOperation([eval(filteredInput)]);
  }

  async function saveToMemory(){
    setIsLoading(true);
    let url = "http://localhost:3001/save";
    let data = operation.join("");
    let json;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ operation: data }),
      });
      json = await response.json();
      setIsLoading(false);
    } catch (error) {
      if (error instanceof SyntaxError) {
        console.log('There was a SyntaxError', error);
      } else {
        console.log('There was an error', error);
        setOperation(["ERROR"]);
      }
    }
  }

  async function ReadMemory(){
    let data;
    try {
      setIsLoading(true);
      let response = await fetch("http://localhost:3001/saved");
      data = await response.json();
      setSavedNum(data.operation);
      setIsLoading(false);
    } catch (error) {
      if (error instanceof SyntaxError) {
        console.log('There was a SyntaxError', error);
      } else {
        console.log('There was an error', error);
        setOperation(["ERROR"]);
      }
    }
    if (data) {
      return data.operation;
    }
  }
  
  
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
                      onClick={e=>clickHandler(e)}
                      />)})}
        </ButtonBox>
      </Wrapper>
      <div className='footer'>
        <p>Made by Hajnalka Tóth using ExpressJS and React on 3/10/2023</p>
      </div>
    </div>
  );
}

export default App;
