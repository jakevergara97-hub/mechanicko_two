import { updateMechanicServices as updateMechanicServicesService } from "../services/updateMechanicServicesService.js";

export const updateMechanicServices = async (req, res) => {
    console.log('UPDATE MECHANIC SERVICES CONTROLLER HIT');
    const { id } = req.params;
    // console.log(id);
    try{
        const data = await updateMechanicServicesService(id, req.body);

        return res.status(201).json(data);

    } catch(error) {
        return res.status(error.status || 500).json({
            error: error.message
        })
    }
}