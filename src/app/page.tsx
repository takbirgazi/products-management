import ProductForm from "@/components/ProductForm/ProductForm";
import ProductTable from "@/components/ProductTable/ProductTable";

export default function Home() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 container mx-auto px-4">Product Management</h1>
      <div className="container mx-auto px-4 pb-4">
        <ProductForm />
      </div>
      <hr />
      <div className="container mx-auto p-4">
        <ProductTable />
      </div>
    </div>
  );
}