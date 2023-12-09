import { env } from "../settings/envs.js"
import { connect } from "mongoose"

export const startConnection = async () => {
    try {
        const db = await connect(env.MONGO_URI)
        console.log(`DB conectada a ${db.connection.name}`)
    } catch (error) {
        console.log(error)

    }
}
