import { createContext, useState, useContext } from "react";

export const DoctorDataContext = createContext();

export const DoctorContext = ({ children }) => {
    const [doctor, setDoctor] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateDoctor = (doctor) => {    
        setDoctor(doctor);
    }

    const value = {
        doctor,
        setDoctor,
        updateDoctor,
        isLoading,
        setIsLoading,
        error,
        setError,
    };

    return (
        <DoctorDataContext.Provider value={value}>
            {children}
        </DoctorDataContext.Provider>
    );
}

export default DoctorContext;