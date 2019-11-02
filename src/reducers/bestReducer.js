const bestReducer = (state = 0, action) => {
    switch(action.type){
        case "SET_BEST" : return action.payload;
        default: return state;
    }
}

export default bestReducer;