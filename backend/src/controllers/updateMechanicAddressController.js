import { updateMechanicAddress as updateMechanicAddressService } from "../services/updateMechanicAddressService.js";

export const updateMechanicAddress = async (req, res) => {
    const { id } = req.params;
    try{
        const data = await updateMechanicAddressService(id, req.body);

        return res.status(201).json(data);

    }catch(error) {
        return res.status(error.status || 500).json({
            error: error.message
        })
    }
}