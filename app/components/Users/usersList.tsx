import UserListTable from "./userListTable";

interface User {
    id: number;
    name: string;
}

const UsersList = () => {
    return (
        <>
            <UserListTable />
        </>
    );
};

export default UsersList;
