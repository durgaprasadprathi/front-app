import { put, call, takeLatest, select } from "redux-saga/effects";
import * as ACTION_TYPES from "./actionTypes";
import {
    updateAllStack, selectSingleStack, updateDraftState, updateAllCanvasState, updateCanvasMessage, updateActionState, updateInitialData, updateFolders, updateFile, onLoadFinish, updateNodeConnections, updateNodeProperties, updateStateActionData, handleStateActionData, handleActionOnly, handleNodeProperties, apiLoadingEnd, apiLoading
} from "./actions";

import { apiMessage, apiErrorMessage } from '../../store/actions';
import { currentDate } from "../../shared/dateFunctions";

import { getAPIFunction, postAPIFunction } from "../../apiCalls/functions/index";
import { GET_ONE_WORKSPACE } from "../../apiCalls/urls/executionModule/workspace";
import { GET_ONE_STACK } from "../../apiCalls/urls/executionModule/stack"
import { UPDATE_JSON, VALIDATE_CANVAS, APPLY_CANVAS, PLAN_CANVAS, GET_COMPONENTS, GET_FOLDER, GET_FILE } from "../../apiCalls/urls/executionModule/canvas";
import { generatePalette } from "../../shared/canvas";


const mapStateToProps = (state: any) => {
    return state.Diagram;
}

const fetchInitialsApis = async (state: any) => {
    let components: any = await getAPIFunction(GET_COMPONENTS);
    return components;
}

const fetchAllStackOfWorkspace = async (workspaceId: any) => {
    let stacks: any = await getAPIFunction(GET_ONE_WORKSPACE + workspaceId + "/stacks")
    return stacks
}

const saveState = async (workspace: any, canvasState: any, connections: any, properties: any, showMessage: boolean, message: any = [], state: any = []) => {
    // console.log(showMessage)


    let data = {
        "stackId": workspace,
        "draftState": {
            "canvasState": canvasState ? canvasState : [],
            "connections": connections ? connections : [],
            "properties": properties ? properties : [],
            "message": message,
            "state": state
        }
    }

    // console.log(data);
    let save: any = await postAPIFunction(UPDATE_JSON, data)
    // console.log(save)
    // console.log(showMessage, "show")
    let messageData = "";
    if (showMessage) {
        if (save.status) {
            messageData = "Data saved successfully."
        }
        else {

        }
    }
    return messageData;
}

const getStackInformation = async (stackId: any) => {
    // console.log(stackId)
    let stackData: any = await getAPIFunction(GET_ONE_STACK + stackId);
    // console.log(stackData)
    let properties: any = [];
    if (stackData) {
        if (stackData.data.stackDraftState) {
            return stackData.data.stackDraftState
        }
        else {
            return {
                canvasState: [],
                connections: [],
                message: [],
                properties: [],
                state: []
            }
        }

    }
    else {
        return {
            canvasState: [],
            connections: [],
            message: [],
            properties: [],
            state: []
        }
    }
}

//Execution API
//Save
const saveCanvas = async (stackId: any) => {
    let data = {
        "stackId": stackId,
        "isDraft": false,
    }
    // console.log(data);
    let save: any = await postAPIFunction(UPDATE_JSON, data)
    // let save = {
    //     status: "success",
    //     data: ""
    // }
    return save;

}
//Validate-Plan-Apply
const customActionFunction = async (stackId: any, action: string) => {
    let data = {
        "stackId": stackId,
    }
    let url = ''
    switch (action) {
        case "Validate":
            url = VALIDATE_CANVAS;
            break;
        case "Apply":
            url = APPLY_CANVAS;
            break;
        case "Plan":
            url = PLAN_CANVAS;
            break;
        default:
            return null;
    }
    let save: any = await postAPIFunction(url, data)

    return save;
}

//FIle nad folders
const getFolder = async (stackId: any) => {
    let data = {
        "stackId": stackId,
        "path": "/"
    }
    // console.log(data);
    let folder: any = await postAPIFunction(GET_FOLDER, data)
    // if (folder && folder.status === "success") {
    //     setFolders(folder.data)
    // }
    return folder;
    // console.log(folder);
}

const getFileDataHandler = async (path: any, stackId: any) => {
    let data = {
        "stackId": stackId,
        "path": path
    }
    // console.log(data);
    let file: any = await postAPIFunction(GET_FILE, data)
    // if (file && file.status === "success") {
    //     setFileData(file.data)
    // }
    // console.log(file);
    return file;
}

const putNameInPalette = (prop:any) =>{
    let _prop:any = [];
    prop && prop.forEach((p:any) =>{

        

        let _properties:any = [
            {
                id:0,
                name:"Name",
                defaultValue:p.name
            },
            ...p.properties
        ]

        console.log(_properties)

        _prop.push({
            ...p,
            properties:_properties,
        })
    })

    // console.log(prop)

    // return prop;
    return _prop;
}

