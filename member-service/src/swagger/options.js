const swaggerOptions = {
    swaggerDefinition: {
        info: {
            version: "1.0.0",
            title: "Member API",
            description: "Member API Information",
            contact: {
                name: "Rotaract ERP"
            },
            servers: ["http://localhost:5004"]
        }
    },
    apis: ["src/routes/*.js"]
};



exports.swaggerOptions = swaggerOptions;