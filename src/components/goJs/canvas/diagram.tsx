import React, { useState, useEffect } from 'react';
import * as go from 'gojs';
import { ReactDiagram, ReactPalette } from 'gojs-react';
import Menu from "../../UI/menu";
import MenuItem from "../../UI/menuItems";
import { CustomLink } from "./link";
import WorkspaceInformation from "../../../components/diagram/workspaceInformation";
import LinkButton from "../../diagram/links"
import RightSideModalSection from "../../diagram/rightSidebarModal";


import "./styles.css";
import { filter } from 'lodash';


interface DiagramProps {
    nodeDataArray: Array<go.ObjectData>;
    linkDataArray: Array<go.ObjectData>;
    modelData: go.ObjectData;
    skipsDiagramUpdate: boolean;
    onDiagramEvent: (e: go.DiagramEvent) => void;
    onModelChange: (e: go.IncrementalData) => void;
}

let myDiagram: any;
class Diagram extends React.Component<any, any> {

    private diagramRef: React.RefObject<ReactDiagram>;
    private paletteRef: React.RefObject<ReactPalette>;


    constructor(props: DiagramProps) {
        super(props);
        this.state = {
            selectedMenu: "",
            listComponent: false,
            buttonAction: []
        }
        this.diagramRef = React.createRef();
        this.paletteRef = React.createRef();


        // this.loadDiagramProperties = this.loadDiagramProperties.bind(this);
        this.callDiagramFn = this.callDiagramFn.bind(this);
    }

    loadFn = (a: string) => {
        // console.log(a);
        // myDiagram.model = go.Model.fromJson(document.getElementById("mySavedModel").value);
        // this.loadDiagramProperties();  // do this after the Model.modelData has been brought into memory
    }

    public componentDidMount() {
        if (!this.diagramRef.current) return;
        const diagram = this.diagramRef.current.getDiagram();
        if (diagram instanceof go.Diagram) {
            // diagram.addDiagramListener('ChangedSelection', this.props.onDiagramEvent);

        }
    }

    public componentWillUnmount() {
        if (!this.diagramRef.current) return;
        const diagram = this.diagramRef.current.getDiagram();
        if (diagram instanceof go.Diagram) {
            // diagram.removeDiagramListener('ChangedSelection', this.props.onDiagramEvent);
            // diagram.addDiagramListener('ObjectDoubleClicked', this.props.onDiagramEvent);
        }
    }

    public callDiagramFn = (a: any) => {
        this.props.onComponentClick(a);
    }

