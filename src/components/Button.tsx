interface ButtonProps {
    type: "submit" | "reset" | "button"
    children: React.ReactNode
    handleClick?: () => void 
}

export default function Button( {type, children, handleClick} : ButtonProps ) {
    return (
        <button type={type} onClick={handleClick}>
            {children}
        </button>
    );
}