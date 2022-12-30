import React, { createContext, useReducer } from "react";
import { PageState, pageReducer, ActionTypes } from "./pageReducer";

const initialPageState: PageState = {
    modalOpen: true,
    sidebarOpen: false,
    viewTechnology: 'Python',
    viewDate: '2022-12-23',
    regionDataAll: undefined
}

export const PageContext = createContext<{state: PageState, dispatch: React.Dispatch<ActionTypes | any>}>({
    state: initialPageState, dispatch: () => null
});

export const PageContextProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [state, dispatch] = useReducer(pageReducer, initialPageState);
    return (
        <PageContext.Provider value={{state, dispatch}}>
            {children}
        </PageContext.Provider>
    )
}