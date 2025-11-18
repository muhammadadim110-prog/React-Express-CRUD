import { useState, useEffect } from "react";
import { getCategories, createProduct, updateProduct } from "../services/api";

const ProductForm = ({ product, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    categoryId: ""
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        price: product.price ?? "",
        stock: product.stock ?? "",
        categoryId: product.categoryId ?? ""
      });
    } else {
      setFormData({ name: "", price: "", stock: "", categoryId: "" });
    }
  }, [product]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data);
    } catch {
      console.error("Gagal mengambil data kategori");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      price: formData.price ? Number(formData.price) : null,
      stock: formData.stock ? Number(formData.stock) : null,
      categoryId: formData.categoryId ? Number(formData.categoryId) : null
    };

    try {
      if (product) await updateProduct(product.id, payload);
      else await createProduct(payload);

      onSuccess();
      setFormData({ name: "", price: "", stock: "", categoryId: "" });
    } catch {
      alert("Gagal menyimpan data");
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">{product ? "Edit" : "Tambah"} Produk</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nama Produk</label>
            <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Harga</label>
            <input type="number" className="form-control" name="price" value={formData.price} onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Stok</label>
            <input type="number" className="form-control" name="stock" value={formData.stock} onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Kategori</label>
            <select className="form-control" name="categoryId" value={formData.categoryId} onChange={handleChange}>
              <option value="">Pilih Kategori</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title || c.name}
                </option>
              ))}
            </select>
          </div>

          <button className="btn btn-primary">Simpan</button>

          {product && (
            <button type="button" className="btn btn-secondary ms-2" onClick={() =>
              setFormData({ name: "", price: "", stock: "", categoryId: "" })
            }>
              Batal
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
