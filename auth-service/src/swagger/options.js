const swaggerOptions = {
    swaggerDefinition: {
        info: {
            version: "1.0.0",
            title: "Auth API",
            description: "Auth API Information",
            contact: {
                name: "Rotaract ERP"
            },
            servers: ["http://localhost:5000"]
        }
    },
    apis: ["src/routes/*.js"]
};



exports.swaggerOptions = swaggerOptions;