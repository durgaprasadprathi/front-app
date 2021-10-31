import { postAPI } from '../../apiCalls/functions/index';
import * as actionTypes from './actionTypes';

export function importWorkspace(file:any){
    return {
        type: actionTypes.IMPORT_WORKSPACE,
        payload: {file},
    };
}

export function exportWorkspace(){
    console.log("asdsad")
    return {
        type: actionTypes.EXPORT_WORKSPACE,
    };
}


