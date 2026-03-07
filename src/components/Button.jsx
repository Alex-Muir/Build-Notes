export default function Button( {type, label, handleClick} ) {
    return (
        <button type={type} onClick={handleClick}>
            {label}
        </button>
    );
}