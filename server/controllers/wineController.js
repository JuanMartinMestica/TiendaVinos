const { pool } = require("../models/database");

exports.homepage = async(req, res) => {

    try {
        //Wines in homepage
        const limitNumber = 6;

        //GET POPULAR WINES
        let wines = await pool.query(`SELECT * FROM vino LIMIT ${limitNumber}`)

        wines = wines.rows

        //Rendering page with title and lastest wines
        res.render('index', { title: 'ArgenWines - Home', wines });

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message || 'Error' })
    }

}



exports.getWine = async(req, res) => {

    try {

        const nombreVino = req.params.id;

        // Busca vino por nombre
        let vinoSeleccionado = await pool.query(`SELECT * FROM vino WHERE nombre_vino = '${nombreVino}'`)

        vinoSeleccionado = vinoSeleccionado.rows[0]

        //Rendering page with title and lastest wines
        res.render('wine', { title: `ArgenWines - ${nombreVino}`, vinoSeleccionado });

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message || 'Error' })
    }

}


exports.getComposition = async(req, res) => {

    try {
        const wineName = req.params.id;
        //db query with name
        let composition = await pool.query(`SELECT porcentaje, nombreCepa FROM uva WHERE nombrevino = '${wineName}'`)
        res.send(composition.rows);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message || 'Error' })
    }

}



exports.searchWine = async(req, res) => {

    const wineName = req.body.name.toLowerCase();

    let searchResult = await pool.query(`SELECT * FROM vino WHERE LOWER(nombre_vino) LIKE '%${wineName}%'`)

    res.json(searchResult.rows);
}