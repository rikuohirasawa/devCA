
interface RegionData {
    region: string,
    technologies: {
        [key: string]: number
    },
    totalCount: number
}
export interface PageState {
    modalOpen: boolean,
    sidebarOpen: boolean,
    regionDataAll?: RegionData[],
    viewTechnology: string | null,
    viewDate: string | null
}

export enum ActionTypes {
    openModal = 'OPEN_MODAL',
    closeModal = 'CLOSE_MODAL',
    toggleModal = 'TOGGLE_MODAL',
    openSideBar = 'OPEN_SIDEBAR',
    regionData = 'REGION_DATA',
    viewTechnology = 'VIEW_TECHNOLOGY',
    viewDate = 'VIEW_DATE'
}

interface PageAction {
    type: ActionTypes
    payload? : any
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
        } case ActionTypes.toggleModal: {
            return {
                ...state,
                modalOpen: !state.modalOpen
            }
        } case ActionTypes.openSideBar: {
            return {
                ...state,
                sideBarOpen: true
            }
        } case ActionTypes.regionData: {
            return {
                ...state,
                regionDataAll: action.payload
            }
        } case ActionTypes.viewDate: {
            return {
                ...state,
                viewDate: action.payload
            }

        }
        default: return state;
    }
}