export default function Input({type="text",placeholder,name,onChange,value,label}){
    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <input id={name} type={type} placeholder={placeholder} name={name} onChange={onChange} value={value}/>
        </div>
    )
}