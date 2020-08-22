//리펙토링파일
//이 함수는 파라미터로 액션의 타입 (예: GET_USER)와 Promise를 만들어주는 함수를 받아옵니다.
export default function createAsyncDispatcher(type, promiseFn) {
  //성공, 실패에 대한 액션 타입 문자열을 준비한다.
  const SUCCESS = `${type}_SUCCESS`;
  const ERROR = `${type}_ERROR`;

  //새로운 함수를 만든다.
  //...rest를 사용하여 나머지 파라미터를 rest배열에 담는다.
  //ES6에서는 rest파라미터를 이용하여 갯수가 확정되지 않은 가변인자에 대응할 수 있다
  //매개변수의 마지막 위치에만 사용할 수 있다. setter에 사용 불가
  async function actionHandler(dispatch, ...rest) {
    dispatch({ type });
    try {
      const data = await promiseFn(...rest); //rest 배열을 spread로 넣어준다.
      dispatch({
        type: SUCCESS,
        data,
      }); //성공
    } catch (e) {
      dispatch({
        type: ERROR,
        error: e,
      }); //실패
    }
  }

  return actionHandler; //만든 함수를 반환한다.
}

export const initialAsyncState = {
  loading: false,
  data: null,
  error: null,
};

//로딩중일 때 바뀔 상태 객체
const loadingState = {
  loading: true,
  data: null,
  error: null,
};

//성공했을 때의 상태 만들어주는 함수
const success = (data) => ({
  loading: false,
  data: data,
  error: null,
});

//실패했을 때의 상태 만들어주는 함수
const error = (error) => ({
  loading: false,
  data: null,
  error: error,
});

//세가지 액션을 처리하는 리듀서를 만들어준다.
//type은 액션 타입, key는 리듀서서 사용할 필드 이름이다.(예: user,users)

export function createAsyncHandler(type, key) {
  //성공, 실패에 대한 액션 타입 문자열을 준비한다.
  const SUCCESS = `${type}_SUCCESS`;
  const ERROR = `${type}_ERROR`;

  function handler(state, action) {
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: loadingState,
        };
      case SUCCESS:
        return {
          ...state,
          [key]: success(action.data),
        };
      case ERROR:
        return { ...state, [key]: error(action.error) };
      default:
        return state;
    }
  }

  return handler;
}
