
import { all, AllEffect, call, ForkEffect, spawn } from 'redux-saga/effects';
import classRoomSagas from './classRoom/sagas';
function* rootSaga(): Generator<AllEffect<ForkEffect<void>>> {
  const sagas = [classRoomSagas];

  yield all(
    sagas.map(saga =>
      spawn(function* () {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (e) {
            console.error(e);
          }
        }
      }),
    ),
  );
}

export default rootSaga;
