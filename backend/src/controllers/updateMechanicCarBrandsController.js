import { updateMechanicCarBrands as updateMechanicCarBrandsService } from "../services/updateMechanicCarBrandsService.js";

export const updateMechanicCarBrands = async (req, res) => {
    const { id } = req.params;
    try{
        const data = await updateMechanicCarBrandsService(id, req.body)

        return res.status(201).json(data);

    }catch(error){
        return res.status(error.status || 500).json({
            error: error.message
        })
    }
}