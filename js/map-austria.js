var data = [
    ['at-wi', 0],
    ['at-vo', 1],
    ['at-bu', 2],
    ['at-st', 3],
    ['at-ka', 4],
    ['at-oo', 5],
    ['at-sz', 6],
    ['at-tr', 7],
    ['at-no', 8]
];

// Create the chart
Highcharts.mapChart('map-austria', {
    chart: {
        map: 'countries/at/at-all'
    },

    title: {
        text: 'Austria'
    },
    /*
    subtitle: {
        text: 'Source map: <a href="http://code.highcharts.com/mapdata/countries/at/at-all.js">Austria</a>'
    },

    mapNavigation: {
        enabled: true,
        buttonOptions: {
            verticalAlign: 'bottom'
        }
    },*/

    series: [{
        data: data,
        name: 'Random data',
        states: {
            hover: {
                color: '#00bda8'
            }
        },
        dataLabels: {
            enabled: true,
            format: '{point.name}'
        }
    }]
});

//current activated state in the map
let currentState = ''

$('.highcharts-point').click(function (event) {
    //remove active class form all states
    $('.highcharts-point').removeClass('mapActive');
    //set current state active
    $(event.target).addClass('mapActive');
    //get the classnames from the activated state to figure out which state is activated at the moment
    classnames = event.target.className.baseVal;
    let n = classnames.search("highcharts-name-");
    let start = n + 16;
    let end = classnames.search("highcharts-key");
    currentState = classnames.substring(start, end);

    console.log('current State: ', currentState);
})