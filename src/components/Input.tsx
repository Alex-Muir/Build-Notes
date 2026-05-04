interface InputProps {
    labelFor?: string
    label: string
    type?: string
    name?: string
    placeholder?: string
    multiline?: boolean
    required?: boolean
    defaultValue?: string
    onChange?: (value: string) => void
    value?: string
}

export default function Input({
    labelFor, 
    label, 
    type, 
    name, 
    placeholder, 
    multiline, 
    required, 
    defaultValue,
    onChange,
    value
}: InputProps) {
    return (
        <>
            <label htmlFor={labelFor}>{label}</label>
            {multiline ? (
                <textarea 
                    className="ContentInput"
                    name={name} 
                    required={required} 
                    defaultValue={defaultValue}> 
                </textarea> 
            ) : (
                <input
                    className="TitleAndTagInput" 
                    type={type} 
                    name={name} 
                    placeholder={placeholder} 
                    required={required} 
                    defaultValue={defaultValue}
                    onChange={onChange ? e => onChange(e.target.value) : undefined}
                    autoComplete="off"
                    value={value}/>
            )}
        </>
    );
}