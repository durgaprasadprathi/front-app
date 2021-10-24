import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose, bindActionCreators } from "redux";

import Layout from "./layout";
import { onLoad, updateCanvasRightBar, updateCanvasJson, updateCanvasMessage, getAllStack, updateDraftState , updateActionState, onSave, afterSaveFunction, selectSingleStack, updateSelectedData, getFile, getFileData} from "./actions";

const mapStateToProps = (state: any) => {
    return { stack: state.Stack }
}

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators(
        {
            onLoad,
            updateCanvasRightBar, 
            updateCanvasJson, 
            updateCanvasMessage,
            getAllStack,
            updateDraftState,
            updateActionState,
            onSave,
            afterSaveFunction, 
            selectSingleStack,
            updateSelectedData,
            getFile,
            getFileData,
        },
        dispatch
    );

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(Layout);
