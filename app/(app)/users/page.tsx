import React, { Suspense } from "react";
import UsersList from "../../components/Users/usersList";
import Loading from "../../components/Loading/loading";

const UsersPage = async () => {
    return (
        <>
            <h1>Users</h1>
            <Suspense fallback={<Loading />}>
                <UsersList />
            </Suspense>
        </>
    );
};

export default UsersPage;
