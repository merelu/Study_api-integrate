import React, { useState } from "react";
import axios from "axios";
import UserReactAsync from "./UserReactAsync";
import { useAsync } from "react-async";

async function getUsers() {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  return response.data;
}

function UsersReactAsync() {
  const [userId, setUserId] = useState(null);
  //만약 우리가 렌더링하는 시점이 아닌 사용자의 특정 인터렉션에 따라 API를 호출하고 싶을 땐 promiseFn대신 deferFn을 사용하고,
  //reload대신 run함수를 사용한다.
  //https://docs.react-async.com/api/options
  const { data: users, error, isLoading, reload } = useAsync({
    promiseFn: getUsers,
  });

  if (isLoading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!users) return <button onClick={reload}>불러오기</button>;
  return (
    <>
      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            onClick={() => setUserId(user.id)}
            style={{ cursor: "pointer" }}
          >
            {user.username} ({user.name})
          </li>
        ))}
      </ul>
      <button onClick={reload}>다시 불러오기</button>
      {userId && <UserReactAsync id={userId} />}
    </>
  );
}

export default UsersReactAsync;
