import { config } from "dotenv"

config()

export const env = {
    PORT: process.env.PORT || 4000,
    MAIL: process.env.MAIL,
    MAIL_PASSWORD: process.env.MAIL_PASSWORD,
    JWT_SECRET: process.env.JWT_SECRET || "secret",
    // Mongo
    MONGO_URI: process.env.MONGO_URI

}