import "./styles.scss";
const SimpleButton = (props:any) => {
    return (
        <button
            className="simple-btn"
            onClick={props.onClick}
        >{props.title}</button>
    )
}

export default SimpleButton;