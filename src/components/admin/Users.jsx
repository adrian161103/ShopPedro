import { useCallback, useEffect, useState } from "react";
import useFetchUser from "../../hooks/user/useFetchUsers.jsx";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

function Users() {
  const [users, setUsers] = useState([]);
  const { fetchUser, error, done, reFetch } = useFetchUser();
  const navigate = useNavigate();

  const HandleGoBack = () => {
    setTimeout(() => {
      navigate(-1);
    }, 500);
  };

  const fetchUserCallback = useCallback(async () => {
    try {
      const data = await fetchUser();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, [fetchUser]);

  useEffect(() => {
    if (!done) {
      fetchUserCallback();
    }
    //no haga un loop infinito con el useEffect
  }, [done, fetchUserCallback]);

  if (error) return <p>Error al cargar usuarios: {error.message}</p>;

  if (!done) return <p>Cargando usuarios...</p>;

  return (
    <Box>
      <h2>quieres volver a atras?</h2>
      <Button onClick={HandleGoBack}>Volver atras</Button>
      <h2>Usuarios</h2>
      {!users ? (
        <p>No hay usuarios disponibles.</p>
      ) : (
        <TableContainer sx={{ background: "none" }} component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" style={{ color: "white" }}>
                  Nombre
                </TableCell>
                <TableCell style={{ color: "white" }} align="center">
                  Apellido
                </TableCell>
                <TableCell style={{ color: "white" }} align="center">
                  Email
                </TableCell>
                <TableCell style={{ color: "white" }} align="center">
                  Edad
                </TableCell>
                <TableCell style={{ color: "white" }} align="center">
                  Fecha de Creacion
                </TableCell>
                <TableCell style={{ color: "white" }} align="center">
                  Roll
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, i) => (
                <TableRow
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    style={{ color: "white" }}
                    component="th"
                    scope="row"
                    align="center"
                  >
                    {user.name}
                  </TableCell>
                  <TableCell style={{ color: "white" }} align="center">
                    {user.lastName}
                  </TableCell>
                  <TableCell style={{ color: "white" }} align="center">
                    {user.email}
                  </TableCell>
                  <TableCell style={{ color: "white" }} align="center">
                    {user.age}
                  </TableCell>
                  <TableCell style={{ color: "white" }} align="center">
                    {new Date(user.registrationDate).toLocaleString("es-AR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </TableCell>
                  <TableCell style={{ color: "white" }} align="center">
                    {user.role}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Button style={{ marginTop: "20px" }} onClick={reFetch}>
        Recargar Usuarios
      </Button>
    </Box>
  );
}

export default Users;
