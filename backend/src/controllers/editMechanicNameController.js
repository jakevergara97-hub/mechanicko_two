import { editMechanicName as editMechanicNameService } from "../services/editMechanicNameService.js";

export const editMechanicName = async (req, res) => {
    try{
        const data = await editMechanicNameService(req.body);

        return res.status(200).json(data);

    } catch(error) {
        return res.status(error.status || 500).json({
            error: error.message
        })
    }
}