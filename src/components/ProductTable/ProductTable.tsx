"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { deleteProduct } from "@/redux/features/productSlice/productSlice";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useState } from "react";
import EditProduct from "./EditProduct";

interface SubmitData {
  id: number;
  productName: string;
  price: number;
  color: string[];
  size: string[];
  category: string;
  images: string[];
}

const ProductTable = () => {
  const products = useAppSelector((state) => state.products.products);
  const dispatch = useAppDispatch();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<SubmitData | null>(null);

  const myDeleteProduct = (id: number) => {
    dispatch(deleteProduct(id));
  };

  const myEditProduct = (product: SubmitData) => {
    setSelectedProduct(product); // Set the selected product for editing
    setIsEditModalOpen(true); // Open the edit modal
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Images</TableHead>
            <TableHead>Colors</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((product, index) => (
            <TableRow key={index}>
              <TableCell>{product.productName}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell className="flex gap-1">
                {product.images.map((img, i) => (
                  <figure key={i}>
                    <Image
                      className="border rounded h-10 w-10"
                      width={40}
                      height={40}
                      src={URL.createObjectURL(img)}
                      alt=""
                    />
                  </figure>
                ))}
              </TableCell>
              <TableCell>{product.color.map((color) => color + ", ")}</TableCell>
              <TableCell>{product.size.map((size) => size + ", ")}</TableCell>
              <TableCell>
                <div className="flex gap-1">
                  <Button onClick={() => myEditProduct(product)}>Edit</Button>
                  <Button onClick={() => myDeleteProduct(product.id)}>Delete</Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          {selectedProduct && (
            <EditProduct
              initialValues={selectedProduct}
              setIsEditModalOpen={setIsEditModalOpen}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductTable;