import React from "react";
import axios from "axios";
import { useAsync } from "react-async";

//useAsync를 사용할 때에는 프로미스를 반환하는 함수의 파라미터를 객체형태로 해주어야 한다.
async function getUser({ id }) {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );

  return response.data;
}

function UserReactAsync({ id }) {
  const { data: user, error, isloading } = useAsync({
    promiseFn: getUser,
    id,
    watch: id,
  });

  if (isloading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다.</div>;
  if (!user) return null;

  return (
    <div>
      <h2>{user.username}</h2>
      <p>
        <b>Email:</b> {user.email}
      </p>
    </div>
  );
}

export default UserReactAsync;
