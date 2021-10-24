import React, { useState, useEffect } from 'react';
import * as go from 'gojs';
import Diagram from '../../components/goJs/canvas/diagram';
import { produce } from 'immer';
import img from "../../../assets/images/brand/vpc.png"
import CodeEditor from "../codeEditor";
import { connect } from "react-redux";
import DeepDiff from 'deep-diff';
import { handleNodeConnections } from "../../pages/diagram/actions"



import "./styles.css";

interface AppState {
    nodeDataArray: Array<go.ObjectData>;
    linkDataArray: Array<go.ObjectData>;
    modelData: go.ObjectData;
    selectedData: go.ObjectData | null;
    skipsDiagramUpdate: boolean;
    codeEditor: boolean;
    hideCanvas: boolean;
    new:boolean;
    tempNodeData: Array<go.ObjectData>,
    tempLinkDataArray: Array<go.ObjectData>;
}

class Simple extends React.Component<any, AppState> {

    private mapNodeKeyIdx: Map<go.Key, number>;
    private mapLinkKeyIdx: Map<go.Key, number>;

    constructor(props: object) {
        super(props);
        this.state = {
            nodeDataArray: [],
            linkDataArray: [

            ],
            modelData: {
                canRelink: true
            },
            selectedData: null,
            skipsDiagramUpdate: false,
            codeEditor: false,
            hideCanvas: false,

            tempNodeData: [],
            tempLinkDataArray: [],
            new:true,


            // paletteData: [{ key: 1, text: 'Alpha', source="" }]
        }
        this.mapNodeKeyIdx = new Map<go.Key, number>();
        this.mapLinkKeyIdx = new Map<go.Key, number>();
        this.refreshNodeIndex(this.state.nodeDataArray);
        // this.refreshNodeIndex1(this.state.paletteData);
    }

    componentDidMount() {
        // console.log(this.props.workspaceInitial)
        // this.setState({
        //     nodeDataArray: this.props.diagram.canvasState,
        //     tempNodeData: this.props.diagram.canvasState,
        //     linkDataArray: this.props.diagram.canvasConnections,
        //     tempLinkDataArray: this.props.diagram.canvasConnections
        // })
    }

    componentDidUpdate(prev: any) {
        // console.log(prev, this.props , "testing")
        // console.log(JSON.stringify(prev.diagram.canvasProperties).length , JSON.stringify(this.props.diagram.canvasProperties).length)

        // var differences = DeepDiff(prev.diagram.canvasProperties, this.props.diagram.canvasProperties);
        // console.log(differences, "diff")

        // if (prev.diagram && prev.diagram.canvasProperties && prev.diagram.canvasProperties.length > 0 && (JSON.stringify(prev.diagram.canvasProperties).length != JSON.stringify(this.props.diagram.canvasProperties).length)) {
        //     console.log("asdsadsa")

        //     if((this.state.tempNodeData && this.state.tempNodeData.length > 0) || (this.state.tempLinkDataArray && this.state.tempLinkDataArray.length > 0) || (this.props.diagram.canvasProperties && this.props.diagram.canvasProperties.length > 0)) {
        //         // this.props.saveState(this.state.tempNodeData, this.state.tempLinkDataArray, this.props.diagram.canvasProperties, true)
        //     }
            
        // }

        if((this.props.diagram.canvasState && this.props.diagram.canvasState.length > 0) &&  (prev.diagram.canvasState  != this.props.diagram.canvasState)){
            console.log("Asdsadsa")
            console.log(this.props.diagram.canvasState)
            this.setState({hideCanvas:true})
            this.setState({
                nodeDataArray: this.props.diagram.canvasState,
                tempNodeData: this.props.diagram.canvasState,
                linkDataArray: this.props.diagram.canvasConnections,
                tempLinkDataArray: this.props.diagram.canvasConnections,
            })
            this.setState({hideCanvas:false})
        }

    }

    refreshNodeIndex = (nodeArr: Array<go.ObjectData>) => {
        this.mapNodeKeyIdx.clear();
        nodeArr.forEach((n: go.ObjectData, idx: number) => {
            this.mapNodeKeyIdx.set(n.key, idx);
        });
    }


