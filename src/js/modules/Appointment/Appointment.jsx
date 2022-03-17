import styles from "./Appointment.module.scss";
import {TxtInput} from "../FormElems/TxtInput/TxtInput";
import {useMachine} from "@xstate/react";
import {appointmentMachine} from "../../xstate/appointment.machine";
import {CheckableInput} from "../FormElems/CheckableInput/CheckableInput";
import {SimpleSelect} from "../FormElems/Select/SimpleSelect";
import {Loader} from "../Loader/Loader";
import {Icon} from "../SVGsprite/Icon";
import {useEffect} from "react";
import {Button} from "../Button/Button";

/*
* Запись на прием.
* Управляется стейт машиной appointmentMachine.
* Показ лоадера в момент получения данных.
* Форма, когда данные получены.
* Показ ошибок, если есть. Ошибки сбрасываются только при отправке на валидацию.
* Экран успеха. Кнопка "Заново" перезагружает страницу.
* Как следствие, всё возвращается в исходное состояние.
*
*/

export function Appointment () {

    let [state, send] = useMachine(appointmentMachine);

    let submit = function (event) {
        event.preventDefault();
        send({type: "SUBMIT"});
    };

    useEffect(() => {
        /* Если мы в состоянии "показать ошибки", ставим фокус на первое поле с ошибкой */
        if (state.matches("filling.show_errors")) {
            document.querySelector("[class*='errorField']")?.focus();
        }
    });

    return (
        <div className={styles.appointment}>
            <div
                aria-live={"assertive"}
            >
                {
                    state.matches("loading") &&
                    <div className={"blockLoader"}>
                        <Loader label={"Загрузка"}/>
                    </div>
                }
            </div>
            <h1>Запись на личный приём</h1>

            {
                !state.matches("success") &&
                <form onSubmit={(event) => submit(event)}>
                    <h2>Данные о приёме</h2>
                    <p>Заполняются автоматически из Личного кабинета. Если хотите изменить данные, <a href={"#"} target={"_blank"}>отредактируйте профиль.</a></p>

                    <div className={"visuallyHidden"} aria-live={"assertive"}>
                        {
                            state.matches("filling.show_errors")
                                ? "Форма заполнена некорректно. Исправьте ошибки, чтобы продолжить."
                                : ""
                        }
                    </div>

                    <SimpleSelect
                        label={"Заявитель"}
                        send={send}
                        type={"CHANGE_USER"}
                        list={state.context.entries}
                    />

                    <TxtInput
                        label={"Электронная почта"}
                        type={"email"}
                        name={"email"}
                        id={"email"}
                        errorMsg={state.context.emailError}
                        send={send}
                        sendType={"FILL_EMAIL"}
                        value={state.context.email}
                    />
                    <TxtInput
                        label={"Телефон"}
                        type={"tel"}
                        name={"tel"}
                        id={"tel"}
                        errorMsg={state.context.telError}
                        send={send}
                        sendType={"FILL_TEL"}
                        value={state.context.tel}
                    />

                    <fieldset className={"formGroup"}>
                        <legend>
                            <h3 className={"formGroupTitle"}>Заявление подаёт</h3>
                        </legend>
                        <CheckableInput
                            type={"radio"}
                            name={"resident"}
                            id={"fiz"}
                            value={"fiz"}
                            label={"Физическое лицо"}
                            checked={state.context.resident === "fiz"}
                            sendType={"CHANGE_RESIDENT"}
                            send={(event) => send(event)}
                        />

                        <CheckableInput
                            type={"radio"}
                            name={"resident"}
                            id={"jur"}
                            value={"jur"}
                            label={"Юридическое лицо"}
                            checked={state.context.resident === "jur"}
                            sendType={"CHANGE_RESIDENT"}
                            send={(event) => send(event)}
                        />
                    </fieldset>


                    <CheckableInput
                        type={"checkbox"}
                        name={"terms"}
                        id={"terms"}
                        label={"Я принимаю"}
                        sendType={"TERMS_AGREE"}
                        send={(event) => send(event)}
                        errorMsg={state.context.termsError}
                    >
                        <a href="#">условия предоставления услуги</a>
                        .
                    </CheckableInput>

                    <CheckableInput
                        type={"checkbox"}
                        name={"processing"}
                        id={"processing"}
                        label={"Я даю разрешение на обработку персональных данных."}
                        sendType={"PROC_AGREE"}
                        send={(event) => send(event)}
                        errorMsg={state.context.processingError}
                    />

                    <div className={"formGroup"}>
                        <Button type="submit" primary label={"Продолжить"}/>

                        <div aria-live={"assertive"}>
                            {
                                state.matches("sending") &&
                                <Loader
                                    label={"Отправляем заявку"}
                                />
                            }
                        </div>
                    </div>
                </form>
            }

            <section aria-live={"polite"}>
                {
                    /* Экран успеха */
                    state.matches("success") &&

                    <div className={styles.successScreen}>
                        <h2>
                            <Icon name={"icon-success"} sizeH={40} sizeW={40}/> <br/>
                            Заявка отправлена
                        </h2>
                        <p>Номер вашей заявки 7777-00120-6703-235/19.</p>

                        <p>На&nbsp;электронную почту, указанную в&nbsp;заявке, придёт подтверждение с&nbsp;указанием времени приёма, а&nbsp;перед приёмом — инструкция по&nbsp;подключению. Если
                           у&nbsp;вас возникнут вопросы, задайте&nbsp;их по&nbsp;                   телефону: <a href={"tel:+71234567890"}>+7 123 456-78-90</a>.
                        </p>

                        <Button
                            secondary
                            onClick={() => window.location.reload()}
                            label={"Заново"}
                        />
                    </div>
                }
            </section>
        </div>
    );
}