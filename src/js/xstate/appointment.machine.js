import {assign, createMachine} from "xstate";

export const appointmentMachine = createMachine({
    id: "appointment",
    context: {
        entries: [],
        currentEntry: undefined,
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
        "loading": { // Loading data from account
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
        "loading_error": {
            on: {
                "retry": {
                    target: "loading"
                }
            }
        },
        "filling": { // Got the data and ready to fill
            entry: "scrollTop",
            initial: "idle",
            on: {
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
                show_errors: {},
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
            "entries": (ctx, message) => message.data
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
            "currentEntry": undefined,
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
        "sendForm": () => {
            return function (send) {
                fetch("/api/new-appointment", {
                    method: "POST",

                })
                    .then(response => response.json())
                    .then(response => {
                        response.success && send({type: "SENT"});
                    });
            };
        }
    }
});