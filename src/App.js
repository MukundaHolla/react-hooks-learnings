import React, { useState } from 'react';

import CharPicker from './components/CharPicker';
import Character from './components/Character';

const App = props => {
  // useState() returns an array always containing two elements
  // 1) state => current state(snapshot of the current state) , and reinitializes when the component re-renders,this get latest state
  // 2) setState => allows us to change that state( or to override the current state)

  // const [state, setState] = useState({
  //   selectedCharacter: 1,
  //   destroyed: false
  // });

  // we can even create multiple state for a single component unlike old state with class

  const [destroyed, setDestroyed] = useState(false);

  const [selectedCharacter, setSelectedCharacter] = useState(1);

  const [chosenSide, setChosenSide] = useState('light');

  //  why are we using spread operater here?
  //  because when the state is updated- say a value is changed in UI => instead of updating all the variable inside the state, only the value if that particular element get updated and others will result in an undefined state -> so using ...state to copy the other state element as it is to update the state and not get undefined
  const sideHandler = side => {
    // setState({ ...state, side: side });
    // because it is single state
    setChosenSide(side);
  };

  const charSelectHandler = event => {
    const charId = event.target.value;
    // setState({ ...state, selectedCharacter: charId });
    setSelectedCharacter(charId);
  };

  const destructionHandler = () => {
    // setState({ ...state, destroyed: true });
    setDestroyed(true);
  };

  let content = (
    <React.Fragment>
      <CharPicker
        side={chosenSide}
        selectedChar={selectedCharacter}
        onCharSelect={charSelectHandler}
      />
      <Character selectedChar={selectedCharacter} />
      <button onClick={sideHandler.bind(this, 'light')}>Light Side</button>
      <button onClick={sideHandler.bind(this, 'dark')}>Dark Side</button>
      {chosenSide === 'dark' && (
        <button onClick={destructionHandler}>DESTROY!</button>
      )}
    </React.Fragment>
  );

  if (destroyed) {
    content = <h1>Total destruction!</h1>;
  }
  return content;
};

export default App;
