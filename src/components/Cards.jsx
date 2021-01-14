import { Button, styled } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import CardLayout from "./Card/Card";
import styles from "./Components.module.css";
import { webSocketRequest } from "../redux/reducers/charactersReducer";
import loading from "../images/Spinner-1s-200px.svg";
function Cards({ characters, ownCharacters, getCharacters }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCharacters());
  }, []);
  return (
    <>
      <p className={styles.info}>Server characters</p>
      <div className={styles.cards}>
        {characters.length === 0 ? (
          <img src={loading} />
        ) : (
          characters.map((character) => (
            <CardLayout
              id={character.id}
              key={character.id}
              name={character.name}
              race={character.race}
            />
          ))
        )}
      </div>

      <p className={styles.info}>Redux characters</p>
      <div className={styles.cards}>
        {ownCharacters.map((character) => (
          <CardLayout
            id={character.id}
            key={character.id}
            name={character.name}
            race={character.race}
          />
        ))}
      </div>
    </>
  );
}

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    characters: state.charactersPage.characters,
    ownCharacters: state.charactersPage.ownCharacters,
    error: state.charactersPage.error,
    loading: state.charactersPage.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    // dispatching plain actions
    getCharacters: () => dispatch(webSocketRequest),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cards);
