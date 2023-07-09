import "./ToggleSwitch.css";

const ToggleSwitch = ({ label, checked, onChange }) => {
    return (
        <div className="toggle">
            {label}{" "}
            <div className="toggle-switch">
                <input type="checkbox" checked={checked}
                       onChange={onChange}
                       className="checkbox"
                       name={label} id={label} />
                <label className="label" htmlFor={label}>
                    <span className="inner" />
                    <span className="switch" />
                </label>
            </div>
        </div>
    );
};

export default ToggleSwitch;