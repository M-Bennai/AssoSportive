let gymnases;

export default class gymnasesDAO {
  static async injectDB(conn) {
    if (gymnases) {
      return;
    }
    try {
      gymnases = await conn.db(process.env.GYM_NS).collection("gymnases");
    } catch (e) {
      `Unable to etablish a collection`;
    }
  }

  static async getGymnases({
    filters = null,
    page = 0,
    gymnasesPerPage = 20,
  } = {}) {
    let query;
    if (filters) {
      if ("NomGymnase" in filters) {
        query = { $text: { $search: filters["NomGymnase"] } };
      } else if ("Adresse" in filters) {
        query = { Adresse: { $eq: filters["Adresse"] } };
      } else if ("Ville" in filters) {
        query = { Ville: { $eq: filters["Ville"] } };
      }
    }

    let cursor;

    try {
      cursor = await gymnases.find(query);
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { gymnasesList: [], totalNumGymnases: 0 };
    }

    const displayCursor = cursor
      .limit(gymnasesPerPage)
      .skip(gymnasesPerPage * page);

    try {
      const gymnasesList = await displayCursor.toArray();
      const totalNumGymnases = await gymnases.countDocuments(query);
      return { gymnasesList, totalNumGymnases };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents`
      );
      return { gymnasesList: [], totalNumGymnases: 0 };
    }
  }
}
