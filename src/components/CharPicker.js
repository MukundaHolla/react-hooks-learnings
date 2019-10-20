import React, { useState, useEffect } from 'react';

import './CharPicker.css';

const CharPicker = props => {
  const [loadedChars, setLoadedChars] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  //state = { characters: [], isLoading: false };

  // 1- here im learning componentDidMount can be replaced by useEffect({})
  // 2- useEffect is used to manage side effects like http requests
  // 3- it takes function as an argument, this function gets executed on every render cycle after the component(not dom) has been rendered
  // 4- componentWillMount should be called before useEffect
  // 5- useEffect runs more often than once. unlike componentDidMount which runs only once.
  // 6- Fun fact => useEffect goes to infinite loop if not handled propely when state or props gets updated.
  // 7- it takes second argument to correct previous comment.
  // 8- second argument is a array in which we have to list all the variables which is used inside useEffect.
  // 9- the variable which we list in that array, if that variables value changes then the function that we passed to useEffect runs again(or useEffect runs again).
  // 10- if we pass [] then we dont want to code inside to re-run again
  // 11- hence useEffect with [] as second argument is equavalent to componentDidMount

  useEffect(() => {
    setIsLoading(true);
    console.log('it works');
    fetch('https://swapi.co/api/people')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch.');
        }
        return response.json();
      })
      .then(charData => {
        const selectedCharacters = charData.results.slice(0, 5);

        setIsLoading(false);
        setLoadedChars(
          selectedCharacters.map((char, index) => ({
            name: char.name,
            id: index + 1
          }))
        );
      })
      .catch(err => {
        console.log(err);
        setIsLoading(true);
      });
  }, []);

  // componentDidMount() {
  //   this.setState({ isLoading: true });
  //   fetch('https://swapi.co/api/people')
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch.');
  //       }
  //       return response.json();
  //     })
  //     .then(charData => {
  //       const selectedCharacters = charData.results.slice(0, 5);
  //       this.setState({
  //         characters: selectedCharacters.map((char, index) => ({
  //           name: char.name,
  //           id: index + 1
  //         })),
  //         isLoading: false
  //       });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }

  let content = <p>Loading characters...</p>;

  if (!isLoading && loadedChars && loadedChars.length > 0) {
    content = (
      <select
        onChange={props.onCharSelect}
        value={props.selectedChar}
        className={props.side}
      >
        {loadedChars.map(char => (
          <option key={char.id} value={char.id}>
            {char.name}
          </option>
        ))}
      </select>
    );
  } else if (!isLoading && (!loadedChars || loadedChars.length === 0)) {
    content = <p>Could not fetch any data.</p>;
  }
  return content;
};

export default CharPicker;
