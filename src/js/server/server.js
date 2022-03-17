import {createServer} from "miragejs";

createServer({
    routes() {
        this.namespace = "api";

        this.get("/entries",
            () =>
                ([
                    {
                        "id": 1,
                        "name": "Иванова Елена Андреевна",
                        "email": "",
                        "phone": "+7 (987) 123-45-67"
                    },
                    {
                        "id": 2,
                        "name": "Константинопольская Аполлинария Салим-кызы",
                        "email": "apollo17@inbox.org",
                        "phone": ""
                    },

                ])
        );

        this.post("/new-appointment", ()=>
            ({
                "success": true,
            })
        )
    }
});