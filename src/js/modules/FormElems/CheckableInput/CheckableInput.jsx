import styles from "./CheckableInput.module.scss";
import {Icon} from "../../SVGsprite/Icon";

/*
* Component for inputs types, that can be checked:
* checkbox, radio
*/

export function CheckableInput (props) {

    let handleChecking = function (event) {
        props.send({
            type: props.sendType,
            data: (props.type === "checkbox")
                ? event.target.checked
                : event.target.value
        });
    }

    return (
        <div className={styles.checkableInput}>
            <div aria-live={"polite"}  id={`${props.id}-decr`}>
                {
                    props.errorMsg &&
                    <div className={"errorMessage"}>
                        <Icon
                            name={"icon-error"}
                            sizeW={"20"}
                            sizeH={"20"}
                        />
                        { props.errorMsg }
                    </div>
                }
            </div>
            <input
                aria-labelledby={`${props.id}-decr`}
                type={props.type}
                name={props.name}
                id={props.id}
                value={props.value || ""}
                checked={props.checked}
                onChange={(event) => handleChecking(event)}
            />
            <label htmlFor={props.id}>
                {props.label + " "}
            </label>
            {props.children}
        </div>
    );
}