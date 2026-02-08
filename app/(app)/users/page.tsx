import React, { Suspense } from "react";
import UsersList from "../../components/Users/usersList";
import Loading from "../../components/Loading/loading";

const UsersPage = async () => {
    return (
        <>
            <div className="space-y-6">
                {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"> */}
                <UsersList />
                {/* </div> */}
            </div>
        </>
    );
};

export default UsersPage;
