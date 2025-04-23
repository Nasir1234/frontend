import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState("");

  const { token } = useSelector((state) => state.auth);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("http://localhost:5000/api/auth/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(data);
    } catch (err) {
      setFeedback("Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/auth/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFeedback("User deleted successfully.");
      fetchUsers(); // refresh
    } catch (err) {
      setFeedback(err.response?.data?.message || "Error deleting user.");
    }
  };

  const handleUpdateRole = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/auth/users/${editUser._id}`,
        {
          name: editUser.name,
          email: editUser.email,
          isAdmin: editUser.isAdmin,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setFeedback("User updated successfully.");
      setEditUser(null);
      fetchUsers();
    } catch (err) {
      setFeedback(err.response?.data?.message || "Error updating user.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4 text-indigo-700">
        User Management
      </h2>

      {feedback && <p className="text-sm text-red-500 mb-2">{feedback}</p>}
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Admin</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-b hover:bg-gray-100">
                  <td className="py-2 px-4">{u.name}</td>
                  <td className="py-2 px-4">{u.email}</td>
                  <td className="py-2 px-4">
                    {u.isAdmin ? (
                      <span className="text-green-600 font-semibold">Yes</span>
                    ) : (
                      <span className="text-gray-600">No</span>
                    )}
                  </td>
                  <td className="py-2 px-4 flex gap-3">
                    <button
                      onClick={() => setEditUser(u)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit />
                    </button>
                    {!u.isAdmin && (
                      <button
                        onClick={() => handleDelete(u._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editUser && (
        <div className="mt-6 bg-gray-50 p-4 rounded shadow-md">
          <h3 className="text-lg font-semibold mb-2">Edit User Role</h3>
          <label className="block mb-2">
            <input
              type="checkbox"
              checked={editUser.isAdmin}
              onChange={(e) =>
                setEditUser({ ...editUser, isAdmin: e.target.checked })
              }
            />
            <span className="ml-2">Make Admin</span>
          </label>
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleUpdateRole}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Update
            </button>
            <button
              onClick={() => setEditUser(null)}
              className="text-gray-600 hover:underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
