import React, { createContext, useReducer } from "react";
import { PageState, pageReducer, ActionTypes, RegionData, SelectedRegion, TechnologyData } from "./pageReducer";

const initialPageState: PageState = {
    modalOpen: false,
    sidebarOpen: false,
    viewTechnology: 'Python',
    viewDate: '2022-12-23',
    viewByPercentage: false,
    viewByFormat: 'Ranking',
    scrapedDates: []
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