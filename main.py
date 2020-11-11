from flask import Flask, render_template, jsonify, request
from flask_mqtt import Mqtt
import jsons, random, datetime, math

from dao import daoDato, daoAula

from controller.dashBEdificio import dashBEdificio
from controller.dashBAula import dashBAula
from controller.ctrlEdificio import ctrlEdificio
from controller.ctrlAula import ctrlAula

app = Flask(__name__)
app.register_blueprint(dashBEdificio)
app.register_blueprint(dashBAula)
app.register_blueprint(ctrlEdificio)
app.register_blueprint(ctrlAula)

app.config['MQTT_BROKER_URL'] = '35.199.99.14'
app.config['MQTT_BROKER_PORT'] = 1883
app.config['MQTT_CLIENT_ID'] = 'server-flask'
app.config['MQTT_USERNAME'] = ''
app.config['MQTT_PASSWORD'] = ''
app.config['MQTT_REFRESH_TIME'] = 1.0  # refresh time in seconds
mqtt = Mqtt(app)

@app.route('/test', methods = ['GET'])
def test():
    daoDato.getAllDatoFromAula(2, 5)

    return render_template('testGenDato.html')

@app.route('/api_rest/addDato', methods = ['POST'])
def addDato():
    topicName = request.get_json().get('topicName')
    topicArray = topicName.split('/')

    aula = daoAula.getAulaByTopic(topicArray[0], topicArray[1])
    return jsonify(jsons.dump(daoDato.addDato(request.get_json().get('tipo'), request.get_json().get('dato'), aula.getId())))

@mqtt.on_connect()
def handle_connect(client, userdata, flags, rc):
    mqtt.subscribe('UNLa/#')

@mqtt.on_message()
def handle_mqtt_message(client, userdata, message):
    topicArray = message.topic.split('/')
    if (topicArray[3] == "Temperatura" or topicArray[3] == "Aire"):
        if (not math.isnan(float(message.payload.decode()))):
            aula = daoAula.getAulaByTopic(topicArray[1], topicArray[2])
            daoDato.addDato(topicArray[3], message.payload.decode(), aula.getId())

if __name__ == '__main__':
    random.seed(10)
    app.run()