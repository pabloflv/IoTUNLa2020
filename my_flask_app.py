from flask import Flask, render_template
from flask_mqtt import Mqtt

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret'
app.config['MQTT_BROKER_URL'] = '35.199.99.14'
app.config['MQTT_BROKER_PORT'] = 1883
app.config['MQTT_USERNAME'] = ''
app.config['MQTT_PASSWORD'] = ''
app.config['MQTT_REFRESH_TIME'] = 1.0  # refresh time in seconds
mqtt = Mqtt(app)


@mqtt.on_connect()
def handle_connect(client, userdata, flags, rc):
    mqtt.subscribe('sensores&actuadores')
    
@mqtt.on_message()
def handle_mqtt_message(client, userdata, message):
    print("Mensaje MQTT: "+message.payload.decode());
    topico=message.topic
    mensaje=message.payload.decode()


@app.route("/")
def index():
    return render_template('dashboard.html')

@app.route("/nueva",methods=['GET', 'POST'])
def nueva():
    return render_template('nueva.html')

if __name__ == "__main__":
    app.run()
