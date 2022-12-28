export interface PageState {
    modalOpen: boolean,
    sidebarOpen: boolean,
    regionDataAll?: {
        region: string,
        technologies: {
            [key: string]: number
        }
    }

}

export enum ActionTypes {
    openModal = 'OPEN_MODAL',
    closeModal = 'CLOSE_MODAL',
    openSideBar = 'OPEN_SIDEBAR'
}

interface PageAction {
    type: ActionTypes
}

export const pageReducer = (state: PageState, action: PageAction) => {
    switch(action.type) {
        case ActionTypes.openModal: {
            return {
                ...state,
                modalOpen: true
            }
        } case ActionTypes.closeModal: {
            return {
                ...state,
                modalOpen: false
            }
        } case ActionTypes.openSideBar: {
            return {
                ...state,
                sideBarOpen: true
            }
        } default: return state;
    }
}