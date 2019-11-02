export const incrementTryAction = (num) => {
    return {
        type: 'INCREMENT_TRY',
        payload: num
    }
}

export const resetTryAction = () => {
    return {
        type: 'RESET_TRY',
        payload: 0
    }
}

export const setBestAction = (num) => {
    return {
        type: 'SET_BEST',
        payload: num
    }
}

export const setGameOnAction = (param) => {
    return {
        type: 'SET_GAMEON',
        payload: param
    }
}

export const setPlayOnAction = (param) => {
    return {
        type: 'SET_PLAYON',
        payload: param
    }
}

export const incrementFoundPairs = (num) => {
    return {
        type: 'INCREMENT_PAIRS',
        payload: num
    }
}

export const setFoundPairs = (num) => {
    return {
        type: 'SET_PAIRS',
        payload: num
    }
}

export const setCardAmountAction = (num) => {
    return {
        type: 'SET_CARDAMOUNT',
        payload: num
    }
}

export const setPrevCardAmountAction = (num) => {
    return {
        type: 'SET_PREVCARDAMOUNT',
        payload: num
    }
}

export const setResetCardAction = (param) => {
    return {
        type: 'SET_RESETCARD',
        payload: param
    }
}

export const setCardItemArrayAction = (param) => {
    return {
        type: 'SET_CARDITEMARRAY',
        payload: param
    }
}

export const setPicListAction = (param) => {
    return {
        type: 'SET_PICLIST',
        payload: param
    }
}

export const setRouteAction = (param) => {
    return {
        type: 'SET_ROUTE',
        payload: param
    }
}