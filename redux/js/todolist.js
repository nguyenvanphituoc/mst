// level1
const todo = (state, action) => {
    switch(action.type) {
        case 'ADD_TODO':
            return  {
                id: action.id,
                text: action.text,
                completed: false
            };
        case 'TOGGLE_TODO':
            if (state.id !== action.id) {
                return state;
            }
            return {
                ...state,
                completed: !state.completed
            };
        default:
            return state;
    }
}

//level2
const todos = (state = [], action) => {
    switch(action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                todo(undefined, action)
            ];
        case 'TOGGLE_TODO':
            return state.map(t => todo(t, action));
        default:
            return state;
    }
};

//level2
const visibilityFilter = (state = 'SHOW_ALL', action) => {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;
    }
};

//level3: 
    //+ composite with object
// const todoApp = (state = {}, action) => {
//     return {
//         todos: todos(state.todos, action),
//         visibilityFilter: visibilityFilter(state.visibilityFilter, action)
//     };
// };
    //+ combine reducers
// const { combineReducers } = Redux;
const combineReducers = (reducers) => {
    return (state= {}, action) => {
      return Object.keys(reducers).reduce(
        (nextState, key) => {
          nextState[key] = reducers[key](
            state[key],
            action
          );
          return nextState;
        }, 
        {}
      )
    }
  }
const todoApp = combineReducers({
    todos: todos,
    visibilityFilter: visibilityFilter
});

const { createStore } = Redux;
const store = createStore(todoApp);

console.log('Initial state:');
console.log(store.getState());
console.log('---------------');

console.log('Dispatching ADD_TODO.');
store.dispatch({
    type: 'ADD_TODO',
    id: 0,
    text: 'Learn Redex'
});
console.log('Current state:');
console.log(store.getState());
console.log('---------------');

console.log('Dispatching TOGGLE_TODO.');
store.dispatch({
    type: 'TOGGLE_TODO',
    id: 0
});
console.log('Current state:');
console.log(store.getState());
console.log('---------------');

console.log('Dispatching SET_VISIBILITY_FILTER.');
store.dispatch({
    type: 'SET_VISIBILITY_FILTER',
    filter: 'SHOW_COMPLETED'
});
console.log('Current state:');
console.log(store.getState());
console.log('---------------');
