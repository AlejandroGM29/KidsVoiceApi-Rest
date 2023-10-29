import { pool } from "../db.js";

export const getFolders = async (req, res) => {
  try {
    const [result] = await pool.query("CALL BuscarCarpetas()");
    const foldersData = result[0];
    res.json(foldersData);
  } catch (error) {
    console.error("Error al obtener las carpetas:", error);
    res.status(500).send("Error interno del servidor");
  }
};

export const getFolder = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("CALL BuscarCarpetaPorID(?)", [id]);

    if (rows.length <= 0) {
      return res.status(404).json({
        message: "No se encontró ninguna carpeta",
      });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener la carpeta:", error);
    res.status(500).send("Error interno del servidor");
  }
};

export const createFolder = async (req, res) => {
  try {
    const { nombre, descripcion, foto, idUsuarioPropietario, tipo } = req.body;
    const [rows] = await pool.query("CALL InsertarCarpeta(?,?,?,?,?)", [
      nombre,
      descripcion,
      foto,
      idUsuarioPropietario,
      tipo,
    ]);

    res.send({
      id: rows.insertId,
      nombre,
      descripcion,
      foto,
      tipo,
    });
  } catch (error) {
    console.error("Error al crear la carpeta:", error);
    res.status(500).send("Error interno del servidor");
  }
};

export const deleteFolder = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query("CALL EliminarCarpetaPorID(?)", [id]);

    if (result.affectedRows <= 0) {
      return res.status(404).json({
        message: "Carpeta no encontrada",
      });
    }

    res.sendStatus(204);
  } catch (error) {
    console.error("Error al eliminar la carpeta:", error);
    res.status(500).send("Error interno del servidor");
  }
};

export const updateFolder = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, foto, tipo } = req.body;

    const [result] = await pool.query("CALL ActualizarCarpetaPorID(?,?,?,?,?)", [
      id,
      nombre,
      descripcion,
      foto,
      tipo,
    ]);

    if (result.affectedRows <= 0) {
      return res.status(404).json({
        message: "Carpeta no encontrada",
      });
    }

    const [selectResult] = await pool.query("CALL BuscarCarpetaPorID(?)", [id]);

    if (selectResult.length > 0) {
      res.send(selectResult[0]); // Devuelve los datos actualizados
    } else {
      res.status(404).send("No se encontró ninguna carpeta después de la actualización.");
    }
  } catch (error) {
    console.error("Error al actualizar la carpeta:", error);
    res.status(500).send("Error interno del servidor");
  }
};
