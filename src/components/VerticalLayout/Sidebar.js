import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { updateCurrentPage } from "../../store/actions";

//Simple bar
import SimpleBar from "simplebar-react";

import SidebarContent from "./SidebarContent";


class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    

    render() {
        // console.log(this.props.activeSidebar)
        return (
            <React.Fragment>
                <div className="vertical-menu">
                    <div data-simplebar className="h-100">
                        {this.props.type !== "condensed" ? (
                            <SimpleBar style={{ maxHeight: "100%" }}>
                                <SidebarContent 
                                    updateCurrentPage={this.props.updateCurrentPage}
                                />
                            </SimpleBar>
                        ) : <SidebarContent 
                            updateCurrentPage={this.props.updateCurrentPage}
                        />}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStatetoProps = state => {
    return {
        layout: state.Layout
    };
};

export default connect(mapStatetoProps, {updateCurrentPage})(withRouter(Sidebar));
