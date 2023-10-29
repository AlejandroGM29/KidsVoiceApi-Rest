import {createPool} from 'mysql2/promise'

import { DB_HOST,DB_USER,DB_Password,DB_Database,DB_Port } from '../../API/Parcial 2/EnviaandoFormularioArchivo/config.js/index.js'

export const pool = createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_Password,
    port:DB_Port,
    database:DB_Database
})