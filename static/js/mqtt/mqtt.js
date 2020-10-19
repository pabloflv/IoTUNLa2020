var ctx = document.getElementById('my_chart').getContext('2d');
var ctx2 = document.getElementById('my_chart2').getContext('2d');
var myChart = new Chart(ctx, {
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
var myChart2 = new Chart(ctx2, {
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

function agregarValor(chart, etiqueta, valor) {
    if(chart.data.datasets[0].data.length ==40){
        chart.data.datasets[0].data.shift();
    }
    
    chart.data.datasets[0].data.push(valor);
    
    chart.update();
}

const options = {
    connectTimeout: 1000,
    // Authentication
    clientId: 'mqttjs_bcbc4f2991'+ Math.floor((Math.random() * 1000000) + 1),
    username: '',
    password: '',
    keepalive: 60,
    clean: true,
}

// WebSocket connect url
const WebSocket_URL = 'ws://35.199.99.14:8083/mqtt'
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
})

client.on('message', (topic, message) => {
    console.log('Msg from topic: ', topic, ' ----> ', message.toString());
    
    
    var splitted = message.toString().split(",");
    
    var temp = splitted[0];
    var hum = splitted[1];
    var switch1 = splitted[2];
    var switch2 = splitted[3];
    agregarValor(myChart, "2", splitted[0]);
    agregarValor(myChart2, "2", splitted[1]);
    $("#display_hum").html(hum);
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
}
/*
window.setInterval(function() {
    agregarValor(myChart, "2", myChart.data.datasets[0].data[myChart.data.datasets[0].data.length - 1]);
    //agregarValor(myChart2, "2", splitted[1]);
}, 500);*/
