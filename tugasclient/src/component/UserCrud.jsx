import { useState, useEffect } from "react";
import { getUsers, deleteUser } from "../services/api";
import UserForm from "./UserForm";

const UserCrud = () => {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    fetchUsers();
  }, [refresh]);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Hapus user ini?")) {
      try {
        await deleteUser(id);
        setRefresh(prev => prev + 1);
      } catch {
        alert("Gagal menghapus user");
      }
    }
  };

  const handleSuccess = () => {
    setSelected(null);
    setRefresh(prev => prev + 1);
  };

  return (
    <div>
      {/* === FORM TAMBAH / EDIT USER === */}
      <UserForm 
        user={selected}
        onSuccess={handleSuccess}
      />

      {/* === TABEL USER === */}
      <div className="table-responsive mt-4">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nama</th>
              <th>Email</th>
              <th>Jumlah Post</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.TablePosts?.length || 0}</td>

                <td>
                  <button 
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => setSelected(user)}
                  >
                    Edit
                  </button>

                  <button 
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(user.id)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default UserCrud;
