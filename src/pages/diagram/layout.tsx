import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import queryString from 'query-string';

// import DiagramSection from '../../container/diagram/canvas';
import "./styles.scss";
import DiagramSection from "../../container/gojs";
import { connect } from "react-redux";

import { apiLoading, apiLoadingEnd, apiMessage, apiErrorMessage } from '../../store/actions';

const Diagram = (props: any) => {

    const location = useLocation();
    const [workspace, setWorkspace] =useState<any>(0);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {

        let searchParameter = queryString.parse(location.search);
        // console.log(searchParameter)
        if (searchParameter && searchParameter.stack_id) {
            let stack_id = (searchParameter.stack_id);
            // console.log(stack_id)
            props.selectSingleStack({
                stackId: searchParameter.stack_id
            })
            setWorkspace(stack_id)
            props.onLoad(stack_id)
        }
        // else if (searchParameter && searchParameter.workspace_id) {
        //     let workspace_id = searchParameter.workspace_id;
        //     // console.log(workspace_id)
        //     props.getAllStack(workspace_id)
        // }
    }, [])

    // useEffect(() => {
    //     if (props.diagram.selectedStack && Object.keys(props.diagram.selectedStack).length > 0) {
    //         let stackId = props.diagram.selectedStack.stackId;
    //         setWorkspace(stackId);
    //         props.onLoad(stackId)
    //     }
    // }, [props.diagram.selectedStack])




    const objectToArray = (array: any) => {
        let _obj: any = {};
        array && array.forEach((a: any) => {
            _obj = {
                ..._obj,
                [a.name]: ''
            }
        })

        return _obj;
    }

    const getRightBarContent = (data: any) => {
        // console.log(data)
        // console.log(props.diagram)
        let filter = props.diagram.canvasProperties.filter((c: any) => c.key === data.key);
        // console.log(filter, props.diagram.canvasProperties)
        if (filter.length > 0) {
            props.updateCanvasRightBar(filter[0])
        }
        else {
            // console.log(allProperties)
            let filterProp = props.diagram.allProperties.filter((c: any) => c.name === data.name);
            // console.log(filterProp)
            if (filterProp && filterProp[0]) {
                props.updateCanvasRightBar({
                    key: data.key,
                    name: filterProp[0].name,
                    properties: objectToArray(filterProp[0].properties)
                })
            }
        }
    }

    //canvas action
    const saveCanvas = async () => {
        // console.log(workspace)
        props.onSave(workspace)
    }

    const validateCanvas = async () => {
        props.afterSaveFunction(workspace, "Validate")
    }

    const planCanvas = async () => {
        props.afterSaveFunction(workspace, "Plan")
    }

    const applyCanvas = async () => {
        props.afterSaveFunction(workspace, "Apply")
    }

    const getFileData = async (path:string) => {
        props.getFileData(path, workspace)
    }

    //search
    const handleSearch = (e: any) => {
        let search = e.target.value;
        let selectedPalette: any = [];
        setSearchValue(search)
        // console.log(search, allPalettes);
        props.diagram.allPalettes.map((a: any) => {
            let _singleSection: any = []
            a.children && a.children.forEach((c: any) => {
                if (c.name.toUpperCase().includes(search.toUpperCase())) {
                    _singleSection.push(c);
                }
            })
            if (_singleSection.length > 0) {
                selectedPalette.push({
                    children: _singleSection,
                    name: a.name,
                })
            }
        })
        props.updateSelectedData(selectedPalette)
        // console.log(selectedPalette)
    }

    console.log(props.diagram.loadFinish)
    return (
        <>
            {
                props.diagram.allFilteredPalettes && props.diagram.loadFinish
                    ?
                    <div className="page-content diagram-page">
                        <DiagramSection
                            allPalettes={props.diagram.allFilteredPalettes}
                            allProperties={props.diagram.allProperties}

                            getRightBarContent={getRightBarContent}

                            folders={props.diagram.allFolders}
                            getCodeEditorData={getFileData}
                            code={props.diagram.fileData}

                            workspaceData={{}}

                            saveCanvas={saveCanvas}
                            validateCanvas={validateCanvas}
                            planCanvas={planCanvas}
                            applyCanvas={applyCanvas}

                            handleSearch={handleSearch}
                            searchValue={searchValue}

                            canvasAllState={props.diagram}
                        />
                    </div>
                    : null

            }

        </>

    )
}

const mapStateToProps = (state: any) => {
    return {
        diagram: state.Diagram,
    };
};

const mapDispatchToProps = { apiLoading, apiLoadingEnd, apiMessage, apiErrorMessage }

export default connect(mapStateToProps, mapDispatchToProps)(Diagram);
