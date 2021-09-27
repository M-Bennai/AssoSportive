import gymnasesDAO from "../dao/gymnaseDAO.js";

export default class GymnasesController {
  static async apiGetGymnases(req, res, next) {
    const gymnasesPerPage = req.query.gymnasesPerPage
      ? parseInt(req.query.gymnasesPerPage, 10)
      : 20;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;

    let filters = {};
    if (req.query.nom) {
      filters.nom = req.query.nom;
    } else if (req.query.adresse) {
      filters.adresse = req.query.adresse;
    } else if (req.query.ville) {
      filters.ville = req.query.ville;
    }

    const { gymnasesList, totalNumGymnases } = await gymnasesDAO.getGymnases({
      filters,
      page,
      gymnasesPerPage,
    });

    let response = {
      gymnases: gymnasesList,
      page: page,
      filters: filters,
      entries_per_page: gymnasesPerPage,
      total_results: totalNumGymnases,
    };
    res.json(response);
  }
}
