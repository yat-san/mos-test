import styles from "./Select.module.scss";
import {Icon} from "../../SVGsprite/Icon";
import clsx from "clsx";

export function SimpleSelect (props) {
    return (
        <div className={clsx("formGroup", styles.selectContainer)}>
            <label htmlFor={props.id}>
                {props.label}
            </label>
            <div aria-live={"polite"}>
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
            <select
                name={props.name}
                id={props.id}
                onChange={
                    (event) => props.send(
                        {
                            type: props.type,
                            data: event.target.value
                        }
                    )
                }
            >
                {
                    props.list?.map((item) => {
                        return (
                            <option
                                value={item.id}
                                key={item.id}
                            >
                                {item.name}
                            </option>
                        );
                    })
                }
            </select>
        </div>
    );
}