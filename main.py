from flask import Flask, render_template, jsonify, request
import paho.mqtt.client as mqtt
import jsons, random

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

if __name__ == '__main__':
    random.seed(10)
    app.run()