const cardAmountReducer = (state = 6, action) => {
    switch(action.type){
        case 'SET_CARDAMOUNT' : return action.payload;
        default: return state;
    }
}

export default cardAmountReducer;