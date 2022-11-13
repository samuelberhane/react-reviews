import React, { useEffect, useState } from "react";
import { data } from "./data";

const App = () => {
  const [people, setPeople] = useState(data);
  const [personIndex, setPersonIndex] = useState(0);

  const checkIndex = (index) => {
    if (index < 0) return people.length - 1;
    else if (index > people.length - 1) return 0;
    return index;
  };

  const prevPerson = () => {
    setPersonIndex(checkIndex(personIndex - 1));
  };

  const nextPerson = () => {
    setPersonIndex(checkIndex(personIndex + 1));
  };

  useEffect(() => {
    let interval = setInterval(() => {
      setPersonIndex(checkIndex(personIndex + 1));
    }, 2000);
    return () => clearInterval(interval);
  }, [personIndex]);

  return (
    <main>
      <div className="title">
        <h1>Reviews Project</h1>
      </div>
      <section className="main-section">
        <article className="reviews">
          {people.map((person, index) => {
            const { id, name, image, review, job } = person;
            let position = "next";
            if (personIndex === index) position = "active";
            if (
              index === personIndex - 1 ||
              (personIndex === 0 && index === people.length - 1)
            )
              position = "last";
            return (
              <div key={id} className={`${position} review`}>
                <img className="person-img" src={image} alt={name} />
                <h2 className="person-name">{name}</h2>
                <h4 className="job">{job}</h4>
                <p className="desc">{review}</p>
              </div>
            );
          })}
        </article>
        <div className="btn-container">
          <button className="prev-btn btn" onClick={prevPerson}>
            prev
          </button>
          <button className="next-btn btn" onClick={nextPerson}>
            next
          </button>
        </div>
      </section>
    </main>
  );
};

export default App;
