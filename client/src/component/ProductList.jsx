import { useState, useEffect } from "react";
import { getProducts, deleteProduct } from "../services/api";

const formatRupiah = (value) => {
  if (value == null) return "-";
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(value);
};

const ProductList = ({ onEdit, refresh }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data);
    } catch {
      console.error("Gagal mengambil data Produk");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);

  const handleDelete = async (id) => {
    if (window.confirm("Yakin hapus produk ini?")) {
      await deleteProduct(id);
      fetchData();
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;

  return (
    <table className="table table-striped">
      <thead className="table-dark">
        <tr>
          <th>No</th>
          <th>Nama</th>
          <th>Harga</th>
          <th>Stok</th>
          <th>Kategori</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        {products.map((p, i) => (
          <tr key={p.id}>
            <td>{i + 1}</td>
            <td>{p.name}</td>
            <td>{formatRupiah(p.price)}</td>
            <td>{p.stock ?? "-"}</td>
            <td>{p.category?.title || p.category?.name || "-"}</td>
            <td>
              <button className="btn btn-primary btn-sm me-2" onClick={() => onEdit(p)}>Edit</button>
              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p.id)}>Hapus</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductList;
