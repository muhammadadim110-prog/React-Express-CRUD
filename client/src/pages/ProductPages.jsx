import { useState } from "react";
import ProductForm from "../component/ProductForm";
import ProductList from "../component/ProductList";

const ProductPage = () => {
  const [selected, setSelected] = useState(null);
  const [refresh, setRefresh] = useState(0);

const handleSuccess = () => {
    setSelected(null);
    setRefresh(prev => prev + 1);
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Manajemen Produk</h2>
        <ProductForm product={selected} onSuccess={handleSuccess} />

      <ProductList
        refresh={refresh}
        onEdit={setSelected}
      />
    </div>
  );
};

export default ProductPage;