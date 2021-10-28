import { useState, useEffect } from 'react';
import { Container } from "reactstrap";
import { useHistory } from "react-router-dom";

import Breadcrumbs from "../../components/Common/Breadcrumb";
import Stack from "../../components/sectionLayout/basicLayout";
import Overlay from "../../components/overlay";
import AddForm from "../../container/stack/addModal";
import ModalConfirm from "../../components/actionModal";
import SimpleButton from '../../components/UI/buttons/simpleButton';

import { getAPI } from "../../apiCalls/functions/index";
import { GET_ALL_USERS } from "../../apiCalls/urls/executionModule/users";
import { GET_ALL_WORKSPACE } from "../../apiCalls/urls/executionModule/workspace";

import { basicColumns } from "./tableColumns";

const StackSection = (props: any) => {

    const history = useHistory();

    const [breadcrumbItems, setBreadcrumbs] = useState([
        { title: "Stack", link: "#" },
        { title: "New", link: "#" },
    ])
    const [rows, setRows] = useState([])
    const [selectedItem, setSelectedItem] = useState(null)
    const [deleteModal, setDeleteModal] = useState(false)

    const [allUsers, setAllUsers] = useState([]);
    const [allWorkspace, setAllWorkspace] = useState([]);

    //useEffect
    useEffect(() => {
        getInitialsData();
        props.onLoad();
    }, [])

    useEffect(() => {
        updateData(props.stack.allData);
    }, [props.stack.allData])

    useEffect(() => {
        console.log(props.stack)
        props.onLoad();
    }, [props.stack.search, props.stack.pageNo])

    const getInitialsData = async () => {
        let users: any = await getAPI(GET_ALL_USERS)
        let workspace: any = await getAPI(GET_ALL_WORKSPACE)
        console.log(users, workspace)
        if (users && users.status) {
            setAllUsers(users.data)
        }
        if (workspace && workspace.status) {
            setAllWorkspace(workspace.data)
        }

    }

    const handleEditSelected = (item: any) => {
        setSelectedItem(item)
        props.updateOverlay(true)
    }

    const handleStack = (id: any) => {
        history.push('/canvas?stack_id=' + id)
    }

    const updateData = (allData: any) => {
        let _rows = new Array();
        allData && allData.map((a: any) => {
            _rows.push({
                id: a.stackId,
                name: a.terraformBackend.name,
                workspace: a?.workspace?.workspaceName,
                uname: a.owner?.userFirstName + " " + a.owner?.userLastName,

                action: <>
                    <SimpleButton
                        title="Go to canvas"
                        onClick={() => handleStack(a.stackId)}
                    />
                    {/* <button
                        className="simple-btn"
                        onClick={() => handleStack(a.stackId)}
                    >Go Workspace</button> */}
                    {/* <i
                        onClick={() => handleStack(a.stackId)}
                        className="ri-scan-2-fill table-icons"></i> */}
                    &nbsp;&nbsp;&nbsp;
                    <i

                        onClick={() => handleEditSelected(a)}
                        className="ri-pencil-fill table-icons"></i>

                </>
            })
        })
        setRows(_rows)
    }
    const handleAdd = () => {
        setSelectedItem(null);
        props.updateOverlay(!props.stack.overlay)
    }

    const fetchSelectedPage = (pageNo: any) => {
        props.updatePageNumber(pageNo)
    }

    //API Calls
    const addStack = async (data: any) => {
        props.addUpdateStack(data, null);
    }

    const editStack = async (data: any) => {
        props.addUpdateStack(data, selectedItem.stackId);
    }

    const deleteStack = async () => {
        setDeleteModal(!deleteModal);
        props.deleteStack()
    }

    return (
        <>

            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumbs title="Stack" breadcrumbItems={breadcrumbItems} />
                </Container>

                <Stack
                    basicColumns={basicColumns}
                    rows={rows}
                    handleOverlay={() => handleAdd()}
                    delete={() => setDeleteModal(!deleteModal)}
                    allData={props.stack.allData}
                    actionId="stackId"
                    selected={props.stack.selected}
                    setSelected={props.updateSelected}
                    total={props.stack.total}
                    pageNo={props.stack.pageNo}
                    fetchSelectedPage={fetchSelectedPage}
                    setSearch={(e: string) => props.updateSearch(e)}
                    section="STACK"
                />
                {
                    props.stack.overlay
                        ?
                        <Overlay
                            overlay={props.stack.overlay}
                            title={(selectedItem ? "Edit" : "Add") + " Stack"}
                            isLarge={false}
                            handleOverLay={() => props.updateOverlay(false)}
                        >
                            <AddForm
                                addStack={addStack}
                                editStack={editStack}
                                data={selectedItem}

                                allUsers={allUsers}
                                allWorkspace={allWorkspace}
                            />
                        </Overlay>
                        : null
                }
                {
                    deleteModal
                        ?
                        <ModalConfirm
                            modal={deleteModal}
                            toggle={() => setDeleteModal(!deleteModal)}
                            title="Delete Stack"
                            content="Do you want to delete this Stack?"
                            click={deleteStack}
                        />
                        : null
                }

            </div>
        </>
    )
}


export default StackSection;

