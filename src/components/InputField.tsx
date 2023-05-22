type props = {
    type: string
    placeholder: string
    value: string
    setVal: any
    classNames: string
    required?: boolean
    err?: string
}

function InputField({
    classNames = '',
    placeholder,
    required = true,
    setVal,
    type,
    value,
    err,
}: props) {
    return (
        <>
            <input
                type={type}
                placeholder={placeholder}
                value={value || ''}
                onChange={(e) => setVal(e.target.value)}
                className={`${classNames} focus:outline-none bg-transparent focus:border-[#1d9bf0] border border-[#333639] rounded py-4 px-2 w-full`}
                required={required}
            />
            {err && (
                <p
                    className={`text-[#f4212e] text-sm ${
                        err.length === 0 && 'hidden'
                    } `}
                >
                    {err}
                </p>
            )}
        </>
    )
}

export default InputField
