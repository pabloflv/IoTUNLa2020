
<!DOCTYPE html>
<html>
<head>
	<title>Panel de control</title>
	  <script src="https://unpkg.com/mqtt/dist/mqtt.min.js"></script>

	<script type="text/javascript">
function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

const options = {
  connectTimeout: 1000,
  // Authentication
  clientId: 'client_id_'+ Math.floor((Math.random() * 1000000) + 1),
  username: 'usuario',
  password: 'pass',
  keepalive: 60,
  clean: true,
}
function nroRandom(min, max) {
  return Math.random() * (max - min) + min;
}
// WebSocket connect url
const WebSocket_URL = 'ws://34.123.171.150:8083/mqtt';
const client = mqtt.connect(WebSocket_URL, options)



var device_topic = 'sensores&actuadores';
client.on('connect', () => {
  console.log('Connect success');
  
 
   
  

  
  }
    

 
);

client.on('reconnect', (error) => {
  console.log('reconnecting:', error);
})

client.on('error', (error) => {
  console.log('Connect Error:', error);
})

function slider_change(){
  if(document.getElementById('act1').checked)
  {var act1 = 1;}
else 
  {var act1 = 0;}
if(document.getElementById('act2').checked)
  {var act2 = 1;}
else 
  {var act2 = 0;}


  var string = document.getElementById('slider1').value+","+document.getElementById('slider2').value+","+act1+","+act2+","+document.getElementById('act3').value
client.publish("sensores&actuadores", string);

}
function actualizar(){
	location.reload(true);
}
//setInterval("actualizar()", 1000);
</script>
</head>
<body>
<h1>Panel de control del dashboard</h1>
<label>Sensor 1</label>
<input oninput="slider_change()" id="slider1" class="mdl-slider mdl-js-slider slider--colored-light-blue" type="range" min="0" max="254" value="0" tabindex="0" ></br>
<label>Sensor 2</label>
<input oninput="slider_change()" id="slider2" class="mdl-slider mdl-js-slider slider--colored-light-blue" type="range" min="0" max="254" value="0" tabindex="0" ></br>
<label>Actuador 1</label>
<input onchange="slider_change()" type="checkbox" id="act1">
<label>Actuador 2</label>
<input onchange="slider_change()" type="checkbox" id="act2">
                    
<label>Actuador 3</label>
<input oninput="slider_change()" id="act3" class="mdl-slider mdl-js-slider slider--colored-light-blue" type="range" min="0" max="254" value="0" tabindex="0" >
</body>
</html>