import React, { useState, useEffect } from 'react';

import Summary from './Summary';
import { ReactComponent } from '*.svg';

const Character = props => {
  //state = { loadedCharacter: {}, isLoading: false };

  const [loadedCharacter, setLoadedCharacter] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  console.log('Rendering..');

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('shouldComponentUpdate');
  //   return (
  //     nextProps.selectedChar !== this.props.selectedChar ||
  //     nextState.loadedCharacter.id !== this.state.loadedCharacter.id ||
  //     nextState.isLoading !== this.state.isLoading
  //   );
  // }

  const fetchData = () => {
    console.log(
      'Sending Http request for new character with id ' + props.selectedChar
    );
    setIsLoading(true);
    // this.setState({ isLoading: true });
    fetch('https://swapi.co/api/people/' + props.selectedChar)
      .then(response => {
        if (!response.ok) {
          throw new Error('Could not fetch person!');
        }
        return response.json();
      })
      .then(charData => {
        const loadedCharacter = {
          id: props.selectedChar,
          name: charData.name,
          height: charData.height,
          colors: {
            hair: charData.hair_color,
            skin: charData.skin_color
          },
          gender: charData.gender,
          movieCount: charData.films.length
        };
        setIsLoading(false);
        setLoadedCharacter(loadedCharacter);
        // this.setState({ loadedCharacter: loadedCharacter, isLoading: false });
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };

  // why sending array param?
  // because i want to re-run when selectedChar dropdown value changes.
  // so i have to specify the variable name inside that array we pass as second param
  // clean-up can also be done using useEffect
  // it can return another function => this code inside will run right before useEffect will run the next time. its a clean-up function

  // ------------- 2 IMPORTANT THINGS HANDLED IN useEffect
  // componentDidUpdate()
  // componentWillUnmount()
  // but how do we handle shouldComponentUpdate() work using hooks?
  // ANSWER => USE React.memo()

  useEffect(() => {
    fetchData();
    return () => {
      console.log('Cleaning up ..');
    };
  }, [props.selectedChar]);

  // Soooooo here's a new stuff
  // when you want to run clean-up only once when component will unmount. we can have another useEffect with empty return and empty second argument

  useEffect(() => {
    return () => {
      console.log('component did unMount');
    };
  }, []);

  // componentDidUpdate(prevProps) {
  //   console.log('Component did update');
  //   if (prevProps.selectedChar !== this.props.selectedChar) {
  //     this.fetchData();
  //   }
  // }

  // componentDidMount() {
  //   this.fetchData();
  // }

  // componentWillUnmount() {
  //   console.log('Too soon...');
  // }

  let content = <p>Loading Character...</p>;

  if (!isLoading && loadedCharacter.id) {
    content = (
      <Summary
        name={loadedCharacter.name}
        gender={loadedCharacter.gender}
        height={loadedCharacter.height}
        hairColor={loadedCharacter.colors.hair}
        skinColor={loadedCharacter.colors.skin}
        movieCount={loadedCharacter.movieCount}
      />
    );
  } else if (!isLoading && !loadedCharacter.id) {
    content = <p>Failed to fetch character.</p>;
  }
  return content;
};

// what is React.memo() ?
// this is called wrapping your entire component inside a memo.
// it was introduced in react 16.6 which memoizes the component
// which means it basically it and re-renders when the props changes
// we can pass second argument also.
// which is function which should return true if the props are equal(dont re-render)
// and return false if it should re-render
// export default React.memo(Character, (prevProps, nextProps) => {
//   return nextProps.selectedChar === prevProps.selectedChar;
// });
export default React.memo(Character);
