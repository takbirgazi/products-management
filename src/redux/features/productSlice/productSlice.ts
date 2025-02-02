import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: number;
  productName: string;
  price: number;
  color: string[];
  size: string[];
  category: string;
  images: File[];
}

interface ProductState {
  products: Product[];
}

const initialState: ProductState = {
  products: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    editProduct: (state, action: PayloadAction<{ id: number; updatedProduct: Product }>) => {
      const { id, updatedProduct } = action.payload;
      state.products = state.products.map((product) =>
        product.id === id ? updatedProduct : product
      );
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter((product) => product.id != action.payload);
    },
  },
});

export const { addProduct, editProduct, deleteProduct } = productSlice.actions;
export default productSlice.reducer;