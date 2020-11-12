from flask import render_template, jsonify, request, Blueprint
import jsons

from model.edificio import Edificio
from dao import daoEdificio

ctrlEdificio = Blueprint('ctrlEdificio', __name__)

@ctrlEdificio.route('/edificio/alta', methods=['GET'])
def paginaAltaEdificio():
    return render_template('altaEdificio.html', pageTitle='UNLa IoT')

@ctrlEdificio.route('/api_rest/addEdificio', methods=['POST'])
def addEdificio():
    return jsonify(jsons.dump(daoEdificio.addEdificio(request.get_json().get('nombre'), request.get_json().get('topic'))))

@ctrlEdificio.route('/api_rest/getEdificio', methods=['GET'])
def getEdificio():
    return jsonify(jsons.dump(daoEdificio.getEdificio(request.args["idEdificio"])))

@ctrlEdificio.route('/api_rest/modEdificio', methods=['POST'])
def modEdificio():
    return daoEdificio.modEdificio(Edificio(request.get_json().get('_Edificio__id'), request.get_json().get('_Edificio__nombre'),
                                     request.get_json().get('_Edificio__topic'), list()))

@ctrlEdificio.route('/api_rest/delEdificio', methods=['POST'])
def delEdificio():
    return daoEdificio.delEdificio(request.get_json().get('_Edificio__id'))