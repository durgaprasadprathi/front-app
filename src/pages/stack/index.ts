import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose, bindActionCreators } from "redux";

import Layout from "./layout";
import "./styles.scss";
import { onLoad, addUpdateStack, deleteStack, updateSearch, updatePageNumber, updateOverlay, updateSelected, importStack, exportStack } from "./actions";

const mapStateToProps = (state: any) => {
    return {stack:state.Stack}
}

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators(
        {
            onLoad,
            addUpdateStack,
            deleteStack,
            updateSearch,
            updatePageNumber,
            updateOverlay,
            updateSelected,
            importStack,
            exportStack,

        },
        dispatch
    );

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(Layout);
