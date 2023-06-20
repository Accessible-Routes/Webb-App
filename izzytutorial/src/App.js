import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  const listItems = products.map(product =>
    <li
      key={product.id}
      style={{
        color: product.isFruit ? 'magenta' : 'darkgreen'
      }}
    >
      {product.title}
    </li>
  );
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton />
      <AboutPage />
      <ul>{listItems}</ul>
    </div>
  );
}

function MyButton() {

  function handleClick() {
    alert('You clicked me!');
  }


  return (
    //<button>I'm a button</button>
    <button onClick={handleClick}>
      Click me
    </button>
  );
}

function AboutPage() {


  return (
    <>
      <h1>About</h1>
      <p>Hello there.<br />How do you do?</p>
      
    </>
  );
}

const products = [
  { title: 'Cabbage', isFruit: false, id: 1 },
  { title: 'Garlic', isFruit: false, id: 2 },
  { title: 'Apple', isFruit: true, id: 3 },
];

export default App;
