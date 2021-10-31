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
    newData: boolean;
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
            newData: true,


            // paletteData: [{ key: 1, text: 'Alpha', source="" }]
        }
        this.mapNodeKeyIdx = new Map<go.Key, number>();
        this.mapLinkKeyIdx = new Map<go.Key, number>();
        this.refreshNodeIndex(this.state.nodeDataArray);
        // this.refreshNodeIndex1(this.state.paletteData);
    }

    componentWillMount() {

        // console.log("Amrit")
        if ((
            (this.props.diagram.firstCanvasState && this.props.diagram.firstCanvasState.length > 0) || (this.props.diagram.firstCanvasConnections && this.props.diagram.firstCanvasConnections.length > 0)
        ) && this.state.newData) {
            // console.log("Asdsadsa1235", this.state.new)
            // console.log(this.props.diagram.firstCanvasState)
            this.setState({ hideCanvas: true })
            this.setState({
                nodeDataArray: this.props.diagram.firstCanvasState,
                tempNodeData: this.props.diagram.firstCanvasState,
                linkDataArray: this.props.diagram.firstCanvasConnections,
                tempLinkDataArray: this.props.diagram.firstCanvasConnections,
            })
            this.setState({ hideCanvas: false })
        }
        else {
            // console.log(this.props.diagram)
            this.setState({ hideCanvas: true })
            this.setState({
                nodeDataArray: [],
                tempNodeData: [],
                linkDataArray: [],
                tempLinkDataArray: [],
            })
            this.setState({ hideCanvas: false })
        }


    }

    componentDidUpdate(prev: any) {
        // console.log("sadsadsa", this.props.diagram, this.state.newData)
        if ((
            (this.props.diagram.firstCanvasState && this.props.diagram.firstCanvasState.length > 0) || (this.props.diagram.firstCanvasConnections && this.props.diagram.firstCanvasConnections.length > 0)
        ) && this.state.newData) {
            // console.log("Asdsadsa1235", this.state.new)
            // console.log(this.props.diagram.firstCanvasState)
            this.setState({ hideCanvas: true })
            this.setState({
                newData: false,
                nodeDataArray: this.props.diagram.firstCanvasState,
                tempNodeData: this.props.diagram.firstCanvasState,
                linkDataArray: this.props.diagram.firstCanvasConnections,
                tempLinkDataArray: this.props.diagram.firstCanvasConnections,
            })
            this.setState({ hideCanvas: false })
        }

        if(prev.diagram.otherNameChange != this.props.diagram.otherNameChange){
            let { canvasState, rightBarProperty, canvasProperties, canvasConnections } = this.props.diagram;
            // console.log(canvasState[0].key, rightBarProperty.key)
            let canvasIndex:any = canvasState.findIndex((c:any) => c.key == rightBarProperty.key);
            let _properties:any = canvasProperties.filter((p:any) => p.key == rightBarProperty.key)
            console.log(canvasIndex, canvasProperties)
            let _canvasState:any = [
                ...canvasState,
            ]
            _canvasState[canvasIndex] = {
                ..._canvasState[canvasIndex],
                otherName:_properties[0].properties.name
            }

            console.log(_canvasState, rightBarProperty.properties)

            this.setState({ hideCanvas: true })
            this.setState({
                nodeDataArray:_canvasState,
                tempNodeData: _canvasState,
                linkDataArray: canvasConnections,
                tempLinkDataArray: canvasConnections,
                
            })
            this.setState({ hideCanvas: false })
        }

    }

    refreshNodeIndex = (nodeArr: Array<go.ObjectData>) => {
        // this.mapNodeKeyIdx.clear();
        // nodeArr.forEach((n: go.ObjectData, idx: number) => {
        //     this.mapNodeKeyIdx.set(n.key, idx);
        // });
    }


    handleDiagramEvent = (e: any) => {
        // console.log(e.data);
        const name = e.name;
    }


    handleModelChange = (obj: any) => {
        // console.log(obj, "Amrit");
        let data = JSON.parse(obj)
        // console.log(data)
        if (this.props.diagram.loadFinish && data.nodeDataArray.length > 0) {
            this.props.handleNodeConnections(data.nodeDataArray, data.linkDataArray)
            this.setState({ tempNodeData: data.nodeDataArray, tempLinkDataArray: data.linkDataArray })
        }


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
        // console.log(state, _nodeDataArray)

        this.setState({
            hideCanvas: false
        })
    }

    render() {
        // console.log(this.state)
        const { hideCanvas } = this.state;
        // console.log(this.props.diagram)
        // console.log(this.state)
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
                    isLoading={this.props.diagram.loading}

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


export default connect(mapStateToProps, { handleNodeConnections })(Simple);