import { pool } from "../db.js";

export const getUsers = async (req, res) => {
    const [result] = await pool.query("CALL BuscarUsuarios()");
    
    // Extrae solo los datos de los usuarios del primer elemento del array de resultados
    const usersData = result[0];
  
    res.json(usersData);
  };
  
export const getUser = async (req, res) => {
  console.log(req.params.id);
  const [rows] = await pool.query("CALL BuscarUsuarioPorID(?)", [
    req.params.id,
  ]);
  if (rows.length <= 0)
    return res.status(404).json({
      message: "no se encontro ninguna accion",
    });
  res.json(rows[0]);
};

export const createUser = async (req, res) => {
  try {
    const { nombre, correo, tipoUsuario, contraseña } = req.body;

    const [rows] = await pool.query("CALL InsertarUsuario(?,?,?,?)", [
      nombre,
      correo,
      tipoUsuario,
      contraseña,
    ]);

    res.send({
      id: rows.insertId,
      nombre,
      correo,
      tipoUsuario,
    });
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    res.status(500).send("Error interno del servidor");
  }
};


export const deleteUsers = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query("CALL EliminarUsuarioPorID(?)", [id]);

    if (result.affectedRows <= 0) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    res.sendStatus(204);
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    res.status(500).send("Error interno del servidor");
  }
};


export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, correo, tipoUsuario, contraseña } = req.body;

    const [result] = await pool.query("CALL ActualizarUsuarioPorID(?,?,?,?,?)", [
      id,
      nombre,
      correo,
      tipoUsuario,
      contraseña,
    ]);

    if (result.affectedRows <= 0) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    res.sendStatus(204);
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    res.status(500).send("Error interno del servidor");
  }
};

