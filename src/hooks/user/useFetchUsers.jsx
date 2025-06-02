import { useState } from "react";

function useFetchUser() {
  const [error, setError] = useState();
  const [done, setDone] = useState();
  const initialUrl = 	import.meta.env.VITE_API_URL;

  const fetchUser = async () => {
    try {
      const response = await fetch(`${initialUrl}/user/get`);

      if (response.ok) {
        const users = await response.json();
        console.log(users);
        //sirve para confirmar la finalizacion de la operacion el true y el return
        //done nos sirve para saber si la operacion ya termino 
        setDone(true);
        return users;
      } 
      else {
        console.error();
        (response.statusText);
        setError(response.statusText);
        setDone(false);
        //retornamos un array vacio(con el fetch hacemos un map, si no hay ningun user no se puede hacer el map)
        return [];
      }
    } catch (error) {
    console.error("Error en la solicitud:",error);
    setError(error);
    }
      };
    
    //re fetch pide que se vuelva a hacer la peticion en caso de que haya un error
    const reFetch = async () => {
        setDone(false);
        setError(null);
        await fetchUser();
      };
      return { fetchUser, error, done, reFetch };
    }

export default useFetchUser ;
