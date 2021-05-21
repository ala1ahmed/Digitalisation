const swaggerOptions = {
    swaggerDefinition: {
        info: {
            version: "1.0.0",
            title: "Club API",
            description: "Club API Information",
            contact: {
                name: "Rotaract ERP"
            },
            servers: ["http://localhost:5001"]
        }
    },
    apis: ["src/routes/*.js"]
};



exports.swaggerOptions = swaggerOptions;