    private initDiagram(callDiagramFn: any): go.Diagram {

        function loadFn(a: string) {
            // console.log(a);
            // myDiagram.model = go.Model.fromJson(document.getElementById("mySavedModel").value);
            loadDiagramProperties();  // do this after the Model.modelData has been brought into memory
        }


        function loadDiagramProperties() {
            // set Diagram.initialPosition, not Diagram.position, to handle initialization side-effects
            var pos = myDiagram.model.modelData.position;
            if (pos) myDiagram.initialPosition = go.Point.parse(pos);
        }

        const checkComponent = (e: any) => {

            //---delete VPC if it is greater than 1
            // let _myDiagram = JSON.parse(myDiagram.model.toJson())
            // let nodes = _myDiagram.nodeDataArray;
            // let filter = nodes.filter((m: any) => m.name === "VPC");
            // if (filter && filter.length > 1) {
            //     e.diagram.currentTool.doCancel();
            // }
        }

        var $ = go.GraphObject.make;
        myDiagram =
            $(go.Diagram,
                {
                    grid: $(go.Panel, "Grid",
                        $(go.Shape, "LineH", { stroke: "#e0e0e0", strokeWidth: 0.5 }),
                        $(go.Shape, "LineH", { stroke: "#adadad", strokeWidth: 0.5, interval: 30 }),
                        $(go.Shape, "LineV", { stroke: "#e0e0e0", strokeWidth: 0.5 }),
                        $(go.Shape, "LineV", { stroke: "#adadad", strokeWidth: 0.5, interval: 30 })
                    ),
                    mouseDrop: function (e: any) {
                        checkComponent(e);
                    },
                    doubleClick: function (e: any) {
                        // console.log(e)
                        return e;
                    },
                    "draggingTool.dragsLink": true,
                    "draggingTool.isGridSnapEnabled": true,
                    "linkingTool.isUnconnectedLinkValid": true,
                    "linkingTool.portGravity": 20,
                    "relinkingTool.isUnconnectedLinkValid": true,
                    "relinkingTool.portGravity": 20,
                    "relinkingTool.fromHandleArchetype":
                        $(go.Shape, "Diamond", { segmentIndex: 0, cursor: "pointer", desiredSize: new go.Size(8, 8), fill: "tomato", stroke: "darkred" }),
                    "relinkingTool.toHandleArchetype":
                        $(go.Shape, "Diamond", { segmentIndex: -1, cursor: "pointer", desiredSize: new go.Size(8, 8), fill: "darkred", stroke: "tomato" }),
                    "linkReshapingTool.handleArchetype":
                        $(go.Shape, "Diamond", { desiredSize: new go.Size(7, 7), fill: "lightblue", stroke: "deepskyblue" }),
                    "rotatingTool.handleAngle": 270,
                    "rotatingTool.handleDistance": 30,
                    "rotatingTool.snapAngleMultiple": 15,
                    "rotatingTool.snapAngleEpsilon": 15,
                    "undoManager.isEnabled": true,
                    // allow Ctrl-G to group selected nodes
                    "commandHandler.archetypeGroupData": { text: "Group", isGroup: true },
                    // have mouse wheel events zoom in and out instead of scroll up and down
                    "toolManager.mouseWheelBehavior": go.ToolManager.WheelZoom,
                });

        myDiagram.addDiagramListener("ObjectSingleClicked", function (e: any, node: any) {
            // console.log(e);
            callDiagramFn(e.subject.part.data)
        });

        myDiagram.addDiagramListener("ClipboardPasted", (e: any) => {

            e.subject.each((part: go.Part) => {
                if (part instanceof go.Node) {
                    e.diagram.model.startTransaction("Modify part position");
                    e.diagram.model.setDataProperty(part.data, "loc", go.Point.stringify(e.diagram.lastInput.documentPoint));
                    e.diagram.model.commitTransaction("Modify part position");
                }
            });

        });




        var portSize = new go.Size(8, 8);

        var sharedToolTipPort =
            $(go.Adornment, "Auto",
                $(go.Shape, "RoundedRectangle", { fill: "lightyellow" }),
                $(go.TextBlock, { margin: 2 },
                    new go.Binding("text", "", function (d) { return d.portTitle; })));

        myDiagram.nodeTemplate =
            $(go.Node, "Table",
                {
                    locationObjectName: "BODY",
                    locationSpot: go.Spot.Center,
                    selectionObjectName: "BODY",
                },
                new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
                new go.Binding("visible", "visible"),
                // the body
                $(go.Panel, "Position",
                    {
                        row: 1, column: 1, name: "BODY",
                        stretch: go.GraphObject.Fill,
                        height: 80
                    },
                    $(go.Shape, "Rectangle",
                        {
                            fill: "#dbf6cb", stroke: null, strokeWidth: 0,
                            minSize: new go.Size(100, 50)
                        }),
                    $(go.TextBlock,
                        {
                            textAlign: "center",
                            position: new go.Point(0, 20),
                            width: 100,
                            font: "bold 14px Segoe UI,sans-serif",

                            editable: true
                        },
                        new go.Binding("text", "name").makeTwoWay()),
                    $(go.TextBlock,
                        {
                            textAlign: "center",
                            position: new go.Point(0, 50),
                            width: 100,
                            font: "normal 12px Segoe UI,sans-serif",
                        },
                        new go.Binding("text", "otherName").makeTwoWay())
                ),  // end Auto Panel body

                // the Panel holding the left port elements, which are themselves Panels,
                // created for each item in the itemArray, bound to data.leftArray
                $(go.Panel, "Vertical",
                    new go.Binding("itemArray", "leftArray"),
                    {
                        row: 1, column: 0,
                        itemTemplate:
                            $(go.Panel,
                                {
                                    _side: "left",  // internal property to make it easier to tell which side it's on
                                    fromSpot: go.Spot.Left, toSpot: go.Spot.Left,
                                    fromLinkable: true, toLinkable: true, cursor: "pointer",

                                },
                                new go.Binding("portId", "portId"),
                                $(go.Shape, "Circle",
                                    {
                                        stroke: null, strokeWidth: 0,
                                        desiredSize: portSize,
                                        margin: new go.Margin(1, 0)
                                    },
                                    { toolTip: sharedToolTipPort },
                                    new go.Binding("fill", "portColor"))
                            ),  // end itemTemplate

                    }
                ),  // end Vertical Panel

                // the Panel holding the top port elements, which are themselves Panels,
                // created for each item in the itemArray, bound to data.topArray
                $(go.Panel, "Horizontal",
                    new go.Binding("itemArray", "topArray"),
                    {
                        row: 0, column: 1,
                        itemTemplate:
                            $(go.Panel,
                                {
                                    _side: "top",
                                    fromSpot: go.Spot.Top, toSpot: go.Spot.Top,
                                    fromLinkable: true, toLinkable: true, cursor: "pointer",

                                },
                                new go.Binding("portId", "portId"),
                                $(go.Shape, "Circle",
                                    {
                                        stroke: null, strokeWidth: 0,
                                        desiredSize: portSize,
                                        margin: new go.Margin(0, 1)
                                    },
                                    { toolTip: sharedToolTipPort },
                                    new go.Binding("fill", "portColor"))
                            )  // end itemTemplate
                    }
                ),  // end Horizontal Panel

                // the Panel holding the right port elements, which are themselves Panels,
                // created for each item in the itemArray, bound to data.rightArray
                $(go.Panel, "Vertical",
                    new go.Binding("itemArray", "rightArray"),
                    {
                        row: 1, column: 2,
                        itemTemplate:
                            $(go.Panel,
                                {
                                    _side: "right",
                                    fromSpot: go.Spot.Right, toSpot: go.Spot.Right,
                                    fromLinkable: true, toLinkable: true, cursor: "pointer",

                                },
                                new go.Binding("portId", "portId"),
                                $(go.Shape, "Circle",
                                    {
                                        stroke: null, strokeWidth: 0,
                                        desiredSize: portSize,
                                        margin: new go.Margin(1, 0)
                                    },
                                    { toolTip: sharedToolTipPort },
                                    new go.Binding("fill", "portColor"))
                            )  // end itemTemplate
                    }
                ),  // end Vertical Panel

                // the Panel holding the bottom port elements, which are themselves Panels,
                // created for each item in the itemArray, bound to data.bottomArray
                $(go.Panel, "Horizontal",
                    new go.Binding("itemArray", "bottomArray"),
                    {
                        row: 2, column: 1,
                        itemTemplate:
                            $(go.Panel,
                                {
                                    _side: "bottom",
                                    fromSpot: go.Spot.Bottom, toSpot: go.Spot.Bottom,
                                    fromLinkable: true, toLinkable: true, cursor: "pointer",

                                },
                                new go.Binding("portId", "portId"),
                                $(go.Shape, "Circle",
                                    {
                                        stroke: null, strokeWidth: 0,
                                        desiredSize: portSize,
                                        margin: new go.Margin(0, 1)
                                    },
                                    { toolTip: sharedToolTipPort },
                                    new go.Binding("fill", "portColor"))
                            )  // end itemTemplate
                    }
                )  // end Horizontal Panel
            );  // end Node


        myDiagram.model.isReadOnly = true;

        var linkSelectionAdornmentTemplate =
            $(go.Adornment, "Link",
                $(go.Shape,
                    // isPanelMain declares that this Shape shares the Link.geometry
                    { isPanelMain: true, fill: null, stroke: "deepskyblue", strokeWidth: 0 })  // use selection object's strokeWidth
            );

        myDiagram.linkTemplate =
            $(go.Link,  // the whole link panel
                { selectable: true, selectionAdornmentTemplate: linkSelectionAdornmentTemplate },
                { relinkableFrom: true, relinkableTo: true, reshapable: true },
                {
                    routing: go.Link.AvoidsNodes,
                    curve: go.Link.JumpOver,
                    corner: 5,
                    toShortLength: 4
                },
                new go.Binding("points").makeTwoWay(),
                $(go.Shape,  // the link path shape
                    { isPanelMain: true, strokeWidth: 2 }),
                $(go.Shape,  // the arrowhead
                    { toArrow: "Standard", stroke: null }),
                $(go.Panel, "Auto",
                    new go.Binding("visible", "isSelected").ofObject(),
                    $(go.Shape, "RoundedRectangle",  // the link shape
                        { fill: "#F8F8F8", stroke: null }),
                    $(go.TextBlock,
                        {
                            textAlign: "center",
                            font: "10pt helvetica, arial, sans-serif",
                            stroke: "#919191",
                            margin: 2,
                            minSize: new go.Size(10, NaN),
                            editable: true
                        },
                        new go.Binding("text").makeTwoWay())
                )
            );

        function highlightGroup(e: any, grp: any, show: any) {
            if (!grp) return;
            e.handled = true;
            if (show) {
                // cannot depend on the grp.diagram.selection in the case of external drag-and-drops;
                // instead depend on the DraggingTool.draggedParts or .copiedParts
                var tool = grp.diagram.toolManager.draggingTool;
                var map = tool.draggedParts || tool.copiedParts;  // this is a Map
                // now we can check to see if the Group will accept membership of the dragged Parts
                if (grp.canAddMembers(map.toKeySet())) {
                    grp.isHighlighted = true;
                    return;
                }
            }
            grp.isHighlighted = false;
        }

        function finishDrop(e: any, grp: any) {
            var ok = (grp !== null
                ? grp.addMembers(grp.diagram.selection, true)
                : e.diagram.commandHandler.addTopLevelParts(e.diagram.selection, true));
            if (!ok) e.diagram.currentTool.doCancel();
        }

        function makeLayout(horiz: any) {  // a Binding conversion function
            if (horiz) {
                return $(go.GridLayout,
                    {
                        wrappingWidth: Infinity, alignment: go.GridLayout.Position,
                        cellSize: new go.Size(1, 1), spacing: new go.Size(4, 4)
                    });
            } else {
                return $(go.GridLayout,
                    {
                        wrappingColumn: 1, alignment: go.GridLayout.Position,
                        cellSize: new go.Size(1, 1), spacing: new go.Size(4, 4)
                    });
            }
        }

        function defaultColor(horiz: any) {  // a Binding conversion function
            return horiz ? "#FFDD33" : "#33D3E5";
        }

        function defaultFont(horiz: any) {  // a Binding conversion function
            return horiz ? "bold 18px sans-serif" : "bold 16px sans-serif";
        }

        myDiagram.groupTemplate =
            $(go.Group, "Auto",
                {
                    background: "transparent",
                    ungroupable: true,
                    // highlight when dragging into the Group
                    mouseDragEnter: function (e, grp, prev) { highlightGroup(e, grp, true); },
                    mouseDragLeave: function (e, grp, next) { highlightGroup(e, grp, false); },
                    computesBoundsAfterDrag: true,
                    // when the selection is dropped into a Group, add the selected Parts into that Group;
                    // if it fails, cancel the tool, rolling back any changes
                    mouseDrop: finishDrop,
                    handlesDragDropForMembers: true,  // don't need to define handlers on member Nodes and Links
                    // Groups containing Groups lay out their members horizontally
                    layout: makeLayout(false)
                },
                new go.Binding("layout", "horiz", makeLayout),
                new go.Binding("background", "isHighlighted", function (h) {
                    return h ? "rgba(255,0,0,0.2)" : "transparent";
                }).ofObject(),
                $(go.Shape, "Rectangle",
                    { fill: null, stroke: defaultColor(false), strokeWidth: 2 },
                    new go.Binding("stroke", "horiz", defaultColor),
                    new go.Binding("stroke", "color")),
                $(go.Panel, "Vertical",  // title above Placeholder
                    $(go.Panel, "Horizontal",  // button next to TextBlock
                        { stretch: go.GraphObject.Horizontal, background: defaultColor(false) },
                        new go.Binding("background", "horiz", defaultColor),
                        new go.Binding("background", "color"),
                        $("SubGraphExpanderButton",
                            { alignment: go.Spot.Right, margin: 5 }),
                        $(go.TextBlock,
                            {
                                alignment: go.Spot.Left,
                                editable: true,
                                margin: 5,
                                font: defaultFont(false),
                                opacity: 0.75,  // allow some color to show through
                                stroke: "#404040"
                            },
                            new go.Binding("text", "name").makeTwoWay()),
                        new go.Binding("font", "horiz", defaultFont),
                    ),  // end Horizontal Panel
                    $(go.Placeholder,
                        { padding: 20, alignment: go.Spot.Right })
                )  // end Vertical Panel
            );
        myDiagram.model = new go.GraphLinksModel();
        myDiagram.model.linkKeyProperty = "key";
        myDiagram.model.linkFromPortIdProperty = "fromPort";
        myDiagram.model.linkToPortIdProperty = "toPort";
        myDiagram.animationManager.initialAnimationStyle = go.AnimationManager.None;


        let a = loadFn("a");

        return myDiagram;
    }

