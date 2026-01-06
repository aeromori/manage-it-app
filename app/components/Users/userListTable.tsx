"use client";
import React, { useEffect, useState } from "react";
import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from "flowbite-react";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/state/store";
import {
    fetchUserDetailAsync,
    fetchUsersAsync,
    resetState,
} from "@/app/state/slices/userSlice";

interface User {
    _id: string;
    name: string;
    birthdate?: Date;
    address?: string;
    featured?: boolean;
}

const UserListTable = () => {
    // global state
    const dispatch = useDispatch<AppDispatch>();
    const users = useSelector((state: RootState) => state.users.users);
    const loading = useSelector((state: RootState) => state.users.loading);
    const selectedUser = useSelector(
        (state: RootState) => state.users.selectedUser
    );
    const userLoading = useSelector(
        (state: RootState) => state.users.userLoading
    );

    //  component state
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        dispatch(fetchUsersAsync());

        return () => {
            dispatch(resetState());
        };
    }, []);

    const handleView = (user: User) => {
        dispatch(fetchUserDetailAsync({ id: user._id }));
        setOpenModal(true);
    };

    console.log("selectedUser", selectedUser);

    const modal = () => {
        return (
            <>
                <Modal show={openModal} onClose={() => setOpenModal(false)}>
                    <ModalHeader>User</ModalHeader>
                    <ModalBody>
                        {userLoading && (
                            <div className="p-4 text-center">Loading...</div>
                        )}

                        {!userLoading && selectedUser && (
                            <div className="flex-row">
                                <>
                                    <p>Name: {selectedUser?.name}</p>
                                    <p>
                                        Birth date:{" "}
                                        {dayjs(selectedUser.birthdate).format(
                                            "YYYY-MM-DD"
                                        )}
                                    </p>
                                    <p>
                                        Age:{" "}
                                        {dayjs().diff(
                                            dayjs(selectedUser.birthdate),
                                            "year"
                                        )}
                                    </p>
                                    <p>Address: {selectedUser.address}</p>
                                </>
                            </div>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => setOpenModal(false)}>
                            I accept
                        </Button>
                        <Button
                            color="alternative"
                            onClick={() => setOpenModal(false)}
                        >
                            Decline
                        </Button>
                    </ModalFooter>
                </Modal>
            </>
        );
    };

    return (
        <>
            {modal()}
            <div className="w-300">
                <table className="table-auto border-collapse w-full">
                    <thead className="bg-gray-500 border-0">
                        <tr>
                            <th className="w-0.8">Name</th>
                            <th className="w-0.2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading && (
                            <tr>
                                <td colSpan={2} className="p-2 text-center">
                                    Loading...
                                </td>
                            </tr>
                        )}
                        {!loading &&
                            users.length > 0 &&
                            users.map((user, i) => (
                                <tr
                                    className={
                                        i % 2 === 0
                                            ? "bg-gray-200"
                                            : "bg-gray-300"
                                    }
                                    key={user._id}
                                >
                                    <td className="p-2">{user.name}</td>
                                    <td className="flex justify-center items-center gap-2 p-2">
                                        <button
                                            className="p-2 bg-sky-300 rounded-md hover:bg-sky-600 transition-colors"
                                            onClick={() => {
                                                handleView(user);
                                            }}
                                        >
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
            </div>
        </>
    );
};

export default UserListTable;
