"use client"
import { useState } from 'react';
import { useAppDispatch } from '@/redux/hooks';

import { addProduct } from '@/redux/features/productSlice/productSlice';
import { Input } from '@/components/ui/input';
import { Label } from "../ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import MultiSelect from './MultiSelect';
import { useForm } from 'react-hook-form';

interface SubmitData {
  id: number;
  productName: string;
  price: number;
  color: string[];
  size: string[];
  category: string;
  images: string[];
}

const ProductForm = () => {
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const dispatch = useAppDispatch();

  // react-hook-form setup
  const { handleSubmit, reset, register, setValue, watch } = useForm<SubmitData>();

  const colorOptions = ["Red", "Blue", "Green", "Yellow", "Black"];
  const sizeOptions = ["M", "L", "XL", "XXL"];

  const onSubmit = (data: SubmitData) => {
    const finalData = {
      ...data,
      id: Date.now(),
      color: selectedColors,
      size: selectedSize,
      images
    };

    dispatch(addProduct(finalData)); // Send to Redux
    reset(); // Reset form fields
    setSelectedColors([]);
    setSelectedSize([]);
    setImages([]);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      setImages((prev) => [...prev, ...files]); // Store files in state
    };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>

      <div className='flex gap-4 flex-col md:flex-row '>
        <div className='w-full md:w-1/2'>
          <Label htmlFor="productName">Product Name</Label>
          <Input type='text' {...register("productName", { required: true })} placeholder="Write Your Product Name" />
        </div>
        <div className='w-full md:w-1/2'>
          <Label htmlFor="price">Price</Label>
          <Input type='number' {...register("price", { required: true })} placeholder="Write Your Price" />
        </div>
      </div>

      <div className='flex gap-4 flex-col md:flex-row '>
        <div className='w-full md:w-1/2'>
          <Label htmlFor="color">Color</Label>
          <MultiSelect
            options={colorOptions}
            selectedValues={selectedColors}
            onSelect={setSelectedColors}
            placeholder="Select colors"
          />
          {selectedColors.length > 0 && <p>Selected Colors: {selectedColors.join(", ")}</p>}
        </div>
        <div className='w-full md:w-1/2'>
          <Label htmlFor="size">Size</Label>
          <MultiSelect
            options={sizeOptions}
            selectedValues={selectedSize}
            onSelect={setSelectedSize}
            placeholder="Select size"
          />
          {selectedSize.length > 0 && <p>Selected Size: {selectedSize.join(", ")}</p>}
        </div>
      </div>

      <div className='flex gap-4 flex-col md:flex-row'>
        <div className='w-full md:w-1/2'>
          <Label htmlFor="category">Category</Label>
          <Select
            onValueChange={(value) => setValue("category", value)} // Manually update react-hook-form state
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="tShirt">t-Shirt</SelectItem>
                <SelectItem value="shirt">Shirt</SelectItem>
                <SelectItem value="pant">Pant</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {/* Debugging: Show selected category */}
          {watch("category") && <p>Selected Category: {watch("category")}</p>}
        </div>
        <div className='w-full md:w-1/2'>
          <Label htmlFor="images">Image</Label>
          <Input type='file' multiple onChange={handleImageUpload} placeholder="Select Image" />
        </div>
      </div>

      <div className='flex justify-start w-28'>
        <Input className='bg-blue-500 text-white' type='submit' />
      </div>
    </form>
  );
};

export default ProductForm;