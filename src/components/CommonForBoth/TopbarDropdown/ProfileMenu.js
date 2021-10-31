import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import avatar2 from '../../../assets/images/users/user.png';
import "./styles.scss";

class ProfileMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: false,
        };
        this.toggle = this.toggle.bind(this);
    }


    toggle() {
        this.setState(prevState => ({
            menu: !prevState.menu
        }));
    }

    render() {

        let username = "Admin";

        return (
            <React.Fragment>
                <Dropdown isOpen={this.state.menu} toggle={this.toggle} className="d-inline-block user-dropdown">
                    <DropdownToggle tag="button" className="d-flex btn header-item waves-effect" id="page-header-user-dropdown">
                        <span className="d-none d-xl-inline-block ms-1 text-transform header-user-section" >
                            <div className="header-username">{username}</div>
                            <div className="header-companyName">{"Codebucket Solutions"}</div>
                        </span>
                        <img className="rounded-circle header-profile-user me-1" src={avatar2} alt="Header Avatar" />
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-end">
                        <DropdownItem href="#"><i className="ri-user-line align-middle me-1"></i>Profile</DropdownItem>
                        <DropdownItem href="/stack"><i className="ri-wallet-2-line align-middle me-1"></i>Stack</DropdownItem>
                        {/* <DropdownItem className="d-block" href="#"><span className="badge badge-success float-end mt-1">11</span><i className="ri-settings-2-line align-middle me-1"></i> {this.props.t('Settings')}</DropdownItem>
                        <DropdownItem href="#"><i className="ri-lock-unlock-line align-middle me-1"></i> {this.props.t('Lock screen')}</DropdownItem> */}
                        <DropdownItem divider />
                        <DropdownItem className="text-danger" href="/logout"><i className="ri-shut-down-line align-middle me-1 text-danger"></i>Logout</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </React.Fragment>
        );
    }
}

export default ProfileMenu;
