import { useState, useEffect } from "react";
import { getCategories, deleteCategory } from "../services/api";

const CategoryList = ({ onEdit }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Yakin hapus?")) {
      await deleteCategory(id);
      fetchCategories();
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;

  return (
    <table className="table table-striped">
      <thead className="table-dark">
        <tr>
          <th>No</th>
          <th>Title</th>
          <th>Jumlah Produk</th>
          <th>Aksi</th>
        </tr>
      </thead>

      <tbody>
        {categories.map((cat, i) => (
          <tr key={cat.id}>
            <td>{i + 1}</td>
            <td>{cat.title}</td>
            <td>{cat.products?.length}</td>
            <td>
              <button 
                className="btn btn-primary btn-sm me-2"
                onClick={() => onEdit(cat)}
              >
                Edit
              </button>

              <button 
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(cat.id)}
              >
                Hapus
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CategoryList;
