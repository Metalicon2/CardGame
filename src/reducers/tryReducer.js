const tryReducer = (state = 0, action) => {
    switch(action.type){
        case 'INCREMENT_TRY' : return state + action.payload;
        case 'RESET_TRY' : return action.payload;
        default : return state;
    }
}

export default tryReducer;