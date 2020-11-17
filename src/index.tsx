import React, { useState } from 'react';
import { render } from 'react-dom';

const wrapper = document.getElementById('app');

function HelloWorld() {
  const [count, setCount] = useState(0);

  function incrementCount() {
    // a lot of code here
    setCount(count + 1);
  }

  return (
    <>
      <button type="button" onClick={incrementCount}>Increment</button>
      <p>{count}</p>
    </>
  );
}

function App() {
  return (
    <div>
      <HelloWorld />
    </div>
  );
}
render(<App />, wrapper);
