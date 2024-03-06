import { async } from "@firebase/util";
import { doc, setDoc, addDoc, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { dbService } from "./firebase";

function App() {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [obj, setObj] = useState("");
  const nameChange = (e) => {
    const {
      target: { value },
    } = e;
    setName(value);
  };
  const countryChange = (e) => {
    const {
      target: { value },
    } = e;
    setCountry(value);
  };

  const onClick = async () => {
    await addDoc(collection(dbService, "cities"), {
      name: name,
      country: country,
    });
  };
  useEffect(() => {
    const getData = async () => {
      const query = await getDocs(collection(dbService, "cities"));
      query.forEach((e) => setObj(e.data()));
    };
    getData();
    console.log(obj);
  }, []);
  console.log(obj.name);
  return (
    <div>
      <input onChange={nameChange} type="text" />
      <p />
      <input onChange={countryChange} type="text" />
      <p />
      <button onClick={onClick} type="submit">
        gogo
      </button>

      <div></div>
    </div>
  );
}

export default App;
