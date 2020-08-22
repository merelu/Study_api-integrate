import React from "react";
import { UsersProvider } from "./context/UsersContext";
import Users from "./context/Users";

function App() {
  return (
    <div>
      <UsersProvider>
        <Users />
      </UsersProvider>
    </div>
  );
}

export default App;
