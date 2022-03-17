import styles from "./Appointment.module.scss";
import {TxtInput} from "../FormElems/TxtInput/TxtInput";
import {useMachine} from "@xstate/react";
import {appointmentMachine} from "../../xstate/appointment.machine";
import {CheckableInput} from "../FormElems/CheckableInput/CheckableInput";
import {SimpleSelect} from "../FormElems/Select/SimpleSelect";
import {Loader} from "../Loader/Loader";
import {Icon} from "../SVGsprite/Icon";

export function Appointment () {

    let [state, send] = useMachine(appointmentMachine);

    let submit = function (event) {
        event.preventDefault();
        send({type: "SUBMIT"});
    };

    return (
        <div className={styles.appointment}>
            <h1>Запись на личный приём</h1>

            {
                state.matches("loading")
                &&
                <article aria-live={"assertive"} className={"blockLoader"}>
                    <Loader label={"Загрузка"}/>
                </article>
            }

            <form onSubmit={(event) => submit(event)}>
                <h2>Данные о приёме</h2>
                <p>Заполняются автоматически из Личного кабинета. Если хотите изменить данные, <a href={"#"} target={"_blank"}>отредактируйте профиль.</a></p>

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
                />
                <TxtInput
                    label={"Телефон"}
                    type={"tel"}
                    name={"tel"}
                    id={"tel"}
                    errorMsg={state.context.telError}
                    send={send}
                    sendType={"FILL_TEL"}
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
                    <button type="submit" className={"btn btnPrimary"}>
                        Продолжить
                    </button>

                    {
                        state.matches("sending") && <Loader/>
                    }
                </div>
            </form>

            <section aria-live={"polite"}>
                {
                    state.matches("success") &&

                    <>
                        <h2><Icon name={"icon-success"} sizeH={40} sizeW={40}/> <br/>Заявка отправлена </h2>
                        <p>Номер вашей заявки 7777-00120-6703-235/19</p>

                        <p>На&nbsp;электронную почту, указанную в&nbsp;заявке, придёт подтверждение с&nbsp;указанием времени приёма, а&nbsp;перед приёмом — инструкция по&nbsp;подключению. Если
                           у&nbsp;вас возникнут вопросы, задайте&nbsp;их по&nbsp;                   телефону: <a href={"tel:+71234567890"}>+7 123 456-78-90</a>.
                        </p>

                        {/*
                            <button
                                type={"button"}
                                onClick={()=> send({type: "ONE_MORE"})}
                            >
                                В начало
                            </button>
                        */}
                    </>
                }


            </section>

        </div>
    );
}