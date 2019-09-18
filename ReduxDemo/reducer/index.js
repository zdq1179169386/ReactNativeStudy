
export function counter(state=0,action) {
    switch (action.type) {
        case '加':
            return state + 1;
        case '减':
            return state - 1;
        default:
            return 10;
    }
}

export function  add() {
    return {
        type: '加'
    }
}

export function  cut() {
    return {
        type: '减'
    }
}

//异步action
export function asyncAdd() {
    return dispatch => {
        setTimeout(()=>{
            dispatch(add())
        },2000)
    }
}
