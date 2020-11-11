var ctx = document.getElementById('chart_temp').getContext('2d');
var ctx2 = document.getElementById('chart_aire').getContext('2d');
var chart_temp = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['|','|', '|', '|','|', '|', '|','|', '|', '|','|', '|','|','|', '|', '|','|', '|', '|','|', '|', '|','|', '|', '|','|', '|', '|','|', '|', '|','|', '|', '|', '|', '|', '|', '|', '|', '|'],
        datasets: [{
            label: '° C',
            data: ['0', '0','0', '0', '0', '0','0', '0','0', '0', '0', '0','0', '0','0', '0', '0', '0','0', '0','0', '0','0', '0','0', '0','0', '0','0', '0','0', '0','0', '0','0', '0',],
            backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: [
            'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
var chart_aire = new Chart(ctx2, {
    type: 'line',
    data: {
        labels: ['|','|', '|', '|','|', '|', '|','|', '|', '|','|', '|','|','|', '|', '|','|', '|', '|','|', '|', '|','|', '|', '|','|', '|', '|','|', '|', '|','|', '|', '|', '|', '|', '|', '|', '|', '|'],
        datasets: [{
            label: '%',
            data: ['0', '0','0', '0', '0', '0','0', '0','0', '0', '0', '0','0', '0','0', '0', '0', '0','0', '0','0', '0','0', '0','0', '0','0', '0','0', '0','0', '0','0', '0','0', '0',],
            backgroundColor: [
            'rgba(30, 170, 132, 0.2)',
            ],
            borderColor: [
            'rgba(30, 170, 132, 1)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

function actualizarCuadro(chart, etiqueta, arrValor) {
    for (i = 0; i < arrValor.length && i < 36; i++) {
        chart.data.datasets[0].data.shift();
        chart.data.datasets[0].data.push(arrValor[i]._Dato__dato);
    }
    
    if (i < 36) {
        for (i = i; i < 36; i++) {
            chart.data.datasets[0].data.shift();
            chart.data.datasets[0].data.push(0);
        }
    }
    
    chart.update();
}

function actualizarDatos() { 
    var display_temp = document.getElementById('display_temp');
    var display_aire = document.getElementById('display_aire');
    
    $.ajax({
        type: "POST",
        url: "/api_rest/getUpdatedInfoOnTopic",
        data: JSON.stringify({ topicName: currentAulaTopic, tipo: 'Temperatura', }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data) {
            if (data.length > 0) {
                display_temp.firstChild.data = data[0]._Dato__dato;
                actualizarCuadro(chart_temp, "2", data);
            }
            else {
                display_temp.firstChild.data = '--';
                actualizarCuadro(chart_temp, "2", data);
            }
        },
        error: function(errMsg) {/*alert(errMsg);*/}
    });
    
    $.ajax({
        type: "POST",
        url: "/api_rest/getUpdatedInfoOnTopic",
        data: JSON.stringify({ topicName: currentAulaTopic, tipo: 'Aire', }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data) {
            if (data.length > 0) {
                display_aire.firstChild.data = data[0]._Dato__dato;
                actualizarCuadro(chart_aire, "2", data);
            }
            else {
                display_aire.firstChild.data = '--';
                actualizarCuadro(chart_aire, "2", data);
            }
        },
        error: function(errMsg) {/*alert(errMsg);*/}
    });
}

window.setInterval(function() {
    actualizarDatos();
}, 4000);

/*const options = {
    connectTimeout: 1000,
    // Authentication
    clientId: 'mqttjs_bcbc4f2991'+ Math.floor((Math.random() * 1000000) + 1),
    username: '',
    password: '',
    keepalive: 60,
    clean: true,
}*/

// WebSocket connect url
/*const WebSocket_URL = 'ws://35.199.99.14:8083/mqtt'
const client = mqtt.connect(WebSocket_URL, options)

var device_topic = 'sensores&actuadores';
client.on('connect', () => {
    console.log('Connect success');
    
    client.subscribe(device_topic, { qos: 0 }, (error) => {
        if(error){
            console.log("Error at subscribe");
        }else{
            console.log("Subscribe ok: "+device_topic);
        }
        
    })
})*/

/*client.on('message', (topic, message) => {
    console.log('Msg from topic: ', topic, ' ----> ', message.toString());
    
    
    var splitted = message.toString().split(",");
    
    var temp = splitted[0];
    var hum = splitted[1];
    var switch1 = splitted[2];
    var switch2 = splitted[3];
    agregarValor(myChart, "2", splitted[0]);
    agregarValor(myChart2, "2", splitted[1]);
    $("#display_aire").html(hum);
    $("#display_temp").html(temp);
    
    document.getElementById('display_slider').value = splitted[4];
    
    if(switch1 == "1"){
        $("#display_sw1").prop('checked', true);
    }else{
        $("#display_sw1").prop('checked',"");
    }
    
    if(switch2 == "1"){
        $("#display_sw2").prop('checked', true);
    }else{
        $("#display_sw2").prop('checked',"" );
    }
})

client.on('reconnect', (error) => {
    console.log('reconnecting:', error);
})

client.on('error', (error) => {
    console.log('Connect Error:', error);
})

function sw1_change(){
    if ($('#display_sw1').is(":checked"))
    {
        client.publish(device_topic + 'actions/sw1',"1");
    }else{
        client.publish(device_topic + 'actions/sw1',"0");
    }
}

function sw2_change(){
    if ($('#display_sw2').is(":checked"))
    {
        client.publish(device_topic + 'actions/sw2',"1");
    }else{
        client.publish(device_topic + 'actions/sw2',"0");
    }
}

function slider_change(){
    value = $('#display_slider').val();
    client.publish(device_topic + 'actions/slider',value);
}*/
