const playOnReducer = (state = false, action) => {
    switch(action.type){
        case 'SET_PLAYON' : return action.payload;
        default: return state;
    }
}

export default playOnReducer;