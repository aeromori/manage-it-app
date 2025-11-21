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

    const personalRes: any = await fetch("http://localhost:3001/users/", {
        cache: "no-store",
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            return data;
        });

    console.log({ personalRes });
    // const res2 = await personalRes.json();

    return (
        <div>
            <UserListTable users={users} personalRes={personalRes} />
        </div>
    );
};

export default UsersList;
