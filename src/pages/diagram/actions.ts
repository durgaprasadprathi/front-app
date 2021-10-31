import { postAPI } from '../../apiCalls/functions/index';
import workspace from '../workspace';
import * as actionTypes from './actionTypes';


export function onLoad(stackId:any) {
    return {
        type: actionTypes.ON_LOAD,
        payload:{stackId},
    };
}

export function onLoadFinish(load:any) {
    return {
        type: actionTypes.ON_LOAD_FINISH,
        payload:load,
    };
}

export function updateCanvasJson(content:any) {
    return {
        type: actionTypes.UPDATE_CANVAS_STATE,
        payload:content,
    };
}

export function updateCanvasRightBar(content:any) {
    return {
        type: actionTypes.UPDATE_RIGHT_BAR,
        payload:content,
    };
}

export function getAllStack(workspaceId:any) {
    // console.log(workspaceId)
    return{
        type: actionTypes.GET_STACK_DATA,
        payload:{workspaceId}
    }
}

export function updateAllStack(allStack:any) {
    return{
        type: actionTypes.UPDATE_STACK_DATA,
        payload:allStack
    }
}

export function selectSingleStack(stack:any) {
    return{
        type: actionTypes.SELECT_SINGLE_STACK_DATA,
        payload:stack
    }
}

export function updateDraftState(showMessage: boolean, stackId:any) {
    return{
        type: actionTypes.UPDATE_DRAFT_STATE,
        payload:{showMessage, stackId}
    }
}

export function updateAllCanvasState(canvasState:any, connections: any, properties: any, message: any = [], state: any = []) {
    return{
        type: actionTypes.UPDATE_ALL_STATE_STATE,
        payload: { canvasState, connections, properties, message, state }
    }
}

export function updateActionState(actionState: any){
    return{
        type: actionTypes.UPDATE_ACTION_STATE,
        payload:{actionState}
    }
}

export function updateCanvasMessage(messageType:string, message:string,  messageTime:string, content:any) {
    return {
        type: actionTypes.CANVAS_MESSAGE_UPDATE,
        messageType: messageType,
        messageTime:messageTime,
        payload:message,
        content:content
    };
}

export function onSave(stackId: any){
    return{
        type: actionTypes.SAVE_CANVAS,
        payload:{stackId}
    }
}

export function afterSaveFunction(stackId: any, action:any){
    return{
        type: actionTypes.AFTER_SAVE_CANVAS,
        payload:{stackId, action}
    }
}

//New

export function updateInitialData(allPalettes:any, allFilteredPalettes:any, allProperties:any){
    // console.log(allPalettes)
    return{
        type: actionTypes.UPDATE_INITIAL_DATA,
        payload:{allPalettes, allFilteredPalettes, allProperties}
    }
}

export function updateSelectedData( allFilteredPalettes:any){
    return{
        type: actionTypes.UPDATE_SELECTED_PALETTE,
        payload:{allFilteredPalettes}
    }
}

export function updateFolders( allFolders:any){
    return{
        type: actionTypes.UPDATE_FOLDERS,
        payload:{allFolders}
    }
}

export function getFileData(stackId: any, path: string){
    return{
        type: actionTypes.GET_FILE_DATA,
        payload:{stackId, path}
    }
}

export function updateFile( fileData:any){
    return{
        type: actionTypes.UPDATE_FILE,
        payload:{fileData}
    }
}

export function getFile(){
    return{
        type: actionTypes.GET_FILE,
    }
}


//new function
export const updateNodeConnections = (node:any, connection:any) =>{
    // console.log(node, connection)
    return{
        type: actionTypes.UPDATE_NODE_CONNECTION,
        payload:{node, connection}
    }
}

export const handleNodeConnections = (node:any, connection:any) =>{
    return{
        type: actionTypes.HANDLE_NODE_CONNECTION,
        payload:{node, connection}
    }
}

export const updateNodeProperties = (properties:any) =>{
    return{
        type: actionTypes.UPDATE_NODE_PROPERTY,
        payload:{properties}
    }
}

export const handleNodeProperties = (properties:any, message:any) =>{
    return{
        type: actionTypes.HANDLE_NODE_PROPERTY,
        payload:{properties, message},
    }
}



export const updateStateActionData = (message:any, state:any) =>{
    return{
        type: actionTypes.UPDATE_ACTION_STATE_DATA,
        payload:{message, state},
    }
}

export const handleStateActionData = (message:any, state:any) =>{
    return{
        type: actionTypes.HANDLE_ACTION_STATE_DATA,
        payload:{message, state},
    }
}

export const handleActionOnly = (state:any) =>{
    return{
        type: actionTypes.UPDATE_ACTION_ONLY,
        payload:{state},
    }
}

export const updateOtherName = (state:any) =>{
    return{
        type: actionTypes.UPDATE_OTHER_NAME,
        payload:state,
    }
}

export function apiLoading():any {
    return {
        type: actionTypes.LOADING_START,
    };
}

export function apiLoadingEnd():any {
    return {
        type: actionTypes.LOADING_END,
    };
}