    handleDiagramEvent = (e: any) => {
        // console.log(e.data);
        const name = e.name;
        // console.log(name, "adsad");
        // console.log(e.subject, e.name, e.subject.first().lb);
        // switch (name) {
        //     case 'ChangedSelection': {
        //         const sel = e.subject.first();
        //         this.setState(
        //             produce((draft: AppState) => {
        //                 if (sel) {
        //                     if (sel instanceof go.Node) {
        //                         const idx = this.mapNodeKeyIdx.get(sel.key);
        //                         if (idx !== undefined && idx >= 0) {
        //                             const nd = draft.nodeDataArray[idx];
        //                             draft.selectedData = nd;
        //                         }
        //                     } else if (sel instanceof go.Link) {
        //                         const idx = this.mapLinkKeyIdx.get(sel.key);
        //                         if (idx !== undefined && idx >= 0) {
        //                             const ld = draft.linkDataArray[idx];
        //                             draft.selectedData = ld;
        //                         }
        //                     }
        //                 } else {
        //                     draft.selectedData = null;
        //                 }
        //             })
        //         );
        //         break;
        //     }
        //     default: break;
        // }
    }


    handleModelChange = (obj: any) => {
        // console.log(obj, "Amrit");
        let data = JSON.parse(obj)
        // console.log(data.nodeDataArray, data.linkDataArray, this.props.diagram.canvasProperties)
        this.props.handleNodeConnections(data.nodeDataArray, data.linkDataArray)
        this.setState({ tempNodeData: data.nodeDataArray, tempLinkDataArray: data.linkDataArray })
    }

    handleCodeEditor = () => {
        this.setState(
            produce((draft: AppState) => {
                draft.codeEditor = !draft.codeEditor;
            })
        )
    }

    updateDiagram = (e: any) => {
        // console.log(e);
        // let data = JSON.parse(e)
        // console.log(data.nodeDataArray, data.linkDataArray)
        // if(data.nodeDataArray.length > 0){
        //     this.setState({nodeDataArray:data.nodeDataArray})
        // }
        // if(data.linkDataArray.length > 0){
        //     this.setState({linkDataArray:data.linkDataArray})
        // }
    }

    onComponentClick = (e: any) => {
        // console.log(e.data);
        this.props.getRightBarContent(e)
    }

    handleVisibleCheckBox = (e: any, state: any, index: any) => {
        this.setState({
            hideCanvas: true
        })
        if (e.target.checked) {

            state = {
                ...state,
                visible: true
            }
        }
        else {
            state = {
                ...state,
                visible: false
            }
        }
        let _nodeDataArray = this.state.nodeDataArray;
        // _nodeDataArray[index] = state;
        // this.setState({ nodeDataArray: _nodeDataArray, tempNodeData: _nodeDataArray })
        // console.log(state, _nodeDataArray)

        this.setState({
            hideCanvas: false
        })
    }

    render() {
        // console.log(this.state)
        const { hideCanvas } = this.state;
        console.log(this.props.diagram)
        // console.log(this.state.nodeDataArray)
        return (
            <>

                <Diagram
                    nodeDataArray={this.state.nodeDataArray}
                    linkDataArray={this.state.linkDataArray}
                    modelData={this.state.modelData}
                    skipsDiagramUpdate={this.state.skipsDiagramUpdate}
                    onDiagramEvent={this.updateDiagram}
                    onComponentClick={this.onComponentClick}
                    onModelChange={this.handleModelChange}
                    handleCodeEditor={this.handleCodeEditor}
                    codeEditor={this.state.codeEditor}

                    allPalettes={this.props.allPalettes}
                    workspaceData={this.props.workspaceData}

                    saveCanvas={this.props.saveCanvas}
                    validateCanvas={this.props.validateCanvas}
                    planCanvas={this.props.planCanvas}
                    applyCanvas={this.props.applyCanvas}

                    handleSearch={this.props.handleSearch}
                    searchValue={this.props.searchValue}

                    handleVisibleCheckBox={this.handleVisibleCheckBox}
                    hideCanvas={hideCanvas}

                    canvasAllState={this.props.canvasAllState}
                    isLoading={this.props.apiCall.loading}

                    allStack={this.props.diagram.allStack}
                    selectedStack={this.props.diagram.selectedStack}
                />

                {
                    this.state.codeEditor
                        ?
                        <CodeEditor
                            overlay={this.state.codeEditor}
                            handleOverlay={this.handleCodeEditor}

                            folders={this.props.folders}
                            getCodeEditorData={this.props.getCodeEditorData}
                            code={this.props.code}
                        />
                        : null
                }
            </>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        diagram: state.Diagram,
        apiCall: state.APICall
    };
};


export default connect(mapStateToProps, {handleNodeConnections})(Simple);