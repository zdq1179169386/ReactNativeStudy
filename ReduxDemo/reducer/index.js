

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


// const counter = (state={count: 0}, action) => {
//     switch (action.type) {
//         case '加':
//             return {count: state.count + 1};
//         case '减':
//             return {count: state.count - 1};
//         default:
//             return {count: 10};
//     }
// }

// const actions = {
//     add: () => ({type: '加'}),
//     cut: () => ({type: '减'})
// }
//
// export default {
//     counter
// }
