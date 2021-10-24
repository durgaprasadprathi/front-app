import React, { lazy } from "react";
import { Redirect } from "react-router-dom";

// Authentication related pages
//Organization
// import AwsKeys from "../pages/awsKeys";
// import Diagram  from "../pages/diagram";
// import Diagram  from "../container/gojs/index";
// import Diagram  from "../container/gojs";


//Workspace
const Organization = lazy(() => {
    return import('../pages/organization');
});
const Users = lazy(() => {
    return import('../pages/users');
});
const Workspace = lazy(() => {
    return import('../pages/workspace');
});
const Stack = lazy(() => {
    return import('../pages/stack');
});
const Diagram = lazy(() => {
    return import('../pages/diagram');
});

//Administration
const Roles = lazy(() => {
    return import('../pages/roles');
});


//Basic
const Login = lazy(() => {
    return import('../pages/Authentication/Login');
});
const Logout = lazy(() => {
    return import('../pages/Authentication/Logout');
});


const authProtectedRoutes = [


	//Workspace
	{ path: "/organization", component: Organization },
	{ path: "/users", component: Users },
	{ path: "/workspace", component: Workspace },
	{ path: "/stack", component: Stack },
	{ path: "/canvas", component:Diagram},
	// { path: "/keys", component: AwsKeys },

	//Administration
	{ path: "/roles", component: Roles },

	//Basic
	{ path: "/logout", component: Logout },
	{ path: "/", exact: true, component: () => <Redirect to="/organization" /> }
];

const publicRoutes = [
	
	{ path: "/login", component: Login },
	{ path: "/", exact: true, component: () => <Redirect to="/login" /> }
];

export { authProtectedRoutes, publicRoutes };
