import { useState, useContext, useEffect } from "react";
import { CustomerLocationContext } from "../../context/CustomerLocationContext";
import { MechanicsInfoContext } from "../../context/MechanicsInfoContext";
import { getMechanic } from "../../services/getMechanicService";

export function MechanicsPagesNavigator({pages}) {
    const { location } = useContext(CustomerLocationContext);
    const { setMechanics, setError, setIsClicked } = useContext(MechanicsInfoContext);
    const { city, barangay } = location;
    const [page, setPage] = useState(1);

    useEffect(() => {
        const getMechanicsPerPage = async() => {
            try{
                const data = await getMechanic({city, barangay}, page);
                console.log(data)
                setMechanics(data);
                setIsClicked(true);
            }catch(error){
                setError(error.message);
            }
        }
        getMechanicsPerPage();
    },[page]);

    const handlePrevious = async () => {
        if(page === 1) {
            return;
        }
        setPage((prevData) => prevData = prevData - 1);
    }

    const handleNext = async () => {
        if(page === pages.length){
            return;
        }
        setPage((prevData) => prevData = prevData + 1);
    }

    return (
        <>
            <button type="button" onClick={handlePrevious}>Previous</button>
            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => setPage(page)}
                >
                    {page}
                </button>
            ))}
            <button type="button" onClick={handleNext}>Next</button>
        </>
    )
}