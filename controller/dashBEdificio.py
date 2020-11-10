from flask import render_template, jsonify, Blueprint
import jsons

from dao import daoEdificio

dashBEdificio = Blueprint('dashBEdificio', __name__)

@dashBEdificio.route('/', methods = ['GET'])
def homePage():
    return render_template('dashBTopics.html', pageTitle='UNLa IoT')

@dashBEdificio.route('/api_rest/getAllTopics', methods = ['GET'])
def getAllTopics():
    dictEdificio = daoEdificio.getAllEdificio()
    retLst = list()

    for idEdificio in dictEdificio:
        retLst.append(jsons.dump(dictEdificio[idEdificio]))

    return jsonify(jsons.dump(retLst))