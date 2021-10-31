import { put, call, takeLatest, select } from "redux-saga/effects";
import * as ACTION_TYPES from "./actionTypes";
import {
    onLoad,
    updateStackData,
    updateSelected,
    updateOverlay,
} from "./actions";

import { apiLoading, apiMessage, apiErrorMessage } from '../../store/actions';

import fileDownload from 'js-file-download';
import { postAPI, postAPIFunction, putAPIFunction,  putAPI, deleteAPIFunction, getAPI, postFormDataAPIFunction, getAPIFunction, getAPIFunctionBlob } from "../../apiCalls/functions/index";
import { ADD_STACK, UPDATE_STACK, DELETE_STACK, SEARCH_STACK, IMPORT_STACK, EXPORT_STACK } from "../../apiCalls/urls/executionModule/stack";

const mapStateToProps = (state: any) => {
    return state.Stack;
}



const fetchAllStack = async (search: string, attribute: string, sort: string, pageNo:number) => {
    let _search = {
        "search": search,
        "sort": {
            "attribute": attribute,
            "sort": sort
        },
        "pageNo": pageNo,
        "itemPerPage": 10
    };

    const allData: any = await postAPI(SEARCH_STACK, _search);
    if (allData.status === "success") {
        return allData.data;
    }
    else {
        return {
            allData: [],
            total: 0,
        };
    }
}

const addStack = async (data: any, stackId: any) => {
    console.log(data)

    let _data = {
        ...data
    }
    let allData:any;
    if(stackId) {
        allData = await putAPIFunction(UPDATE_STACK+stackId, _data)
    }
    else{
        allData = await postAPIFunction(ADD_STACK, _data)
    }
    return allData;
}

const deleteStackAPI = async (selected: any) => {
    let myArray = Array.from(selected);
    
    console.log(myArray)
    let postData = {
        ids: myArray
    }
    const allData: any = await deleteAPIFunction(DELETE_STACK, postData)
    return allData;
}

const importStack = async (file: any) => {
    let formData = new FormData();
    formData.append("file", file);

    const result: any = await postFormDataAPIFunction(IMPORT_STACK, formData);
    return result
}

const exportStack = async () => {
    
    const result: any = await getAPIFunctionBlob(EXPORT_STACK);
    console.log(result);
    let fileName =  'stack' + Date.now() + '.xlsx';
    fileDownload(result, fileName);
    return result
}

//SAGA

function* load(): any {
    try {
        const stack = yield select(mapStateToProps);
        const allStack = yield call(fetchAllStack, stack.search, stack.sortAttribute, stack.sortType, stack.pageNo);
        yield put(updateStackData(allStack.data, allStack.total));
    }
    catch (e) {
        console.log("Error")
    }
}

//Saga call on add and update stack
function* addUpdateStack(action: any): any {
    const data = action.payload.data;
    const stackId  = action.payload.stackId;
    console.log(action);
    try {

        console.log(data, stackId);
        yield put(apiLoading());
        const addStackData = yield call(addStack, data, stackId);
        console.log(addStackData)
        if(addStackData.status){
            yield put(apiMessage("Success"))
            yield put(updateOverlay(false));
        }
            
        else
            yield put(apiErrorMessage(addStackData.message))
        
        yield call(apiLoading);
        yield call(load)

   }
    catch (e) {
        console.log("Error")
    }
}

//saga call on delete stack
function* deleteStack(action: any): any {
    try {
        // console.log(selected);
        yield put(apiLoading());
        const stack = yield select(mapStateToProps);
        console.log(stack);
        const selected = stack.selected;
        const addStackData = yield call(deleteStackAPI, selected);
        console.log(addStackData)
        if(addStackData.status){
            yield put(apiMessage("Success"))
            yield put(updateSelected(new Set<string>()))
        }
        else
            yield put(apiErrorMessage(addStackData.message))
        yield call(apiLoading);
        yield call(load)

   }
    catch (e) {
        console.log("Error")
    }
}

function* importFunction(action: any): any {

    let file = action.payload.file
    try {
        yield put(apiLoading());
        let result = yield call(importStack, file)
        console.log(result)
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
        let result = yield call(exportStack)
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


export function* stackSaga() {
    yield takeLatest(ACTION_TYPES.ON_LOAD, load);
    yield takeLatest(ACTION_TYPES.ADD_UPDATE_STACK, addUpdateStack);
    yield takeLatest(ACTION_TYPES.DELETE_STACK, deleteStack);
    yield takeLatest(ACTION_TYPES.IMPORT_STACK, importFunction);
    yield takeLatest(ACTION_TYPES.EXPORT_STACK, exportFunction);
}


