import { getCarBrands as getCarBrandsService } from "../services/getCarBrandsService.js"

export const getCarBrands = async(req,res) => {
    try {
        const data = await getCarBrandsService();

        return res.status(200).json(data);

    } catch(error) {
        return res.status(error.status || 500).json({
            error: error.message
        });
    }
}