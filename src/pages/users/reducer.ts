import * as actionTypes from './actionTypes';

export type Stack = {
    allData: Array<any>;
    selected: Set<string>;
    selectedItem: any,
    search: string,
    sortAttribute: string,
    sortType: string,
    pageNo: number,
    total: number,
    overlay: boolean,
};

const initialState: Stack = {
    allData: [],
    selected: new Set<string>(),
    selectedItem: null,
    search: '',
    sortAttribute: "stackId",
    sortType: "desc",
    pageNo: 1,
    total: 0,
    overlay: false,
}

const diagram = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.UPDATE_STACK_DATA:
            state = {
                ...state,
                allData: action.allData,
                total: action.total
            }
            break;
        case actionTypes.GET_STACK:
            state = {
                ...state,
            }
            break;
        case actionTypes.UPDATE_SEARCH:
            state = {
                ...state,
                search: action.payload
            }
            break;
        case actionTypes.UPDATE_SORT:
            state = {
                ...state,
            }
            break;
        case actionTypes.UPDATE_PAGE_NUMBER:
            state = {
                ...state,
                pageNo: action.payload
            }
            break;
        case actionTypes.UPDATE_OVERLAY:
            state = {
                ...state,
                overlay: action.payload
            }
            break;
        case actionTypes.UPDATE_SELECTED:
            state = {
                ...state,
                selected: action.payload
            }
            break;
        default:
            state = { ...state };
            break;

    }
    // console.log(state);
    return state;
}

export default diagram;