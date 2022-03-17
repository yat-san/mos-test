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
                    },
                    {
                        "id": 2,
                        "name": "Константинопольская Аполлинария Салим-кызы",
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