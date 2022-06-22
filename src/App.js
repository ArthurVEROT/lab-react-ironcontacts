import { useState } from "react";
import "./App.css";
import JsonContact from "./contacts.json";

function App() {
  const [contacts, setContcats] = useState(JsonContact.slice(0, 5));

  const listOfContacts = contacts.map((contact) => {
    return (
      <tr key={contact.id}>
        <td>
          <picture>
            <img src={contact.pictureUrl} alt={contact.name} />
          </picture>
        </td>
        <td>{contact.name}</td>
        <td>{contact.popularity.toFixed(2)}</td>
        <td>{contact.wonOscar && "🏆"}</td>
        <td>{contact.wonEmmy && "🏆"}</td>
        <td>
          <button onClick={() => deleteContact(contact)}>Delete</button>
        </td>
      </tr>
    );
  });

  const addRandomContact = () => {
    const remainingContacts = JsonContact.filter(
      (contact) => !contacts.includes(contact)
    );
    if (remainingContacts.length === 0) {
      return;
    }
    const randomContact =
      remainingContacts[Math.floor(Math.random() * remainingContacts.length)];
    setContcats([...contacts, randomContact]);
  };

  // const sortByPopularity = () => {
  //   const copy = [...contacts];
  //   const sortedContacts = copy.sort((a, b) => b.popularity - a.popularity);
  //   setContcats([...sortedContacts]);
  // };

  // const sortByName = () => {
  //   const copy = [...contacts];
  //   const sortedContacts = copy.sort((a, b) =>
  //     a.name > b.name ? 1 : b.name > a.name ? -1 : 0
  //   );
  //   setContcats([...sortedContacts]);
  // };

  const sort = (byWhat) => {
    if (byWhat === "name") {
      setContcats([
        ...contacts.sort((a, b) =>
          a.name.localeCompare(b.name, "en", { sensitivity: "base" })
        ),
      ]);
    }
    if (byWhat === "popularity") {
      setContcats([...contacts.sort((a, b) => b.popularity - a.popularity)]);
    }
  };

  const deleteContact = (contact) => {
    const filteredContacts = contacts.filter((x) => x !== contact);
    setContcats(filteredContacts);
  };

  return (
    <div className="App">
      <h1>IronContacts</h1>
      <div className="buttons">
        <button onClick={addRandomContact}>Add Random Contact </button>
        <button
          onClick={() => {
            sort(`popularity`);
          }}
        >
          Sort by popularity
        </button>
        <button
          onClick={() => {
            sort(`name`);
          }}
        >
          Sort by name
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won Oscar</th>
            <th>Won Emmy</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{listOfContacts}</tbody>
      </table>
    </div>
  );
}

export default App;
