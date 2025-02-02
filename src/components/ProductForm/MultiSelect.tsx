"use client";

import { Checkbox } from "../ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

interface MultiSelectProps {
    options: string[];
    selectedValues: string[];
    onSelect: (values: string[]) => void;
    placeholder?: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
    options,
    selectedValues,
    onSelect,
    placeholder = "Select options",
}) => {
    const handleSelect = (value: string) => {
        const newSelectedValues = selectedValues.includes(value)
            ? selectedValues.filter((v) => v !== value) // Deselect if already selected
            : [...selectedValues, value]; // Select if not already selected
        onSelect(newSelectedValues);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full flex justify-start">
                    {selectedValues.length > 0 ? selectedValues.join(", ") : placeholder}
                </Button>
            </DropdownMenuTrigger>
            <div className="flex justify-start items-start w-full">
                <DropdownMenuContent className="w-full">
                    {options.map((option) => (
                        <DropdownMenuItem key={option} onSelect={(e) => e.preventDefault()}>
                            <div
                                className="flex items-center space-x-2 cursor-pointer"
                                onClick={() => handleSelect(option)}
                            >
                                <Checkbox checked={selectedValues.includes(option)} />
                                <span>{option}</span>
                            </div>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </div>
        </DropdownMenu>
    );
};

export default MultiSelect;