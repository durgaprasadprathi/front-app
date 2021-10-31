import * as actionTypes from './actionTypes';

export type Diagram = {

    loadFinish: boolean;
    allPalettes: Array<any>,
    allFilteredPalettes: Array<any>,
    allProperties: Array<any>,

    rightBarProperty: any;
    message: Array<any>,
    allStack: Array<any>,
    workspaceId: any,
    selectedStack: any,


    canvasState: Array<any>,
    canvasConnections: Array<any>
    firstCanvasState: Array<any>,
    firstCanvasConnections: Array<any>
    canvasProperties: Array<any>;

    actionState: Array<any>,

    allFolders: any,
    fileData: any,
    otherNameChange: any,
    loading: boolean,
};

const initialState: Diagram = {

    loadFinish: false,
    allPalettes: [],
    allFilteredPalettes: [],
    allProperties: [],

    rightBarProperty: {},
    message: [] as Array<any>,
    workspaceId: null,
    allStack: [],
    selectedStack: {},

    firstCanvasState: [],
    canvasState: [],
    firstCanvasConnections: [],
    canvasConnections: [],
    canvasProperties: [],

    actionState: [],

    allFolders: {},
    fileData: '',
    otherNameChange: 0,
    loading: false,
}

const diagram = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.ON_LOAD_FINISH:
            state = {
                ...state,
                loadFinish: action.payload,
            }
            break;
        case actionTypes.UPDATE_CANVAS_STATE:
            state = {
                ...state,
                canvasProperties: action.payload
            }
            break;
        case actionTypes.UPDATE_ALL_STATE_STATE:
            state = {
                ...state,
                canvasState: action.payload.canvasState,
                canvasConnections: action.payload.connections,
                firstCanvasState: action.payload.canvasState,
                firstCanvasConnections: action.payload.connections,
                canvasProperties: action.payload.properties,
                message: action.payload.message,
                actionState: action.payload.state
            }
            break;
        case actionTypes.UPDATE_RIGHT_BAR:
            state = {
                ...state,
                rightBarProperty: action.payload
            }
            break;
        case actionTypes.CANVAS_MESSAGE_UPDATE:
            state = {
                ...state,
                message: [{
                    type: action.messageType,
                    text: action.payload,
                    time: action.messageTime,
                    content: action.content
                }, ...state.message]
            }
            break;
        case actionTypes.UPDATE_STACK_DATA:
            state = {
                ...state,
                allStack: action.payload
            }
            break;
        case actionTypes.SELECT_SINGLE_STACK_DATA:
            state = {
                ...state,
                selectedStack: action.payload
            }
            break;
        // case actionTypes.UPDATE_ALL_CANVAS_STATE:
        //     state = {
        //         ...state,
        //         canvasState: action.payload.canvasState,
        //         canvasConnections: action.payload.canvasConnections,
        //         canvasProperties: action.payload.canvasProperties,
        //     }
        //     break;
        case actionTypes.UPDATE_ACTION_STATE:
            state = {
                ...state,
                actionState: [
                    action.payload.actionState,
                    ...state.actionState,
                ]
            }
            break;
        case actionTypes.UPDATE_INITIAL_DATA:
            state = {
                ...state,
                allPalettes: action.payload.allPalettes,
                allFilteredPalettes: action.payload.allFilteredPalettes,
                allProperties: action.payload.allProperties
            }
            break;
        case actionTypes.UPDATE_SELECTED_PALETTE:
            state = {
                ...state,
                allFilteredPalettes: action.payload.allFilteredPalettes,
            }
            break;
        case actionTypes.GET_FILE:
            state = {
                ...state,
                allFilteredPalettes: action.payload.allFilteredPalettes,
            }
            break;
        case actionTypes.UPDATE_FOLDERS:
            state = {
                ...state,
                allFolders: action.payload.allFolders,
            }
            break;

        case actionTypes.UPDATE_FILE:
            state = {
                ...state,
                fileData: action.payload.fileData,
            }
            break;
        case actionTypes.UPDATE_NODE_CONNECTION:
            state = {
                ...state,
                canvasState: action.payload.node,
                canvasConnections: action.payload.connection,
            }
            break;
        case actionTypes.UPDATE_NODE_PROPERTY:
            state = {
                ...state,
                canvasProperties: action.payload.properties,
            }
            break;
        case actionTypes.UPDATE_ACTION_STATE_DATA:
            state = {
                ...state,
                message: action.payload.message,
                actionState: action.payload.state
            }
            break;
        case actionTypes.UPDATE_ACTION_ONLY:
            // console.log(action.payload.state, "sdsaadsa")
            state = {
                ...state,
                actionState: action.payload.state
            }
            break;
        case actionTypes.UPDATE_OTHER_NAME:
            // console.log(action.payload.state, "sdsaadsa")
            state = {
                ...state,
                otherNameChange: action.payload
            }
            break;
        case actionTypes.LOADING_START:
            // console.log(action.payload.state, "sdsaadsa")
            state = {
                ...state,
                loading: true
            }
            break;
        case actionTypes.LOADING_END:
            // console.log(action.payload.state, "sdsaadsa")
            state = {
                ...state,
                loading: false
            }
            break;
        default:
            state = { ...state };
            break;

    }
    return state;
}

export default diagram;