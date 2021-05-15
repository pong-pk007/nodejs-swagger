const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const low = require("lowdb");
const swaggerUI = require("swagger-ui-express")
const swaggerJsDoc = require("swagger-jsdoc");
const booksRouter = require("./routes/books")


const PORT = process.env.PORT || 8080;

const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);

db.defaults({ books: [] }).write()

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Library API Template",
            version: "1.0.0",
            description: "A Simple Express Library API Template Create By <a href='https://ipongdev.web.app'>I'Pong DEV.</a>"
        },
        servers: [
            {
                url: "http://localhost:8080"
            }
        ]
    },
    apis: ["./routes/*.js"]
}

const specs = swaggerJsDoc(options)

const app = express()

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.db = db;


app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

app.use("/books", booksRouter);


app.listen(PORT, () => console.log(`The Server is running on port ${PORT} and url is http://localhost:8080`))

