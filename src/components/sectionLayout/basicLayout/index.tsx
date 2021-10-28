import { useState, useEffect } from 'react';
import Layout from "../../../components/pageLayout"
import TableWithCheckbox from "../../../components/tableWithCheckbox";
import ActionButton from '../../../components/UI/actionButton';
// import { checkRoles } from '.././../../shared/checkRoles';
const BasicLayout = (props: any) => {

    let [columns, setColumns] = useState([]);
    const [rows, setRows] = useState([])
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        let roles: any = localStorage.getItem("authUser");
        if (roles) {
            roles = JSON.parse(roles);
            // console.log(roles);
            setRoles(roles?.data?.permissions);
        }
    }, [])

    // console.log(roles);

    useEffect(() => {
        updateData();
        generateColumns();
    }, [props.rows])

    useEffect(() => {
        generateColumns();
        updateData();
    }, [props.selected])

    const generateColumns = () => {
        let _select = {
            label: <input
                type="checkbox"
                checked={checkSelectAll()}
                onChange={(e) => updateSelectAll(e)}
            />,
            field: 'select',
            sort: 'disabled',
            width: 150,
        }
        setColumns([_select, ...props.basicColumns])
    }

    const checkSelectAll = () => {
        // console.log(props.allData.length, selected.size)

        if (props.allData && props.allData.length === props.selected.size && props.allData.length > 0) {
            return true;
        }
        else {
            return false;
        }

    }

    const updateSelectAll = (e: any) => {
        // console.log(e.target.checked, "asdsad", props.actionId)
        if (e.target.checked) {
            let _selected = new Set<string>();
            props.allData.map((a: any) => {
                _selected.add(a[props.actionId])
            })
            // console.log(_selected, props.allData)
            props.setSelected(_selected)
        }
        else {
            props.setSelected(new Set<string>())
        }
    }

    const updateSelectedSelected = (e: any, id: any) => {
        var _selected:any = new Set(props.selected)
        if (e.target.checked) {
            _selected.add(id)
        }
        else {
            _selected.delete(id)
        }
        props.setSelected(_selected)

    }

    const updateData = () => {
        let _rows = new Array();
        // console.log("asdsadsa")
        props.rows && props.rows.map((a: any) => {
            // console.log(a)
            _rows.push({
                select: <input
                    type="checkbox"
                    checked={props.selected.has(a.id) ? true : false}
                    onChange={(e) => updateSelectedSelected(e, a.id)}

                />,
                ...a
            })
        })

        // console.log(_rows)
        setRows(_rows)
    }

    const checkRolesSection = (permission: string) => {
        // return checkRoles(permission, ro)
        let filter = roles.filter((r: any) => r.permissionName === permission + "_" + props.section)
        if (filter && filter.length > 0) {
            return true;
        }
        else
            return false;
    }

    return (
        <>
            {
                checkRolesSection("CREATE")
                    ?
                    <ActionButton
                        onClick={props.handleOverlay}
                        title={"Add"}
                        icon={"ri-add-line"}
                        fill={true}

                    />
                    : null
            }
            {
                checkRolesSection("DELETE")
                    ?
                    <ActionButton
                        onClick={props.delete}
                        title={"Delete"}
                        icon={"ri-delete-bin-line"}
                        color={"red"}
                    />
                    : null
            }
            {
                checkRolesSection("IMPORT")
                    ?
                    <ActionButton
                        onClick={() => { }}
                        title={"Import"}
                        icon={"ri-upload-2-line"}
                    />
                    : null
            }
            {
                checkRolesSection("EXPORT")
                    ?
                    <ActionButton
                        onClick={() => { }}
                        title={"Export"}
                        icon={"ri-download-2-line"}
                    />
                    : null
            }


            <Layout
                title=""
            >
                <TableWithCheckbox
                    columns={columns}
                    pageNumber={props.pageNo}
                    totalSize={props.total}
                    rows={rows}
                    handleSearch={props.setSearch}
                    fetchSelectedPage={props.fetchSelectedPage}
                    updateSort={props.updateSort}
                />
            </Layout>
        </>
    )
}

export default BasicLayout;