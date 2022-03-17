import {assign, createMachine} from "xstate";

/*
* Машина для управления компонентом записи на прием.
* Получает и хранит данные пользователей, которым доступна запись.
*
*/
export const appointmentMachine = createMachine({
    id: "appointment",
    context: {
        entries: [],
        currentUser: undefined,
        email: "",
        emailError: "",
        tel: "",
        telError: "",
        resident: "fiz",
        terms: false,
        termsError: "",
        processing: false,
        processingError: ""
    },
    initial: "loading",
    states: {
        // Загрузка данных о пользователе.
        "loading": {
            invoke: {
                id: "fetchData",
                src: "fetchData"
            },
            on: {
                "DONE": {
                    actions: ["saveEntries"],
                    target: "filling"
                },
                "ERROR": {
                    target: "loading_error"
                }
            }
        },
        // Если загрузка данных пользователя не удалась.
        "loading_error": {
            on: {
                "retry": {
                    target: "loading"
                }
            }
        },
        // Данные загружены, можно заполнять форму
        "filling": {
            entry: "scrollTop",
            initial: "idle",
            on: {
                "CHANGE_USER": {
                    actions: ["setUser"],
                    internal: true
                },
                "FILL_EMAIL": {
                    actions: ["saveEmail"],
                    internal: true
                },
                "FILL_TEL": {
                    actions: ["saveTel"],
                    internal: true
                },
                "CHANGE_RESIDENT": {
                    actions: ["saveResident"],
                    internal: true
                },
                "TERMS_AGREE": {
                    actions: ["saveTermsState"]
                },
                "PROC_AGREE": {
                    actions: ["saveProcState"]
                },
                "SUBMIT": {
                    actions: ["resetErrors"],
                    target: "validating"
                }
            },
            states: {
                idle: {},
                show_errors: {}, // Показ ошибок после валидации
            },
        },
        "validating": {
            invoke: {
                id: "validateForm",
                src: "validateForm"
            },
            on: {
                "VALID": {
                    target: "sending",
                },
                "INVALID": {
                    actions: ["saveErrors"],
                    target: "filling.show_errors"
                }
            }
        },
        "sending": {
            invoke: {
                id: "sendForm",
                src: "sendForm"
            },
            on: {
                "SENT": {
                    target: "success"
                },
                "NOT_SENT": {
                    target: "filling"
                }
            }
        },
        "success": {
            entry: ["resetData"],
            on: {
                "ONE_MORE": {
                    target: "loading"
                }
            }
        },
    }
}, {
    actions: {
        "saveEntries": assign({
            "entries": (ctx, message) => message.data,
            "currentUser": (ctx, message) => message.data[0].id,
        }),
        "setUser": assign({
            "currentUser": (ctx, message) => message.data
        }),
        "saveResident": assign({
            "resident": (ctx, message) => message.data
        }),
        "saveEmail": assign({
            "email": (ctx, message) => message.data
        }),
        "saveTel": assign({
            "tel": (ctx, message) => message.data
        }),
        "saveTermsState": assign({
            "terms": (ctx) => !ctx.terms
        }),
        "saveProcState": assign({
            "processing": (ctx) => !ctx.processing
        }),
        "saveErrors": assign({
            "emailError": (ctx, message) => message.data.emailError,
            "telError": (ctx, message) => message.data.telError,
            "termsError": (ctx, message) => message.data.termsError,
            "processingError": (ctx, message) => message.data.processingError,
        }),
        "resetErrors": assign({
            emailError: "",
            telError: "",
            termsError: "",
            processingError: ""
        }),
        "resetData": assign({
            "entries": [],
            "currentUser": undefined,
            "email": "",
            "tel": "",
            "resident": "fiz",
            "terms": false,
            "processing": false,
        }),
        "scrollTop": () => window.scrollTo(0, 0)
    },
    services: {
        "fetchData": () => {
            return function (send) {
                fetch("/api/entries", {method: "GET"})
                    .then(response => response.json())
                    .then(response =>
                        send({"type": "DONE", data: response})
                    );
            };
        },
        "validateForm": (ctx) => {
            return function (send) {
                let errors = {
                    emailError: "",
                    telError: "",
                    termsError: "",
                    processingError: ""
                };

                if (ctx.email === "") {
                    errors.emailError = "Заполните поле Электронная почта";
                }
                if (ctx.tel === "") {
                    errors.telError = "Заполните поле Телефон";
                }
                if (ctx.terms === false) {
                    errors.termsError = "Вы должны согласиться с условиями предоставления услуги";
                }
                if (ctx.processing === false) {
                    errors.processingError = "Вы должны согласиться на обработку персональных данных";
                }

                let haveErrors = Object.values(errors).some(el => el !== "");

                if (haveErrors) {
                    send({
                        type: "INVALID",
                        data: errors
                    })
                } else {
                    send({type: "VALID"})
                }
            };
        },
        "sendForm": (ctx) => {
            return function (send) {
                let FD = new FormData();
                FD.append("user", ctx.currentUser);
                FD.append("email", ctx.email);
                FD.append("tel", ctx.tel);
                FD.append("resident", ctx.resident);

                console.log(FD.values());

                fetch("/api/new-appointment", {
                    method: "POST",
                    body: FD
                })
                    .then(response => response.json())
                    .then(response => {
                        response.success && send({type: "SENT"});
                    });
            };
        }
    }
});