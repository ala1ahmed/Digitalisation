const swaggerOptions = {
    swaggerDefinition: {
        info: {
            version: "1.0.0",
            title: "Meeting API",
            description: "Meeting API Information",
            contact: {
                name: "Rotaract ERP"
            },
            servers: ["http://localhost:5003"]
        }
    },
    apis: ["src/routes/*.js"]
};



exports.swaggerOptions = swaggerOptions;