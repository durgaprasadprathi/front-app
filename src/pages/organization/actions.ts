import * as actionTypes from './actionTypes';

export function importOrganization(file:any){
    return {
        type: actionTypes.IMPORT_ORGANIZATION,
        payload: {file},
    };
}

export function exportOrganization(){
    // console.log("asdsad")
    return {
        type: actionTypes.EXPORT_ORGANIZATION,
    };
}

