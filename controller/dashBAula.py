from flask import render_template, jsonify, request, Blueprint
import jsons

from dao import daoEdificio, daoAula, daoDato

dashBAula = Blueprint('dashBAula', __name__)

@dashBAula.route('/devices', methods = ['GET'])
def devicesPage():
    return render_template('dashBDevice.html', pageTitle = 'UNLa IoT', topicID = request.args["id"])

@dashBAula.route('/api_rest/getAllAulaFromEdificio', methods = ['GET'])
def getAllAulaFromEdificio():
    edificio = daoEdificio.getEdificioWithAllAula(int(request.args["id"]))
    return jsonify(jsons.dump(edificio))

@dashBAula.route('/api_rest/getUpdatedInfoOnTopic', methods = ['POST'])
def getUpdatedInfoOnTopic():
    topicArray = request.get_json().get('topicName').split('/')
    tipo = request.get_json().get('tipo')
    retLst = list()

    edificio = daoEdificio.getEdificioByTopic(topicArray[0])
    aula = daoAula.getAulaByTopic(topicArray[0], topicArray[1])

    dictDato = daoDato.getLatestDatoFromAula(edificio.getId(), aula.getId(), tipo)

    for idDato in dictDato:
        retLst.append(jsons.dump(dictDato[idDato]))

    return jsonify(jsons.dump(retLst))