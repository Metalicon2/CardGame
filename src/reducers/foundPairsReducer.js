const foundPairsReducer = (state = 0, action) => {
    switch(action.type){
        case 'INCREMENT_PAIRS': return state + action.payload;
        case 'SET_PAIRS': return action.payload;
        default: return state;
    }
}

export default foundPairsReducer;