function* onLoad(action: any): any {
    const stackId = action.payload.stackId;
    try {
        yield put(onLoadFinish(false))
        yield put(updateAllCanvasState([], [], [], [], []))

        const stackDraftState = yield call(getStackInformation, stackId);
        // console.log(stackDraftState)
        const components = yield call(fetchInitialsApis, stackId)
        // console.log(components)
        //update initial components
        if (components.status) {
            let palette = generatePalette(components.data);
            console.log(palette);

            // let _properties = putNameInPalette(palette.properties);
            yield put(updateInitialData(palette.components, palette.components, palette.properties))
        }
        //update folders
        const folders = yield call(getFolder, stackId)
        if (folders.status) {
            yield put(updateFolders(folders.data))
        }
        //update canvas
        yield put(updateAllCanvasState(stackDraftState.canvasState, stackDraftState.connections, stackDraftState.properties, stackDraftState.message, stackDraftState.state))

        yield put(onLoadFinish(true))
    }
    catch (err) {
        console.log(err);
    }
}

function* getFileData(action: any): any {
    const stackId = action.payload.stackId;
    const path = action.payload.path;
    try {
        // console.log(diagram);
        const status = yield call(getFileDataHandler, stackId, path);
        // console.log(status)
        if (status.data) {
            yield put(updateFile(status.data))
        }
    }
    catch (err) {
        console.log(err);
    }
}

function* onWorkSpace(action: any): any {
    const workspaceId = action.payload.workspaceId;
    try {
        const allStack = yield call(fetchAllStackOfWorkspace, workspaceId);
        // console.log(allStack);
        if (allStack.status) {
            yield put(updateAllStack(allStack.data))
            yield put(selectSingleStack(allStack.data[0]))
            // console.log(allStack.data[0])
        }
    }
    catch (err) {
        console.log(err);
    }
}


function* onDraftSave(action: any): any {
    const stackId = action.payload.stackId;
    const showMessage = action.payload.showMessage;

    try {
        const diagram = yield select(mapStateToProps);
        // console.log(diagram);
        // console.log("11")
        const status = yield call(saveState, stackId, diagram.canvasState, diagram.canvasConnections, diagram.canvasProperties, showMessage, diagram.message, diagram.actionState);

        // console.log(status);
    }
    catch (err) {
        console.log(err);
    }
}

//Execution
//Save
function* onSave(action: any): any {
    const stackId = action.payload.stackId;
    try {
        yield put(apiLoading());
        const diagram = yield select(mapStateToProps);

        let _lastAction = [
            {
                name: "Save",
                action: "warning"
            },
            ...diagram.actionState
        ]


        // console.log(_lastAction)

        yield put(handleActionOnly(_lastAction))

        const save = yield call(saveCanvas, stackId);



        // console.log(result);
        let message = {};
        let lastAction = {};

        if (save.status) {
            message = {
                type: "success",
                text: "Canvas successfully saved.",
                time: currentDate(),
                content: save.data ?save.data : save.message,
            }
            lastAction = {
                name: "Save",
                action: "success"
            }
            // yield put(updateCanvasMessage("success", "Canvas successfully saved.", currentDate(), save.data))
        }
        else {
            message = {
                type: "error",
                text: "There is an error saving canvas state.",
                time: currentDate(),
                content: save.data ?save.data : save.message,
            }
            lastAction = {
                name: "Save",
                action: "error"
            }
            // yield put(updateCanvasMessage("error", "There is an error saving canvas state.", currentDate(), save.data))
        }

        let _message = [
            message,
            ...diagram.message,

        ]


        let _actionState = [...diagram.actionState];
        _actionState.pop();

        _lastAction = [
            lastAction,
            ..._actionState
        ]
        // console.log("12")
        // yield put(updateStateActionData(_message, _lastAction));
        const status = yield call(saveState, diagram.selectedStack.stackId, diagram.canvasState, diagram.canvasConnections, diagram.canvasProperties, false, _message, _lastAction);

        yield put(handleStateActionData(_message, _lastAction))
        // yield put(updateActionState("Save"));
        yield put(updateDraftState(false, stackId));
        yield put(apiLoadingEnd());
    }
    catch (err) {
        console.log(err);
    }
}

