interface RegionData {
    [region: string]: {
        [viewDate: string] : {
            technologies: {
                [key: string]: number
            },
            totalCount: number;
        };
    }
}
export interface PageState {
    modalOpen: boolean,
    sidebarOpen: boolean,
    regionDataAll?: RegionData[],
    viewTechnology: string | null,
    viewDate: string,
    selectedRegion?: RegionData,
    selectedRegionID?: string
}

export enum ActionTypes {
    openModal = 'OPEN_MODAL',
    closeModal = 'CLOSE_MODAL',
    toggleModal = 'TOGGLE_MODAL',
    openSideBar = 'OPEN_SIDEBAR',
    regionData = 'REGION_DATA',
    viewTechnology = 'VIEW_TECHNOLOGY',
    viewDate = 'VIEW_DATE',
    selectRegion = 'SELECT_REGION',
    selectRegionID = 'SELECT_REGION_ID'
}

interface PageAction {
    type: ActionTypes;
    payload? : any;
    id: string;
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
        } case ActionTypes.selectRegion: {
            return {
                ...state,
                selectedRegion: action.payload
            }
        } case ActionTypes.selectRegionID: {
            return {
                ...state,
                selectedRegionID: action.id
            }
        }
        default: return state;
    }
}