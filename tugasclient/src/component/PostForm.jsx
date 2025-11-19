import { useState, useEffect } from "react";
import { createPost, updatePost, getUsers } from "../services/api";

const PostForm = ({ post, onSuccess }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");

  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();

    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setUserId(post.userId);
    } else {
      setTitle("");
      setContent("");
      setUserId("");
    }
  }, [post]);

  const loadUsers = async () => {
    const res = await getUsers();
    setUsers(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (post) {
        await updatePost(post.id, { title, content, userId });
      } else {
        await createPost({ title, content, userId });
      }
      onSuccess();
    } catch (error) {
      alert("Gagal menyimpan data");
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">
          {post ? "Edit Post" : "Tambah Post"}
        </h5>

        <form onSubmit={handleSubmit}>
          
          <div className="mb-3">
            <label className="form-label">Judul</label>
            <input 
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Konten</label>
            <textarea
              className="form-control"
              rows="4"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">User</label>
            <select 
              className="form-control"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            >
              <option value="">-- Pilih User --</option>
              {users.map(u => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>

          <button className="btn btn-primary">Simpan</button>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
