import {
  doc,
  updateDoc,
  deleteDoc,
  addDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { dbService } from "./firebase";

function App() {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [editing, setEditing] = useState("");
  const [obj, setObj] = useState([]);
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

  const onUpdateClick = async (id) => {
    if (editing === id) {
      await updateDoc(doc(dbService, "cities", id), {
        name: name,
        country: country,
      });
      setEditing("");
    } else {
      setEditing(id);
    }
  };

  const onDeleteClick = async (id) => {
    const ok = window.confirm("정말 삭제하시겠습니까?");
    if (ok) {
      await deleteDoc(doc(dbService, "cities", id));
    }
  };

  useEffect(() => {
    const getData = async () => {
      const querySnapshot = await getDocs(collection(dbService, "cities"));
      const cityArray = []; // 새 배열 생성
      querySnapshot.forEach((doc) => {
        cityArray.push(doc); // 배열에 각 문서의 데이터 추가
      });
      setObj(cityArray); // 배열을 상태에 설정
    };
    getData();
  }, []);

  return (
    <div>
      <input onChange={nameChange} type="text" />
      <p />
      <input onChange={countryChange} type="text" />
      <p />
      <button onClick={onClick} type="submit">
        gogo
      </button>
      <button>getData</button>

      {obj.map((city) => (
        <div key={city.id}>
          {editing === city.id ? (
            <>
              <input
                type="text"
                placeholder="도시 이름"
                value={name}
                onChange={nameChange}
              />
              <input
                type="text"
                placeholder="국가"
                value={country}
                onChange={countryChange}
              />
            </>
          ) : (
            <h3>
              {city.id} - {city.data().name} - {city.data().country}
            </h3>
          )}
          <button onClick={() => onUpdateClick(city.id)}>수정</button>
          <button onClick={() => onDeleteClick(city.id)}>삭제</button>
        </div>
      ))}
    </div>
  );
}

export default App;
