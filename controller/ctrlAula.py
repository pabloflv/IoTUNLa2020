from flask import render_template, jsonify, request, Blueprint
import jsons

from model.aula import Aula
from dao import daoAula

ctrlAula = Blueprint('ctrlAula', __name__)

@ctrlAula.route('/aula/alta', methods=['GET'])
def paginaAltaEdificio():
    return render_template('altaAula.html', pageTitle='UNLa IoT', idEdificio=request.args["idEdificio"])

@ctrlAula.route('/api_rest/addAula', methods=['POST'])
def addAula():
    return jsonify(jsons.dump(daoAula.addAula(request.get_json().get('nombre'), request.get_json().get('topic'),
                                              request.get_json().get('idEdificio'))))

@ctrlAula.route('/api_rest/modAula', methods=['POST'])
def modAula():
    print(request.get_json())
    return daoAula.modAula(Aula(request.get_json().get('_Aula__id'), request.get_json().get('_Aula__nombre'),
                                request.get_json().get('_Aula__topic'), list()))

@ctrlAula.route('/api_rest/delAula', methods=['POST'])
def delAula():
    print(request.get_json())
    return daoAula.delAula(request.get_json().get('_Aula__id'))