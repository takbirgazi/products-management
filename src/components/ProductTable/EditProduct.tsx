"use client"
import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { Input } from '@/components/ui/input';
import { Label } from "../ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useForm } from 'react-hook-form';
import MultiSelect from '../ProductForm/MultiSelect';
import { editProduct } from '@/redux/features/productSlice/productSlice';

interface SubmitData {
    id: number;
    productName: string;
    price: number;
    color: string[];
    size: string[];
    category: string;
    images: File[];
}

const EditProduct = ({ initialValues, setIsEditModalOpen }: { initialValues: SubmitData, setIsEditModalOpen: (isOpen: boolean) => void }) => {
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [selectedSize, setSelectedSize] = useState<string[]>([]);
    const [images, setImages] = useState<File[]>([]);
    const [nameValue, setNameValue] = useState(initialValues.productName);
    const [price, setPrice] = useState(initialValues.price);
    const dispatch = useAppDispatch();

    // react-hook-form setup
    const { handleSubmit, reset, register, setValue, watch } = useForm<SubmitData>();

    const colorOptions = ["Red", "Blue", "Green", "Yellow", "Black"];
    const sizeOptions = ["M", "L", "XL", "XXL"];

    const update = (data: SubmitData) => {
        const finalData = {
            ...data,
            productName: nameValue,
            price,
            color: selectedColors,
            size: selectedSize,
            images
        };
        const id = initialValues.id
        dispatch(editProduct({ id, updatedProduct: finalData }))
        reset(); // Reset form fields
        setSelectedColors([]);
        setSelectedSize([]);
        setImages([]);
        setIsEditModalOpen(false)
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setImages((prev) => [...prev, ...files]);
    };

    useEffect(() => {
        setSelectedColors(initialValues.color);
        setSelectedSize(initialValues.size);
        setValue("category", initialValues.category)
    }, [initialValues, setValue])

    return (
        <form onSubmit={handleSubmit(update)} className='flex flex-col gap-4'>

            <div className='flex gap-4 flex-col md:flex-row '>
                <div className='w-full md:w-1/2'>
                    <Label htmlFor="productName">Product Name</Label>
                    <Input value={nameValue} {...register("productName", { required: true, onChange: (e) => setNameValue(e.target.value) })} type='text' placeholder="Write Your Product Name" />
                </div>
                <div className='w-full md:w-1/2'>
                    <Label htmlFor="price">Price</Label>
                    <Input value={price} type='number' {...register("price", { required: true, onChange: (e) => setPrice(e.target.value) })} placeholder="Write Your Price" />
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
                        value={watch("category") || initialValues.category}
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
                <Input className='bg-blue-500 text-white cursor-pointer' value="Update" type='submit' />
            </div>
        </form>
    );
};

export default EditProduct;