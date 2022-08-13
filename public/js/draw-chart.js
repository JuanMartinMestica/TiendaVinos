const redWine = [
    'rgb(137, 0, 0)',
    'rgb(74, 0, 0)',
    'rgb(200, 0, 0)'
];

const getWineComposition = async() => {
    let compositionValues = [];
    let grapeNames = [];

    //getting wine Name to get composition
    let wineName = window.location.pathname.slice(6);

    //fetch wine information
    response = await fetch(`/getComposition/${wineName}`);
    response = await response.json();

    response.forEach((compositionObject) => {
        compositionValues.push(compositionObject.porcentaje);
        grapeNames.push(compositionObject.nombrecepa);
    });

    drawChart(compositionValues, redWine, grapeNames);

}


const drawChart = (compositionValues, colorPallete, grapeNames) => {

    //sets data values
    data = {
        labels: grapeNames,
        datasets: [{
            label: `Composición: ${response.name}`,
            data: compositionValues,
            backgroundColor: colorPallete,
            hoverOffset: 3,
            spacing: 0,
            borderColor: 'rgba(0, 0, 0, 0.1)'
        }]
    };


    const config = {
        type: 'doughnut',
        data: data,
    };
    const myChart = new Chart(
        document.getElementById('myChart'),
        config
    );


}



window.onload = getWineComposition();