import { useEffect, useState } from "react";
import toast  from "react-hot-toast";

import {
    getUsers,
    updateUser,
    updateUserStatus,
    deleteUser,
} from "../../services/adminUserService";

import UserFilters from "../../components/admin/users/UserFilters";
import UserTable from "../../components/admin/users/UserTable";
import Pagination from "../../components/admin/users/Pagination";
import UserDetailsModal from "../../components/admin/users/UserDetailsModal";
import UserEditModal from "../../components/admin/users/UserEditModal";
import UserDeleteModal from "../../components/admin/users/UserDeleteModal";

const UserManagement = () => {

    const [users, setUsers] = useState([]);
    const [pagination, setPagination] = useState({});
    const [loading, setLoading] = useState(false);

    const [filters, setFilters] = useState({
        search: "",
        role: "",
        status: "",
        page: 1,
        limit: 10,
    });

    const [selectedUser, setSelectedUser] = useState(null);

    const [showDetails, setShowDetails] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    /* ======================================================
                        Load Users
    ====================================================== */

    const fetchUsers = async () => {

        try {

            setLoading(true);

            const data = await getUsers(filters);

            setUsers(data.users);
            setPagination(data.pagination);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to load users."
            );

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        fetchUsers();
    }, [filters]);

    /* ======================================================
                        View
    ====================================================== */

    const handleView = (user) => {
        setSelectedUser(user);
        setShowDetails(true);
    };

    /* ======================================================
                        Edit
    ====================================================== */

    const handleEdit = (user) => {
        setSelectedUser(user);
        setShowEdit(true);
    };

    const handleUpdate = async (id, data) => {

        try {

            const response = await updateUser(id, data);

            toast.success(response.message);

            setShowEdit(false);

            fetchUsers();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to update user."
            );

        }
    };

    /* ======================================================
                    Block / Unblock
    ====================================================== */

    const handleStatusChange = async (
        user,
        status
    ) => {

        try {

            const response =
                await updateUserStatus(
                    user._id,
                    status
                );

            toast.success(response.message);

            fetchUsers();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to update status."
            );

        }
    };

    /* ======================================================
                        Delete
    ====================================================== */

    const handleDelete = (user) => {
        setSelectedUser(user);
        setShowDelete(true);
    };

    const handleConfirmDelete = async (id) => {

        try {

            const response =
                await deleteUser(id);

            toast.success(response.message);

            setShowDelete(false);

            fetchUsers();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to delete user."
            );

        }
    };

    return (

        <div className="space-y-6">

            <UserFilters
                filters={filters}
                setFilters={setFilters}
            />

            <UserTable
                users={users}
                loading={loading}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
            />

            <Pagination
                pagination={pagination}
                onPageChange={(page) =>
                    setFilters((prev) => ({
                        ...prev,
                        page,
                    }))
                }
            />

            <UserDetailsModal
                user={selectedUser}
                isOpen={showDetails}
                onClose={() =>
                    setShowDetails(false)
                }
            />

            <UserEditModal
                user={selectedUser}
                isOpen={showEdit}
                onClose={() =>
                    setShowEdit(false)
                }
                onSave={handleUpdate}
            />

            <UserDeleteModal
                user={selectedUser}
                isOpen={showDelete}
                onClose={() =>
                    setShowDelete(false)
                }
                onConfirm={handleConfirmDelete}
            />

        </div>

    );
};

export default UserManagement;