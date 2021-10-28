import React, { Component, Suspense } from "react";
import { Switch } from "react-router-dom";
import { connect } from "react-redux";

// Import Routes
import { authProtectedRoutes, publicRoutes } from "./routes";
import AppRoute from "./routes/route";

// layouts
import AuthLayout from "./components/VerticalLayout";
import NonAuthLayout from "./components/NonAuthLayout";
import Notification from "./components/notification/index";
import Loader from "./components/spinner/index";

// Import scss
import "./assets/scss/theme.scss";
import "./app.css";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		
		return (
			<React.Fragment>
				{
					this.props.apiCall.message ? <Notification body={this.props.apiCall.message} type={"success"} /> : null
				}
				{
					this.props.apiCall.error ? <Notification body={this.props.apiCall.error} type={"error"} /> : null
				}
				{
					this.props.apiCall.loading ? <Loader active={this.props.apiCall.loading} /> : null
				}
				{
					localStorage.getItem("authUser")
						?
						<AuthLayout>
							<Suspense fallback={<p>Loading....</p>}>
								<Switch>
									{authProtectedRoutes.map((route, idx) => (
										<AppRoute
											path={route.path}
											component={route.component}
											key={idx}
											isAuthProtected={true}
										/>
									))}
								</Switch>
							</Suspense>
						</AuthLayout>
						:
						<NonAuthLayout>
							<Suspense fallback={<p>Loading....</p>}>
								<Switch>
									{publicRoutes.map((route, idx) => (
										<AppRoute
											path={route.path}
											component={route.component}
											key={idx}
											isAuthProtected={false}
										/>
									))}
								</Switch>
							</Suspense>
						</NonAuthLayout>
				}
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		layout: state.Layout,
		apiCall: state.APICall
	};
};


export default connect(mapStateToProps, null)(App);
