import { useState } from "react";

function App() {
  const [input, setInput] = useState(0);
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setInput(value);
  };
  const onClick = () => {
    console.log(input);
  };
  return (
    <div>
      <input onChange={onChange} type="text" />
      <button onClick={onClick} type="submit">
        gogo
      </button>
    </div>
  );
}

export default App;
