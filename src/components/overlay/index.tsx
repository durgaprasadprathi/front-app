import React, { Component } from 'react';
import './styles.css'
const styleLarge = { width: '90vw', paddingTop: 0, 'box-shadow': '#00000014 -8px -2px 13px 0px', marginTop: 48 }
const styleNormal = { width: '35vw', paddingTop: 0, 'box-shadow': '#00000014 -8px -2px 13px 0px', marginTop: 48 }


const Overlay = (props: any) => {

    return (
        <>

            <div id="mySidenav" style={props.overlay ? (props.isLarge ? styleLarge : styleNormal) : styleNormal} className="sidenav" >
                <div className="sidenav-section" style={props.isLarge ? {width:'100%'}: {}}>
                    <div className="row sideNav-row" >
                        <div className="col-md-9 pl-4">
                            <h5 className="modal-title">{props.title}</h5>
                        </div>
                        <div className="col-md-3">
                            <a href="javascript:void(0)" className="closebtn" onClick={props.handleOverLay}>&times;</a>
                        </div>
                    </div>
                    <div className="overlay-content">
                        {props.children}
                    </div>
                </div>
            </div>
        </>

    )
}

export default Overlay;