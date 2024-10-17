import { Input } from "@/componentsShadcn/ui/input";
import { useEffect } from "react";

interface InputCommonProps {
    type: string;
    required?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    id: string;
    name: string;
    placeholder?: string;
    label: string;
    error: any;
    disabled?:boolean
}

const InputCommon: React.FC<InputCommonProps> = ({ type, required = false, onChange, value, onBlur, id, name, placeholder, label, error ,disabled}) => {

    useEffect(() => {
        if (type === "date") {
            const handleFocus = (e: Event) => {
                const input = e.target as HTMLInputElement;
                input.type = "date";
            };

            const handleBlur = (e: Event) => {
                const input = e.target as HTMLInputElement;
                input.type = "text";
            };

            const inputs = document.querySelectorAll(`input[id="${id}"]`);
            inputs.forEach((input) => {
                input.addEventListener("focus", handleFocus);
                input.addEventListener("blur", handleBlur);
            });

            // Clean up event listeners on unmount
            return () => {
                inputs.forEach((input) => {
                    input.removeEventListener("focus", handleFocus);
                    input.removeEventListener("blur", handleBlur);
                });
            };
        }
    }, [type, id]);

    return (
        <div className="flex items-center gap-3" dir="rtl">
            <div className="w-[16%]">
                <div className=" mb-1 h-[15px]" />
                <label htmlFor={id} className="text-[#0077bc] text-[12px] text-sm">
                    {label}
                </label>
            </div>

            <div className="w-[84%]">
                {
                    <div className="text-red-500 text-[10px] mb-1 h-[15px]">

                        {error && error}
                    </div>
                }

                <Input
                    type={type !== "date" ? type : "text"}
                    required={required}
                    id={id}
                    name={name}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder={placeholder}
                    className="rounded-none w-full px-2 py-3 mx-auto placeholder:text-gray-400 text-[14px] border-2"
                    dir="rtl"
                    min={type === "number" ? 1 : undefined}
                    disabled={disabled}
                />
            </div>
        </div>
    );
};

export default InputCommon;
