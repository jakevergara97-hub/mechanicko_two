import { editMechanicNumber as editMechanicNumberService } from "../services/editMechanicNumberService.js";

export const editMechanicNumber = async (req,res) => {
    try{
        const data = await editMechanicNumberService(req.body);

        return res.status(200).json(data);

    }catch(error) {
        return res.status(error.status || 500).json({
            error: error.message
        });
    }
}