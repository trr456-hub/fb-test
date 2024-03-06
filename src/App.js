import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { dbService } from "./firebase";

function App() {
  const [input, setInput] = useState(0);
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setInput(value);
  };
  const city = doc(dbService, "cities", "BJ");
  const onClick = async () => {
    await addDoc(collection(dbService, "cities"), {
      name: "Seoul",
      country: "Korea",
    });
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
