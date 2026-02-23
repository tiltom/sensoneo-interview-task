import { FormItem } from "./form-item";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

type EntityOption = {
  id: number;
  label: string;
};

type EntitySelectFieldProps = {
  label: string;
  error?: string;
  value: number | null;
  onChange: (value: number) => void;
  options: EntityOption[];
  isLoading?: boolean;
  placeholder?: string;
};

export function EntitySelectField({
  label,
  error,
  value,
  onChange,
  options,
  isLoading = false,
  placeholder = "Select...",
}: EntitySelectFieldProps) {
  return (
    <FormItem label={label} error={error}>
      <Select
        value={value ? String(value) : ""}
        onValueChange={(val) => onChange(parseInt(val))}
        disabled={isLoading}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.id} value={String(option.id)}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormItem>
  );
}