    private initPalette(): go.Palette {
        var $ = go.GraphObject.make;
        // console.log("sddsds")
        let myPalette =
            $(go.Palette,  // must name or refer to the DIV HTML element
                {
                    maxSelectionCount: 100000,
                    autoScale: go.Diagram.Uniform,
                    initialContentAlignment: go.Spot.TopLeft,
                    contentAlignment: go.Spot.TopLeft,
                    // groupTemplateMap: myDiagram.groupTemplateMap,
                    // share the templates used by myDiagram
                });
        // myPalette.initialContentAlignment = go.Spot.TopLeft;
        myPalette.nodeTemplate =
            $(go.Node, "Auto",
                {
                    alignment: go.Spot.TopLeft,
                },
                // $(go.Shape,
                //     { width: 14, height: 14, fill: "white" },
                //     new go.Binding("fill", "color")),
                $(go.Shape, { strokeWidth: 0, fill: "transparent" }),
                $(go.TextBlock,
                    { margin: 0, width: 180, font: "normal  400 13px Arial, Helvetica", textAlign: "left", editable: true, },
                    new go.Binding("text", "name"))
            );

        myPalette.groupTemplate =
            $(go.Group, "Auto",
                { alignment: go.Spot.TopLeft },

                // $(go.Shape,
                //     { width: 14, height: 14, fill: "white" },
                //     new go.Binding("fill", "color")),
                $(go.Shape, { strokeWidth: 0, fill: "transparent" }),
                $(go.TextBlock,
                    { margin: 0, width: 150, font: "normal  600 15px Arial, Helvetica", background: "transparent", textAlign: "start" },
                    new go.Binding("text", "name"))
            );
        // myPalette.model.nodeKeyProperty = myDiagram.model.nodeKeyProperty;
        myPalette.model = new go.GraphLinksModel([]);
        myPalette.model.nodeKeyProperty = "key1";
        myPalette.animationManager.initialAnimationStyle = go.AnimationManager.None;

        return myPalette;
    }

