import { all } from 'redux-saga/effects'

//public
import loginSaga from './auth/login/saga';
import LayoutSaga from './layout/saga';
import { workspaceSaga } from '../pages/workspace/saga';
import { stackSaga } from '../pages/stack/saga';
import { diagramSaga } from '../pages/diagram/saga';
import { organizationSaga } from '../pages/organization/saga';
import { userSaga } from '../pages/users/saga';




export default function* rootSaga() {
    yield all([
        loginSaga(),
        LayoutSaga(),
        stackSaga(),
        diagramSaga(),
        workspaceSaga(),
        organizationSaga(),
        userSaga()
    ])
}