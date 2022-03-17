import clsx from "clsx";

/* Компонент простой кнопки
* Можно расширить до кнопки с иконкой, индикатором.
*
* Ожидаемые пропсы:
* - тип (type), по умолчанию button;
* - вид (primary, secondary);
* - действие на клик (onClick), если нужно;
* - Название (label)
*/

export function Button (props) {
    return (
        <button
            type={props.type || "button"}
            className={clsx(
                "btn",
                {
                    ["btnPrimary"]: props.primary,
                    ["btnSecondary"]: props.secondary,
                }
            )}
            onClick={props.onClick}
        >
            {props.label}
        </button>
    )
}