    handleSelectedMenu = (name: string) => {
        // console.log(this.state)
        this.setState({ selectedMenu: this.state.selectedMenu === name ? "" : name })
    }


    checkActionComplete = (action: string): boolean => {
        let item = ["Save", "Validate", "Plan", "Apply"];
        let index = item.indexOf(action);

        // console.log(this.props.canvasAllState.actionState)

        if (this.props.canvasAllState.actionState && this.props.canvasAllState.actionState.length > 0) {
            let _index: any = item.indexOf(this.props.canvasAllState.actionState[0].name);

            if (index > _index) {
                return false;
            }
            else {
                let actionData = this.props.canvasAllState.actionState.filter((a: any) => a.name === action)
                if (actionData && actionData.length > 0) {
                    return actionData[0].action;
                }
                else {
                    return false;
                }
                // console.log(index, _index, actionData[0].action)

            }
        }
        else
            return false;
    }

    checkLoading = (action: string): boolean => {

        let item = ["Save", "Validate", "Plan", "Apply"];
        let index = item.indexOf(action);
        let isLast = false;
        if (this.props.canvasAllState.actionState && this.props.canvasAllState.actionState.length > 0) {
            let _index = item.indexOf(this.props.canvasAllState.actionState[0].name);
            if (index === _index) {
                isLast = true;
            }
            else {
                isLast = false;
            }
        }
        else
            isLast = false;

        if (isLast && this.props.isLoading) {
            return true;
        }
        else
            return false;
    }

