interface ButtonProps {
    cor?: 'green' | 'blue' | 'gray'
    className?: string 
    children: any
    onClick?: () => void
}

export default function botao(props: ButtonProps) {
    const cor = props.cor ?? 'gray'
    return(
        <button onClick={props.onClick} className={`
        bg-gradiente-to-r from-${cor}-400 to-${cor}-700
        text-white px-4 py-2 rounded-full
        ${props.className} 
        `}>
            {props.children}
        </button>
    )
}