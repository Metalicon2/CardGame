const prevCardAmountReducer = (state = 6, action) => {
    switch(action.type) {
        case 'SET_PREVCARDAMOUNT': return action.payload;
        default: return state;
    }
}

export default prevCardAmountReducer;