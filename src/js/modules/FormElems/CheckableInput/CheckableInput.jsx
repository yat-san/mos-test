import styles from "./CheckableInput.module.scss";
import clsx from "clsx";
import {ErrorMessage} from "../../ErrorMessage/ErrorMessage";

/* Контролируемый инпут типа checkbox или radio с лейблом и выводом ошибки.
*
* Ожидаемые пропсы:
* - тип (type), radio или checkbox;
* - название поля (label);
* - если label сложный (несколько ссылок, стилизация отдельных слов), то можно прописать всё это как дочерние элементы (props.children)
* - имя (name) и id поля;
* - значение поля (value), если применимо;
* - состояние checked, если нужен флажок по умолчанию;
* - функция для отправки события (send) или тип события (sendType);
* - текст ошибки (errorMsg);
*/

export function CheckableInput (props) {

    let handleChecking = function (event) {
        props.send({
            type: props.sendType,
            data: (props.type === "checkbox")
                ? event.target.checked
                : event.target.value
        });
    };

    return (
        <div className={styles.checkableInput}>

            <ErrorMessage id={props.id} errorMsg={props.errorMsg}/>
            <input
                aria-labelledby={`${props.id}-decr`}
                className={clsx({[styles.errorField]: props.errorMsg})}
                type={props.type}
                name={props.name}
                id={props.id}
                value={props.value || ""}
                checked={props.checked}
                onChange={(event) => handleChecking(event)}
            />
            {
                props.label &&
                <label htmlFor={props.id}>
                    {props.label + " "}
                </label>
            }
            {props.children}
        </div>
    );
}