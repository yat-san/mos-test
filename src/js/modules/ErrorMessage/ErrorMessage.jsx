import {Icon} from "../SVGsprite/Icon";


/* Компонент ошибки для компонента элемента формы.

* Ожидаемые пропсы:
* - id элемента, который описывает ошибки;
* - текст ошибки;
*/
export function ErrorMessage (props) {
    return <div id={`${props.id}-decr`}>
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
}
