import styles from "./TxtInput.module.scss";
import {Icon} from "../../SVGsprite/Icon";
import clsx from "clsx";

export function TxtInput (props) {
    return (
        <div className={clsx("formGroup", styles.txtInputRow)}>
            <label htmlFor={props.id}>
                {props.label}
            </label>
            <div aria-live={"polite"} id={`${props.id}-decr`}>
                {
                    props.errorMsg &&
                    <div className={"errorMessage"}>
                        <Icon
                            name={"icon-error"}
                            sizeW={"20"}
                            sizeH={"20"}
                        />
                        {props.errorMsg}
                    </div>
                }
            </div>
            <input
                aria-labelledby={`${props.id}-decr`}
                className={clsx({[styles.errorField]: props.errorMsg})}
                name={props.name}
                id={props.id}
                type={props.type || "text"}
                defaultValue={props.value}
                onChange={
                    (event) => {
                        props.send({
                            type: props.sendType,
                            data: event.target.value
                        })
                    }
                }
            />
        </div>
    );
}