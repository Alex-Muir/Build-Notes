export default function Input({
    labelFor, 
    label, 
    type, 
    name, 
    placeholder, 
    multiline, 
    required, 
    defaultValue
}) {
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
                    autoComplete="off"/>
            )}
        </>
    );
}