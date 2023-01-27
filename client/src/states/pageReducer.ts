export type RegionData = {
    [date: string] : {
        technologies: {
            [technology: string]: number
        }, total_job_count: number
    } & {
        region: string
    }
}

export type TechData = {
    [date:string]: {
        regions: {
            [region: string]: number
        },
        total_job_count: number
    } & {
        technology: string
    }
}

type rrData = RegionData | {region: string}

export interface RData {
    [date: string] : {
        technologies: {
            [technology: string]: number
        }, total_job_count: number
    } & {
        region: string
    }
}

export interface SelectedRegionData {
    [key: string]: {
        technologies: {
            [key: string]: number
        }, total_job_count: number
    } & {
        region: string
    }
}

export interface SelectedRegion {
    [region: string]: {
        [viewDate: string]: {
            technologies: {
                [key: string ]: any
            },
            totalCount: number;
        }
    } & {
        id: string; 
        totalCountAll: number;
    }
}

// export interface TechnologyData {
//     [key: string] : {
//         regions: {
//             [key: string]: number
//         },
//         totalCount: number
//     } & string
// }

export interface ErrorData {
    isError: boolean,
    message?: string,
}
export interface TechnologyData {
    [date:string]: {
        regions: {
            [region: string]: number
        },
        total_job_count: number
    } & {
        technology: string
    }
}


export interface PageState {
    modalOpen: boolean,
    sidebarOpen: boolean,
    sumJobs?: number,
    regionDataAll?: RegionData[],
    viewTechnology: string,
    viewDate: string,
    selectedRegion?: RegionData,
    selectedRegionID?: string,
    technologyDataAll?: TechnologyData[],
    viewByPercentage?: boolean,
    viewByFormat: string,
    scrapedDates?: string[],
    windowWidth: number,
    windowDimensions: Window,
    rData?: RData[],
    isError: ErrorData,
}

export enum ActionTypes {
    toggleModal = 'TOGGLE_MODAL',
    toggleSidebar = 'TOGGLE_SIDEBAR',
    // sum jobs by date
    sumJobs = 'SUM_JOBS',
    regionData = 'REGION_DATA',
    viewTechnology = 'VIEW_TECHNOLOGY',
    viewDate = 'VIEW_DATE',
    selectRegion = 'SELECT_REGION',
    selectRegionID = 'SELECT_REGION_ID',
    technologyData = 'TECHNOLOGY_DATA',
    viewByPercentage = 'VIEW_BY_PERCENTAGE',
    viewByFormat = 'VIEW_BY_FORMAT',
    scrapedDates = 'SCRAPED_DATES',
    windowWidth = 'WINDOW_WIDTH',
    windowDimensions = 'WINDOW_DIMENSIONS',
    rData = 'R_DATA',
    isError = 'IS_ERROR'
}

interface PageAction {
    type: ActionTypes;
    payload? : any;
    id?: string;
    viewByFormat: string;
    scrapedDates: string[];
    viewDate: string;
    viewTechnology: string;
    windowWidth: number;
    regionDataAll: RData[];
    windowDimensions: Window,
    isError: ErrorData
}

export const pageReducer = (state: PageState, action: PageAction) => {
    switch(action.type) {
        case ActionTypes.toggleModal: {
            return {
                ...state,
                modalOpen: !state.modalOpen
            }
        } case ActionTypes.toggleSidebar: {
            return {
                ...state,
                sidebarOpen: !state.sidebarOpen
            }
        } case ActionTypes.sumJobs: {
            return {
                ...state,
                sumJobs: action.payload
            }
        } case ActionTypes.regionData: {
            return {
                ...state,
                regionDataAll: action.payload
            }
        } case ActionTypes.viewDate: {
            return {
                ...state,
                viewDate: action.viewDate
            }
        } case ActionTypes.viewTechnology: {
            return {
                ...state,
                viewTechnology: action.viewTechnology
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
        } case ActionTypes.technologyData: {
            return {
                ...state,
                technologyDataAll: action.payload
            }
        } case ActionTypes.viewByPercentage: {
            return {
                ...state,
                viewByPercentage: !state.viewByPercentage
            }
        }  case ActionTypes.viewByFormat: {
            return {
                ...state,
                viewByFormat: action.viewByFormat
            }
        } case ActionTypes.scrapedDates: {
            return {
                ...state,
                scrapedDates: action.scrapedDates
            }
        } case ActionTypes.windowWidth: {
            return {
                ...state, 
                windowWidth: action.windowWidth
            }
        } case ActionTypes.rData: {
            return {
                ...state,
                rData: action.regionDataAll
            }
        } case ActionTypes.windowDimensions: {
            return {
                ...state,
                windowDimensions: action.windowDimensions
            }
        } case ActionTypes.isError: {
            return {
                ...state, 
                isError: action.isError
            }
        }
        default: return state;
    }
}