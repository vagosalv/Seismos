drawChart()

//orizoume thn sunarthsh
async function drawChart() {
    const datapoints = await getData();

    const data = {
        labels: datapoints.TIMESTAMP,
        datasets: [{
                label: 'FF-OUT',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: datapoints.FF,
            },
            {
                label: 'BESSEL-OUT',
                borderColor: 'rgb(555, 199, 132)',
                backgroundColor: 'rgb(555, 199, 132)',
                data: datapoints.BESSEL,
            },
            {
                label: 'NO-FILTER',
                borderColor: 'rgb(124,252,0)',
                backgroundColor: 'rgb(124,252,0)',
                data: datapoints.NOFILTER,
            }

        ]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
        }
    };

    const myChart = new Chart(
        document.getElementById('myChart'),
        config
    );

};




/*diavazei to arxeio csv kai ksexwrizei ta dedomena */
async function getData() {
    const FF = []; //exei to FF-OUT
    const BESSEL = []; //exei to Bessel-out
    const NOFILTER = []; //exei to nofilter
    const TIMESTAMP = []; //exei to time stamp

    const url = 'seismic-station-phd1-20221101_14_40.csv';
    const responce = await fetch(url);
    const tabledata = await responce.text();
    //console.log(tabledata);
    
    const table = tabledata.split('\n'); //xwrizoume ta dedomena
    //console.log(table);
    
    table.forEach(row => {
        const column = row.split(','); //spame ta dedomena se grammes
        //console.log(column);
        const ff = column[0]; //apomononoume to FF-out
        const bessel = column[1]; //apomononoume to bessel-out
        const nofilter = column[2]; // apomononoume to no filter
        const timestamp = column[3]; // apomononoume to timestamp
        //console.log(column[3]);
        
        //vazoume tis times stis metavlites
        FF.push(ff);
        BESSEL.push(bessel);
        NOFILTER.push(nofilter);
        TIMESTAMP.push(timestamp);
    });

    //ksekinaei ta dedomena apo thn arxh
    FF.shift();
    BESSEL.shift();
    NOFILTER.shift();
    TIMESTAMP.shift();

    const labelname1 = 'a';
    const labelname2 = 'a';
    const labelname3 = 'a';

    //elegxos an pernane oi times
    //console.log(FF);
    //console.log(BESSEL);
    //console.log(NOFILTER);
    //console.log(TIMESTAMP);
    return {
        FF,
        BESSEL,
        NOFILTER,
        TIMESTAMP,
        labelname1,
        labelname2,
        labelname3
    }
};