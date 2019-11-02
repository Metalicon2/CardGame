const resetCardReducer = (state = false, action) => {
    switch(action.type){
        case 'SET_RESETCARD': return action.payload;
        default: return state;
    }
}

export default resetCardReducer;