const initialState = {
  token: 'testando',
  name: 'kkkk',
};

export default (state = initialState, action) => {

  switch (action.type) {
    case 'SET_NAME':
      return {
        ...state, name: action.payload.name
      }
    case 'SET_TOKEN':
      return {
        ...state, token: action.payload.token
      }

    default:
      return state;
  }
}
