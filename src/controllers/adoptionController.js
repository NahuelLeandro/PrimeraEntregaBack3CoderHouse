import adoptionService from "../services/adoptionService.js";

class AdoptionController {
    async getAll(req, res, next) {
        try {
            const adoptions = await adoptionService.getAllAdoptions();
            res.json({ status: "success", payload: adoptions });
        } catch (err) {
            next(err);
        }
    }

    async getById(req, res, next) {
        try {
            const adoption = await adoptionService.getAdoptionById(req.params.aid);
            res.json({ status: "success", payload: adoption });
        } catch (err) {
            next(err);
        }
    }

    async create(req, res, next) {
        try {

            const adoption = await adoptionService.createAdoption(req.body);

            res.status(201).json({
                status: "success",
                payload: adoption
            });
        } catch (err) {
            next(err);
        }
    }

    async returnPet(req, res, next) {
        try {
            const result = await adoptionService.returnAdoption(req.params.aid);
            res.json({ status: "success", payload: result });
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            const deleted = await adoptionService.deleteAdoption(req.params.aid);
            res.json({ status: "success", payload: deleted });
        } catch (err) {
            next(err);
        }
    }
}

export default new AdoptionController();