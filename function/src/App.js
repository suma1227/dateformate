import { useEffect, useState } from 'react'

import logo from './logo.svg';
import './App.css';

// const count = 4;

function App() {
  const [count, setCount] = useState(10)
  const [name, setName] = useState('suma')

  // useEffect(() => {
  //   console.log(count)
  //   console.log("am useeffect");
  //   setCount(count+1)
  // }, []);

  // function, when the function should excutes
  useEffect(() => {
    console.log("i am sumalatha")
    console.log(count)
    changeCount()
  }, []);


  // useEffect(function () {
  //   console.log("am useeffect 2");
  // });

  

  // function changeName(){
  //   console.log("Change Name")
  //   setName(name +1)
  // }

  const suma = function(){
    console.log("am suma")
  }

  function suma1(){
    console.log("am suma 1")
  }

  const suma2 = () => {
      console.log("am suma 2");
  }
  const latha = function(a){
    console.log("am latha")
  }

  function latha1(a){
    console.log("am latha 1")
  }

  const latha2 = (a) => {
      console.log("am latha 2");
  }

  const latha3 = a => {
    console.log("am latha 2");
}
  
const sumalatha = function(a){
  console.log("am sumalatha")
}

function sumalatha1(a, b){
  console.log("am sumalatha 1")
}

const sumalatha2 = (a, b) => {
    console.log("am sumalatha 2");
}
  const changeCount = function(){
    console.log("Change Count");
    setCount(count+1);
  }

  const changeName = (a) =>{
      console.log("Change Name")
      console.log(a)
      setName(name +1)
    }
  

  return (
    <div className="App">
      <div>{count}</div>
      <div>{name}</div>
      <button onClick={changeCount}>Change Count</button>
      <button onClick={() =>{changeName('suma is a good girl')}}>Change Name</button>
    </div>
  );

}

export default App;
