const InputWrapper = (props) => {
    return (
        <div {...props} className="input-wrapper">
            {props.children}
        </div>
    )
}

export default InputWrapper;
