import { createContext, useReducer } from "react"

const INITIAL_STATE= {
    city:undefined,
    date:[],
    options: {
        adult:undefined,
        children:undefined,
        rooms:undefined
    },
};

export const SearchContext = createContext(INITIAL_STATE);

const searchReducer=(state,action ) => {
    switch(action.type) {
        case "NEW_STATE":
            return action.payload;
        case "RESET_STATE":
            return INITIAL_STATE
         default:
         return state;       
    }
}

export const  SearchContextProvider= ({children}) =>  {

const [state,dispatch]=useReducer(searchReducer,INITIAL_STATE);
    
return <SearchContext.Provider value={{city:state.city,date:state.date,options:state.options,dispatch}}>
    {children}
</SearchContext.Provider>

}