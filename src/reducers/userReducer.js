const initialState = {
  name: '',
  token: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'USER_SET_NAME':
      return {...state, name: action.payload.name};
  };

  return state;
};
