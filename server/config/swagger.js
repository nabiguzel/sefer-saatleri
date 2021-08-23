const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

const options = {
    swaggerDefinition: {
        openapi: "3.0.3",
        info: {
            title: "Sefer Saatleri API",
            version: "1.0.0",
            description: "Bu API Sefer Saatleri Uygulaması için geliştirilmiştir.",
            contact: {
                name: "Nabi Güzel",
                url: "https://www.linkedin.com/in/nabiguzel",
                email: "nabiguzel@gmail.com",
            },
        },
        servers: [
            {
                url: "/api",
                description: "Development local server"
            },
        ]
    },
    apis: ["./server/routes/*.js", "./server/model/*.js"],
};

const specs = swaggerJSDoc(options);

exports.swaggerUiServe = swaggerUi.serve;
exports.swaggerUiSetup = swaggerUi.setup(specs);