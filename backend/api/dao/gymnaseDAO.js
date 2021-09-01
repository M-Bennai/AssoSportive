let gymnases

export default class gymnasesDAO {
    static async injectDB(conn) {
        if (gymnases) {
            return
        }
        try {
            gymnases = await conn.db(process.env.GYM_NS).collection("gymnases");
        } catch (e) {
            `Unable to etablish a collection`
        }
    }

    static async getGymnases({
        filters = null,
        page = 0,
        gymnasesPerPage = 20,
    } = {}) /*{
        let query
        if(filters) {
            if ("nom" in filters) {
                query = {$text: { $search: filters["nom"]}}
            } else if ("")
        }
    }*/
}