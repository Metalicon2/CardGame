const picListReducer = (state = [], action) => {
    switch(action.type){
        case 'SET_PICLIST' : return action.payload;
        default: return state;
    }
}

export default picListReducer;