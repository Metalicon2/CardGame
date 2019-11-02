const gameOnReducer = (state = false, action) => {
    switch(action.type){
        case 'SET_GAMEON' : return action.payload;
        default: return state;
    }
}

export default gameOnReducer;