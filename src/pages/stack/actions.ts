import * as actionTypes from './actionTypes';

export function onLoad(){
    return {
        type: actionTypes.ON_LOAD,
    };
}

export function updateStackData(allData:any, total:number){
    return {
        type: actionTypes.UPDATE_STACK_DATA,
        allData: allData,
        total: total,
    };
}


export function getStack(content:any) {
    return {
        type: actionTypes.GET_STACK,
        payload:content,
    };
}

export function addUpdateStack(data:any, stackId:any) {
    return {
        type: actionTypes.ADD_UPDATE_STACK,
        payload:{data, stackId}
    };
}

export function deleteStack() {
    return {
        type: actionTypes.DELETE_STACK,
    };
}

export function updateSearch(search:string) {
    return {
        type: actionTypes.UPDATE_SEARCH,
        payload: search,
    };
}

export function updateSort(sortAttribute:string, sortType:string) {
    return {
        type: actionTypes.UPDATE_SORT,
        payload: {sortAttribute, sortType}
    };
}

export function updatePageNumber(page:number) {
    return {
        type: actionTypes.UPDATE_PAGE_NUMBER,
        payload: page
    };
}

export function updateOverlay(overlay: boolean) {
    return {
        type: actionTypes.UPDATE_OVERLAY,
        payload: overlay
    };
}
export function updateSelected(selected:any) {
    console.log(selected);
    return {
        type: actionTypes.UPDATE_SELECTED,
        payload: selected
    };
}