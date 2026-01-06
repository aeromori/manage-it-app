import UserListTable from "./userListTable";

interface User {
    id: number;
    name: string;
}

const UsersList = () => {
    return (
        <div>
            <UserListTable />
        </div>
    );
};

export default UsersList;
