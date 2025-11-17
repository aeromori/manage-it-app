import React from "react";
import UserListTable from "./userListTable";

interface User {
    id: number;
    name: string;
}

const UsersList = async () => {
    const res = await fetch(
        "https://jsonplaceholder.typicode.com/users",
        { cache: "no-store" } //  always give fresh data
        // { next: { revalidate: 10 } }
    );

    const users: User[] = await res.json();

    return (
        <div>
            <UserListTable users={users} />
        </div>
    );
};

export default UsersList;
