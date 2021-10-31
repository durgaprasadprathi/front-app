import { put, call, takeLatest, select } from "redux-saga/effects";
import * as ACTION_TYPES from "./actionTypes";
import fileDownload from 'js-file-download';

import {

} from "./actions";

import { apiLoading, apiMessage, apiErrorMessage } from '../../store/actions';


import { postAPIFunction, putAPIFunction, deleteAPIFunction, postFormDataAPIFunction, getAPIFunctionBlob } from "../../apiCalls/functions/index";
import { IMPORT_WORKSPACE, EXPORT_WORKSPACE } from "../../apiCalls/urls/executionModule/workspace";

const mapStateToProps = (state: any) => {
    return state.Workspace;
}

const importWorkspace = async (file: any) => {
    let formData = new FormData();
    formData.append("file", file);

    const result: any = await postFormDataAPIFunction(IMPORT_WORKSPACE, formData);
    return result
}

const exportWorkspace = async () => {
    // console.log("Test blob")
    const result: any = await getAPIFunctionBlob(EXPORT_WORKSPACE);
    // console.log(result, "a");
    let fileName =  'workspace' + Date.now() + '.xlsx';
    fileDownload(result, fileName);
    return result
}

//SAGA

function* load(): any {
    try {

    }
    catch (e) {
        console.log("Error")
    }
}

function* importFunction(action: any): any {

    let file = action.payload.file
    try {
        yield put(apiLoading());
        let result = yield call(importWorkspace, file)
        if (result.status) {
            yield put(apiMessage("Success"))
        }
        else
            yield put(apiErrorMessage("Something went wrong. Please try again"))

    }
    catch (e) {
        console.log("Error")
    }
}

function* exportFunction(action: any): any {
    console.log("asdsadsa")
    try {
        yield put(apiLoading());
        let result = yield call(exportWorkspace)
        if (result.status) {
            yield put(apiMessage("Success"))
        }
        else
            yield put(apiErrorMessage(result.message))

    }
    catch (e) {
        console.log("Error")
    }
}


export function* workspaceSaga() {
    yield takeLatest(ACTION_TYPES.ON_LOAD, load);
    yield takeLatest(ACTION_TYPES.IMPORT_WORKSPACE, importFunction);
    yield takeLatest(ACTION_TYPES.EXPORT_WORKSPACE, exportFunction);
}


