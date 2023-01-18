import React, {useEffect, useRef} from 'react';

interface TextInputProps {
    type: string,
    name: string;
    value: string;
    className: string;
    autoComplete?: string;
    required?: any;
    isFocused?: boolean;
    handleChange: React.ChangeEventHandler<HTMLInputElement>;
}

export default function TextInput({
                                      type = 'text',
                                      name,
                                      value,
                                      className,
                                      autoComplete,
                                      required,
                                      isFocused,
                                      handleChange,
                                  }: TextInputProps) {

    const input: any = useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <div className="flex flex-col items-start">
            <input
                type={type}
                name={name}
                value={value}
                className={
                    `border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm ` +
                    className
                }
                ref={input}
                autoComplete={autoComplete}
                required={required}
                onChange={(e) => handleChange(e)}
            />
        </div>
    );
}