function* afterSaveFunction(action: any): any {
    const stackId = action.payload.stackId;
    const apiAction = action.payload.action;
    try {
        // console.log(stackId, apiAction);
        const diagram = yield select(mapStateToProps);
        // yield put(updateActionState(apiAction));
        yield put(apiLoading());

        let _lastAction = [
            {
                name: apiAction,
                action: "warning"
            },
            ...diagram.actionState
        ]


        yield put(handleActionOnly(_lastAction))

        const result = yield call(customActionFunction, stackId, apiAction);
        // console.log(result);



        let message = {};
        let lastAction = {};

        if (result.status) {
            message = {
                type: "success",
                text: apiAction + " API executed successfully",
                time: currentDate(),
                content: result.data ? result.data : result.message, 
            }
            lastAction = {
                name: apiAction,
                action: "success"
            }
        }
        else {
            message = {
                type: "error",
                text: "Error occurred in " + apiAction + " API",
                time: currentDate(),
                content: result.data ? result.data : result.message, 
            }
            lastAction = {
                name: apiAction,
                action: "error"
            }
        }

        let _message = [
            message,
            ...diagram.message,

        ]

        let _actionState = [...diagram.actionState];
        _actionState.pop();

        _lastAction = [
            lastAction,
            ..._actionState
        ]
        // console.log("13")

        // yield put(updateStateActionData(_message, _lastAction));
        const status = yield call(saveState, diagram.selectedStack.stackId, diagram.canvasState, diagram.canvasConnections, diagram.canvasProperties, false, _message, _lastAction);

        // if (result.status)
        //     yield put(updateCanvasMessage("success", apiAction + " API executed successfully", currentDate(), result.data))
        // else {
        //     yield put(updateCanvasMessage("error", "Error occurred in " + apiAction + " API", currentDate(), result.data))
        // }
        yield put(handleStateActionData(_message, _lastAction))
        yield put(updateDraftState(false, stackId));
        yield put(apiLoadingEnd());
    }
    catch (err) {
        console.log(err);
    }
}

//new sagas
function* nodeConnectionHandler(action: any): any {
    const node = action.payload.node;
    const connection = action.payload.connection;
    try {
        yield put(updateNodeConnections(node, connection));
        const diagram = yield select(mapStateToProps);
        // console.log("14")

        let _properties: any = [];
        if ((node && node.length > 0) && (diagram.canvasProperties && diagram.canvasProperties.length > 0)) {
            node.forEach((c: any) => {
                let _single = diagram.canvasProperties.filter((f: any) => f.key == c.key)
                if (_single && _single.length > 0) {
                    _properties.push(_single[0])
                }
            })
        }

        // console.log(_properties)
        

        // console.log(diagram.selectedStack.stackId, node, connection, diagram.canvasProperties, false, diagram.message, diagram.actionState)
        const status = yield call(saveState, diagram.selectedStack.stackId, node, connection, _properties, false, diagram.message, diagram.actionState);
        // console.log(status);

        yield put(handleNodeProperties(_properties, false))
    }
    catch (err) {
        console.log(err);
    }
}

function* nodePropertiesHandler(action: any): any {
    const properties = action.payload.properties;
    const message = action.payload.message;

    try {
        yield put(updateNodeProperties(properties));
        const diagram = yield select(mapStateToProps);
        console.log("15")
        // console.log(diagram)
        const status = yield call(saveState, diagram.selectedStack.stackId, diagram.canvasState, diagram.canvasConnections, properties, message, diagram.message, diagram.actionState);
        // console.log(status);

        if (status) {
            yield put(apiMessage(status));
        }
    }
    catch (err) {
        console.log(err);
    }
}

function* nodeStateHandler(action: any): any {
    const state = action.payload.state;
    const message = action.payload.message

    try {
        yield put(updateStateActionData(message, state));
        const diagram = yield select(mapStateToProps);
        console.log("16")
        // console.log(diagram.selectedStack.stackId, diagram.canvasState, diagram.canvasConnections, properties, false, diagram.message, diagram.actionState)
        const status = yield call(saveState, diagram.selectedStack.stackId, diagram.canvasState, diagram.canvasConnections, diagram.canvasProperties, false, message, state);
        // console.log(status);
    }
    catch (err) {
        console.log(err);
    }
}




export function* diagramSaga() {
    yield takeLatest(ACTION_TYPES.ON_LOAD, onLoad);
    yield takeLatest(ACTION_TYPES.GET_STACK_DATA, onWorkSpace);
    yield takeLatest(ACTION_TYPES.GET_FILE_DATA, getFileData);
    yield takeLatest(ACTION_TYPES.UPDATE_DRAFT_STATE, onDraftSave);
    yield takeLatest(ACTION_TYPES.SAVE_CANVAS, onSave);
    yield takeLatest(ACTION_TYPES.AFTER_SAVE_CANVAS, afterSaveFunction);

    yield takeLatest(ACTION_TYPES.HANDLE_NODE_CONNECTION, nodeConnectionHandler)
    yield takeLatest(ACTION_TYPES.HANDLE_NODE_PROPERTY, nodePropertiesHandler)
    yield takeLatest(ACTION_TYPES.HANDLE_ACTION_STATE_DATA, nodeStateHandler)
}