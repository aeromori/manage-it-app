"use client";
import React from "react";

interface User {
    id: number;
    name: string;
}

interface UsersListProps {
    users: User[];
}

const UserListTable = ({ users }: UsersListProps) => {
    return (
        <div className="w-300">
            <p>{new Date().toLocaleTimeString()}</p>
            <table className="table-auto border-collapse w-full">
                <thead className="bg-gray-500 border-0">
                    <tr>
                        <th className="w-0.8">Name</th>
                        <th className="w-0.2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length &&
                        users.map((user, i) => (
                            <tr
                                className={
                                    i % 2 === 0 ? "bg-gray-200" : "bg-gray-300"
                                }
                                key={user.id}
                            >
                                <td className="p-2">{user.name}</td>
                                <td className="flex justify-center items-center gap-2 p-2">
                                    <button className="p-2 bg-sky-300 rounded-md hover:bg-sky-600 transition-colors">
                                        View
                                    </button>
                                    <button className="p-2 bg-sky-300 rounded-md hover:bg-sky-600 transition-colors">
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
            {/* <ul>
                {users.length &&
                    users.map((user, i) => (
                        <li key={user.id}>{`${i + 1}. ${user.name}`}</li>
                    ))}
            </ul> */}
        </div>
    );
};

export default UserListTable;
