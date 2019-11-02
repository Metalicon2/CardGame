const cardItemArrayReducer = (state = [], action) => {
    switch(action.type){
        case 'SET_CARDITEMARRAY' : return action.payload;
        default: return state;
    }
}

export default cardItemArrayReducer;