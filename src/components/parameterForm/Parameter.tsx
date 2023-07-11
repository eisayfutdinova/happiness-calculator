export const Parameter = ({label, type, parameterKey, options, elementType, handleChange}:
                              { label: string, elementType: 'select' | 'input', type: string, parameterKey: string, options: { value: number, name: string }[], isTransformed?: boolean, handleChange: (e) => void }) => {

    return (
        <div className={'input-form'}>
            <label>{label}</label>
            {elementType === 'select' &&
                <select name={label}
                        onChange={handleChange}
                        id={parameterKey}>
                    {
                        options.map(option => {
                            return (
                                <option key={option.value} value={option.value}>{option.name}</option>
                            )
                        })
                    }
                </select>
            }
            {
                elementType === 'input' &&
                <input placeholder={label}
                       onChange={handleChange}
                       id={parameterKey}
                       type={type}/>
            }
        </div>
    )
};