import styles from "./Select.module.scss";
import {Icon} from "../../SVGsprite/Icon";
import clsx from "clsx";
import {ErrorMessage} from "../../ErrorMessage/ErrorMessage";

/* Компонент простого селекта.
*
* Ожидамые пропсы:
* - название (label);
* - имя (name) и id;
* - текст ошибки (errorMsg)
*/

export function SimpleSelect (props) {
    return (
        <div className={clsx("formGroup", styles.selectContainer)}>
            <label htmlFor={props.id}>
                {props.label}
            </label>
            <ErrorMessage id={props.id} errorMsg={props.errorMsg}/>
            <select
                aria-labelledby={`${props.name}-descr`}
                className={clsx({[styles.errorField]: props.errorMsg})}
                name={props.name}
                id={props.id}
                onChange={
                    (event) => {
                        props.send(
                            {
                                type: props.type,
                                data: event.target.value
                            }
                        );
                    }
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