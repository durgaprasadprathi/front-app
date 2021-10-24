import { all } from 'redux-saga/effects'

//public
import loginSaga from './auth/login/saga';
import LayoutSaga from './layout/saga';
import { stackSaga } from '../pages/stack/saga';
import { diagramSaga } from '../pages/diagram/saga';




export default function* rootSaga() {
    yield all([
        loginSaga(),
        LayoutSaga(),
        stackSaga(),
        diagramSaga(),
    ])
}