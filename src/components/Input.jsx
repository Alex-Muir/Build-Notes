export default function Input( {labelFor, label, type, name, placeholder, multiline, required} ) {
    return (
        <div>
            <label for={labelFor}>{label}</label>
            {multiline
                ? <textarea name={name} required={required}></textarea>
                : <input type={type} name={name} placeholder={placeholder} required={required} />
            }
        </div>
    );
}