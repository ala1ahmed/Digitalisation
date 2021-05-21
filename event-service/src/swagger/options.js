const swaggerOptions = {
    swaggerDefinition: {
        info: {
            version: "1.0.0",
            title: "Event API",
            description: "Event API Information",
            contact: {
                name: "Rotaract ERP"
            },
            servers: ["http://localhost:5002"]
        }
    },
    apis: ["src/routes/*.js"]
};



exports.swaggerOptions = swaggerOptions;