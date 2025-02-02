"use client"
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { deleteProduct } from "@/redux/features/productSlice/productSlice";
import Image from "next/image";


const ProductTable = () => {
  const products = useAppSelector((state) => state.products.products);
  const dispatch = useAppDispatch();

  const myDeleteProduct = (event: number) => {
    dispatch(deleteProduct(event))
  }
  const myEditProduct = (event: number) => {
    console.log(event)
  }

  return (
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
                  <Image className="border rounded h-10 w-10" width={40} height={40} src={img} alt="" />
                </figure>
              ))}
            </TableCell>
            <TableCell>{product.color.map(color => color + ", ")}</TableCell>
            <TableCell>{product.size.map(size => size + ", ")}</TableCell>
            <TableCell>
              <div className="flex gap-1">
                <Button >View</Button>
                <Button onClick={() => myEditProduct(product.id)}>Edit</Button>
                <Button onClick={() => myDeleteProduct(product.id)}>Delete</Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductTable;