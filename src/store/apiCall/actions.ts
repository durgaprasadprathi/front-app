import { LOADING, MESSAGE, ERROR, LOADING_END } from "./actionTypes";

export function apiLoading():any {
    return {
        type: LOADING,
    };
}

export function apiLoadingEnd():any {
    return {
        type: LOADING_END,
    };
}

export function apiMessage(content:string):any {
    return {
        type: MESSAGE,
        content:content,
    };
}

export function apiErrorMessage(content:string):any {
    return {
        type: ERROR,
        content:content,
    };
}