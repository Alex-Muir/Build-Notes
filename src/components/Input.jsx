export default function Input( {labelFor, label, type, name, placeholder, multiline, required} ) {
    return (
        <>
            <label for={labelFor}>{label}</label>
            {multiline ? (
                <textarea className="TextInput" name={name} required={required}></textarea> 
            ) : (
                <input className="TextInput" type={type} name={name} placeholder={placeholder} required={required} />
            )}
        </>
    );
}