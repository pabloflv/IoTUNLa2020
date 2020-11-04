from flask import Flask, render_template, jsonify, request
import paho.mqtt.client as mqtt
from model.edificio import Edificio
from model.aula import Aula
import jsons, copy, random

app = Flask(__name__)

mapTopic = {}

def loadData():
    edificio = Edificio(1, "Jose Hernandez", [])
    mapTopic[edificio.getId()] = edificio
    edificio = Edificio(2, "Scalabrini Ortiz", [])
    mapTopic[edificio.getId()] = edificio

    mapTopic[1].getLstAula().append(Aula(1, "Aula 1", 1))
    mapTopic[1].getLstAula().append(Aula(2, "Aula 2", 1))
    mapTopic[1].getLstAula().append(Aula(3, "Aula 3", 1))

    mapTopic[2].getLstAula().append(Aula(1, "Aula 1", 2))
    mapTopic[2].getLstAula().append(Aula(2, "Aula 2", 2))

loadData()

@app.route('/', methods = ['GET'])
def homePage():
    return render_template('dashBTopics.html', pageTitle='UNLa IoT')

@app.route('/api_rest/getAllTopics', methods = ['GET'])
def getAllTopics():
    lstTopicCopy = []

    for topicID in mapTopic:
        newTopic = copy.copy(mapTopic[topicID])
        newTopic.setLstAula([])
        lstTopicCopy.append(newTopic)

    return jsonify(jsons.dump(lstTopicCopy))

@app.route('/devices', methods = ['GET'])
def devicesPage():
    return render_template('dashBDevice.html', pageTitle = 'UNLa IoT', topicID = request.args["id"])

@app.route('/api_rest/getAllAulaFromEdificio', methods = ['GET'])
def getAllAulaFromEdificio():
    return jsonify(jsons.dump(mapTopic[int(request.args["id"])]))

@app.route('/api_rest/getUpdatedInfoOnTopic', methods = ['POST'])
def getUpdatedInfoOnTopic():
    #topicName = request.get_json().get('topicName')
    #print(topicName.split('/')[1])
    dictRand = { 'temp': random.randint(24, 36), 'CO2ppm': random.randint(400, 800), }

    return jsonify(dictRand)

if __name__ == '__main__':
    random.seed(10)
    app.run()