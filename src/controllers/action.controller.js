import { validationResult } from "express-validator";
import { pool } from "../db.js";

export const getActions = async (req, res) => {
  try {
    const [result] = await pool.query("CALL BuscarAcciones()");
    const actionsData = result[0];
    res.json(actionsData);
  } catch (error) {
    console.error("Error al obtener las acciones:", error);
    res.status(500).send("Error interno del servidor");
  }
};

export const getAction = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("CALL BuscarAccionPorID(?)", [id]);

    if (rows.length <= 0) {
      return res.status(404).json({
        message: "No se encontró ninguna acción",
      });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener la acción:", error);
    res.status(500).send("Error interno del servidor");
  }
};

export const createAction = async (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    try {
      const { nombre, descripcion, foto, audio, idUsuarioCreador, idCarpeta } =
        req.body;
      const [rows] = await pool.query("CALL CrearAccion(?,?,?,?,?,?)", [
        nombre,
        descripcion,
        foto,
        audio,
        idUsuarioCreador,
        idCarpeta,
      ]);

      res.send({
        id: rows.insertId,
        nombre,
        descripcion,
        foto,
        audio,
      });
    } catch (error) {
      console.error("Error al crear la acción:", error);
      res.status(500).send("Error interno del servidor");
    }
  } else {
    res.json(result);
  }
};

export const deleteActions = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query("CALL EliminarAccionPorID(?)", [id]);

    if (result.affectedRows <= 0) {
      return res.status(404).json({
        message: "Acción no encontrada",
      });
    }

    res.sendStatus(204);
  } catch (error) {
    console.error("Error al eliminar la acción:", error);
    res.status(500).send("Error interno del servidor");
  }
};

export const updateActions = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, foto, audio, idUsuarioCreador, idCarpeta } =
      req.body;

    const [result] = await pool.query(
      "CALL ActualizarAccionPorID(?,?,?,?,?,?)",
      [id, nombre, descripcion, foto, audio, idUsuarioCreador, idCarpeta]
    );

    if (result.affectedRows <= 0) {
      return res.status(404).json({
        message: "Acción no encontrada",
      });
    }

    const [selectResult] = await pool.query("CALL BuscarAccionPorID(?)", [id]);

    if (selectResult.length > 0) {
      res.send(selectResult[0]); // Devuelve los datos actualizados
    } else {
      res
        .status(404)
        .send("No se encontró ninguna acción después de la actualización.");
    }
  } catch (error) {
    console.error("Error al actualizar la acción:", error);
    res.status(500).send("Error interno del servidor");
  }
};
