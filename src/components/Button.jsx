export default function Button( {type, buttonName, handleClick} ) {
    return (
        <button type={type} onClick={handleClick}>
            {buttonName}
        </button>
    );
}