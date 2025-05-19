import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type RadioGroupProps = HTMLAttributes<HTMLDivElement>;

const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(({ className, ...props }, ref) => {
  return <div className={cn("flex gap-4", className)} ref={ref} {...props} />;
});
RadioGroup.displayName = "RadioGroup";

type RadioOptionProps = HTMLAttributes<HTMLLabelElement> & {
  value: string;
  name: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const RadioOption = forwardRef<HTMLLabelElement, RadioOptionProps>(({ className, children, value, name, checked, onChange, ...props }, ref) => {
  return (
    <label
      className={cn(
        "flex items-center gap-2 rounded-md border border-gray-200 px-4 py-2 cursor-pointer transition-colors",
        checked && "border-blue-600 bg-blue-50",
        className
      )}
      ref={ref}
      {...props}
    >
      <input type="radio" className="sr-only" name={name} value={value} checked={checked} onChange={onChange} />
      <div
        className={cn(
          "h-4 w-4 rounded-full border border-gray-400",
          checked && "border-2 border-blue-600 bg-white p-0.5",
          checked && "after:block after:h-full after:w-full after:rounded-full after:bg-blue-600"
        )}
      />
      <span>{children}</span>
    </label>
  );
});
RadioOption.displayName = "RadioOption";

export { RadioGroup, RadioOption };
