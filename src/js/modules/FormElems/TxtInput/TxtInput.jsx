import styles from "./TxtInput.module.scss";
import {Icon} from "../../SVGsprite/Icon";
import clsx from "clsx";
import {ErrorMessage} from "../../ErrorMessage/ErrorMessage";


/* Контролируемый простой текстовый инпут с лейблом и выводом ошибки
*
* В пропсах ожидается:
* - тип (type), по умолчанию text, возможны также email, tel;
* - название поля для пользователя (label);
* - имя (name) и id поля;
* - текст ошибки (errorMsg);
* - функция отправки события в машину (send), а также тип события (sendType);
*/

export function TxtInput (props) {

    /* Обработка изменений в поле */
    let handleInput = function (event) {
        props.send({
            "type": props.sendType,
            "data": event.target.value
        });
    };

    return (
        <div className={clsx("formGroup", styles.txtInputRow)}>
            <label htmlFor={props.id}>
                {props.label}
            </label>

            <ErrorMessage id={props.id} errorMsg={props.errorMsg}/>
            <input
                aria-labelledby={`${props.id}-decr`}
                className={clsx({[styles.errorField]: props.errorMsg})}
                name={props.name}
                id={props.id}
                type={props.type || "text"}
                value={props.value}
                onChange={(event) => handleInput(event)}
            />
        </div>
    );
}