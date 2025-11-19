import { useState, useEffect } from "react";
import { createUser, updateUser } from "../services/api";

const UserForm = ({ user, onSuccess }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    } else {
      setName("");
      setEmail("");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (user) {
        await updateUser(user.id, { name, email });
      } else {
        await createUser({ name, email });
      }

      onSuccess();
    } catch (error) {
      alert("Gagal menyimpan data user");
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">
          {user ? "Edit User" : "Tambah User"}
        </h5>

        <form onSubmit={handleSubmit}>
          
          <div className="mb-3">
            <label className="form-label">Nama</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-primary">Simpan</button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
