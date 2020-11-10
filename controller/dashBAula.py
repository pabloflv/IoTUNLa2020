from flask import render_template, jsonify, request, Blueprint
import jsons, random

from dao import daoAula
from dao import daoEdificio

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

    dictRand = { 'temp': random.randint(24, 36), 'CO2ppm': random.randint(400, 800), }

    return jsonify(dictRand)