    render() {

        const { listComponent } = this.state;
        // console.log(this.props.isLoading)
        // console.log(this.props.canvasAllState.actionState)
        return (
            <>
                <div className="diagram-area">

                    <RightSideModalSection />

                    {
                        !this.props.hideCanvas
                            ?
                            <ReactDiagram
                                ref={this.diagramRef}
                                divClassName='new-canvas'
                                initDiagram={() => this.initDiagram(this.callDiagramFn)}
                                nodeDataArray={this.props.nodeDataArray}
                                linkDataArray={this.props.linkDataArray}
                                modelData={this.props.modelData}
                                onModelChange={() => this.props.onModelChange(myDiagram.model.toJson())}
                                skipsDiagramUpdate={this.props.skipsDiagramUpdate}
                            />
                            : null

                    }

                    <div className="palette-section">
                        <WorkspaceInformation
                            data={this.props.workspaceData}
                            allStack={this.props.allStack}
                            selectedStack={this.props.selectedStack}
                        />
                        <div className="palette-information">
                            <input
                                // onChange={this.handleSearch}
                                className="application-search"
                                // value={this.state.searchItem}
                                placeholder="Search"
                                value={this.props.searchValue}
                                onChange={(e) => this.props.handleSearch(e)}
                            />
                            {this.props.allPalettes && this.props.allPalettes.map((p: any, i: any) => {
                                return <>
                                    <Menu
                                        title={p.name}
                                        onClick={() => this.handleSelectedMenu(p.name)}
                                        active={this.state.selectedMenu === p.name ? true : false}
                                    />
                                    {
                                        this.state.selectedMenu === p.name
                                            ?
                                            <div className="each-palette-component">
                                                <ReactPalette
                                                    initPalette={this.initPalette}
                                                    divClassName='palette-component'
                                                    nodeDataArray={p.children}
                                                />
                                            </div>

                                            : null
                                    }

                                </>
                            })}
                        </div>

                        <div className="button-information">
                            <LinkButton
                                title="Code Editor"
                                onClick={() => this.props.handleCodeEditor()}
                                isComplete={() => { return false }}
                                icon="ri-code-line"
                                isLoading={false}
                            />
                            <LinkButton
                                title="Save"
                                onClick={() => this.props.saveCanvas()}
                                isComplete={() => this.checkActionComplete("Save")}
                                icon="ri-save-fill"
                                isLoading={this.checkLoading("Save")}
                            />
                            <LinkButton
                                title="Validate"
                                onClick={() => this.props.validateCanvas()}
                                isComplete={() => this.checkActionComplete("Validate")}
                                icon="ri-check-double-line"
                                isLoading={this.checkLoading("Validate")}
                            />
                            <LinkButton
                                title="Plan"
                                onClick={() => this.props.planCanvas()}
                                isComplete={() => this.checkActionComplete("Plan")}
                                icon="ri-calendar-check-fill"
                                isLoading={this.checkLoading("Plan")}
                            />
                            <LinkButton
                                title="Apply"
                                onClick={() => this.props.applyCanvas()}
                                isComplete={() => this.checkActionComplete("Apply")}
                                icon="ri-amazon-fill"
                                isLoading={this.checkLoading("Apply")}
                            />
                        </div>
                    </div>



                    <div className={this.state.listComponent ? "diagram-show-hide" : "diagram-show-hide list-hidden "}>
                        {
                            this.props.nodeDataArray && this.props.nodeDataArray.map((s: any, i: any) => (
                                <div className="" style={{ display: 'flex' }}>
                                    <input
                                        type="checkbox"
                                        checked={s.visible}
                                        className=""
                                        onClick={(e) => this.props.handleVisibleCheckBox(e, s, i)}

                                    />
                                    &nbsp;<label className="label">{s.name}</label>
                                </div>
                            ))
                        }
                        {
                            listComponent
                                ?
                                <span className="diagram-hide-button" onClick={() => { this.setState({ listComponent: false }) }}>
                                    <i className="ri-arrow-up-s-line"></i>
                                </span>
                                :
                                null
                        }

                    </div>
                    {
                        !listComponent
                            ?
                            <span className="diagram-show-button" onClick={() => { this.setState({ listComponent: true }) }}>
                                <i className="ri-arrow-down-s-line"></i>
                            </span>
                            : null

                    }
                </div>
            </>
        )
    }
}


export default Diagram;