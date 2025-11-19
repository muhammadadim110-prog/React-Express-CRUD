import { useState, useEffect } from "react";
import { getPosts, deletePost } from "../services/api";
import PostForm from "./PostForm";

const PostCrud = () => {
  const [posts, setPosts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    fetchPosts();
  }, [refresh]);

  const fetchPosts = async () => {
    try {
      const response = await getPosts();
      setPosts(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Hapus post ini?")) {
      try {
        await deletePost(id);
        setRefresh(prev => prev + 1);
      } catch {
        alert("Gagal menghapus post");
      }
    }
  };

  const handleSuccess = () => {
    setSelected(null);
    setRefresh(prev => prev + 1);
  };

  return (
    <div>
      {/* === FORM TAMBAH / EDIT POST === */}
      <PostForm 
        post={selected} 
        onSuccess={handleSuccess} 
      />

      {/* === TABEL POST === */}
      <div className="table-responsive mt-4">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Judul</th>
              <th>Konten</th>
              <th>User</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {posts.map((post, index) => (
              <tr key={post.id}>
                <td>{index + 1}</td>
                <td>{post.title}</td>
                <td>{post.content}</td>
                <td>{post.TableUser?.name || "-"}</td>

                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => setSelected(post)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(post.id)}
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

export default PostCrud;
