export const Parameter = ({label, type, parameterKey, options, elementType}:
                              { label: string, elementType: 'select' | 'input', type: string, parameterKey: string, options: { value: number, name: string }[], isTransformed?: boolean }) => {

    return (
        <div className={'input-form'}>
            <label>{label}</label>
            {elementType === 'select' &&
                <select name={label}
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
                       id={parameterKey}
                       type={type}/>
            }
        </div>
    )
};