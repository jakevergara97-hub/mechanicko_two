import { getMechanic as getMechanicService } from "../services/getMechanicService.js";

export const getMechanic = async (req, res) => {
    // console.log("GET SERVICE HIT")
    const { page, limit } = req.query;
    // console.log(page);
    // console.log(limit);
    // console.log(req.params)
    try {
        const data = await getMechanicService(req.params, req.query);

        // const data = await getMechanicService({
        //     ...req.params,
        //     ...req.query
        // });

        return res.status(200).json(data);
    } catch(error) {
        return res.status(error.status || 500).json({
            error: error.message
        });
    }
}