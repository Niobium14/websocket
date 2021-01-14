// TYPES
const SHOW_ERROR = "SHOW_ERROR";
const GET_CHARACTERS = "GET_CHARACTERS";
const LOADING = "LOADING";

// INITIAL STATE
let initialState = {
  characters: [],
  ownCharacters: [
    { id: 1, name: "Hemlent", race: "Hobbit" },
    { id: 2, name: "John", race: "Human" },
  ],
  loading: false,
  error: null,
};

// THIS REDUCER TAKES IN THE STATE AND THE ACTION CALLED
const charactersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case GET_CHARACTERS:
      return {
        ...state,
        characters: action.characters,
      };
    case LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    default:
      return state;
  }
};

// ACTIONS
export const showError = (error) => ({
  type: SHOW_ERROR,
  error,
});
export const getCharacters = (characters) => ({
  type: GET_CHARACTERS,
  characters,
});
export const isLoading = (isLoading) => ({
  type: LOADING,
  isLoading,
});

export const webSocketRequest = () => (dispatch) => {
  let socket = new WebSocket("ws://testapi.marit.expert:3004");
  dispatch(isLoading(true));
  socket.onopen = () => socket.send({ cmd: "get_list" });
  socket.onmessage = (event) => {
    const obj = JSON.parse(event.data);
    dispatch(getCharacters(obj));
  };
  dispatch(isLoading(true));
  socket.onerror = (event) =>
    dispatch(showError(event.message || "Failed to connect to Socket"));
};

export default charactersReducer;
