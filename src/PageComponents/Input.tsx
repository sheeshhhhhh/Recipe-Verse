import { ChangeEvent, InputHTMLAttributes } from "react"


type InputProps = {
    name: string,
    label: string,
    value: string,
    callbackFunction: (e: ChangeEvent<HTMLInputElement>) => void,
} & InputHTMLAttributes<HTMLInputElement>;

const Input = ({
    name,
    label,
    value,
    callbackFunction,
    ...props
} : InputProps) => {

    return (
        <div className="relative group mt-3">
        <p className={`absolute h-[14px] group-focus-within:top-[-10px] group-focus-within:left-[18px] 
        group-focus-within:text-sm group-focus-within:px-1 bg-white dark:bg-card transition-all duration-200 
        ${value ? 'top-[-10px] left-[18px] text-sm px-1' : 'top-[7px] left-[16px]'}`}>{label}</p>
        <input 
        {...props}
        name={name}
        value={value}
        onChange={(e) => callbackFunction(e)}
        className="px-3 w-[340px] h-[40px] border-[1px] border-slate-400 rounded-lg text-lg outline-none dark:bg-transparent dark:text-white
        group-focus-within:border-black dark:group-focus-within:border-white dark:border-white" 
        />
      </div>
    )
}

export default Input