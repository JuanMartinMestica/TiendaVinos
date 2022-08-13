const { pool } = require('../models/database')


exports.bodegas = async(req, res) => {

    try {

        //Rendering page with title and lastest wines
        res.render('bodegas', { title: 'ArgenWines - Bodegas' });

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message || 'Error' })
    }

}


exports.obtenerBodega = async(req, res) => {

    try {

        const nombreBodega = req.params.nombreBodega;

        let bodegaSeleccionada = await pool.query(`SELECT * FROM bodega WHERE nombrebodega LIKE '${nombreBodega}%' `)

        bodegaSeleccionada = bodegaSeleccionada.rows[0]

        let vinosBodega = await pool.query(`SELECT * FROM vino WHERE nombre_bodega LIKE '${nombreBodega}%' `)

        vinosBodega = vinosBodega.rows

        //Rendering page with title and lastest wines
        res.render('bodega', { title: 'ArgenWines - Bodegas', bodegaSeleccionada, vinosBodega });


    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message || 'Error' })
    }

}