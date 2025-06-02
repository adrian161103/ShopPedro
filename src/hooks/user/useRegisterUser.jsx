import { useState } from 'react'
function useRegisterUser() {
    const[error, setError] = useState();
    const initialUrl = 	import.meta.env.VITE_API_URL;

    const registerUser = async (formData) => {
        try {
            const response = await fetch(`${initialUrl}/user/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("token", data.token);
                setError(null);
                return true;
            } else {
                console.error(response.statusText);
                setError(response.statusText);
                return false;
            }
        } catch (error) {
            console.error("Error en la solicitud:",error);
            setError(error.message);
            return false;
        }
                 }
                 return { registerUser, error };
 
}


export default useRegisterUser;