from flask import render_template, jsonify, request, Blueprint
import jsons

from dao import daoAula
from dao import daoEdificio

ctrlAula = Blueprint('ctrlAula', __name__)

@ctrlAula.route('/aula/alta', methods=['GET'])
def paginaAltaEdificio():
    return render_template('altaAula.html', pageTitle='UNLa IoT', idEdificio=request.args["idEdificio"])

@ctrlAula.route('/api_rest/addAula', methods=['POST'])
def addAula():
    return jsonify(jsons.dump(daoAula.addAula(request.get_json().get('nombre'), request.get_json().get('topic'),
                                              request.get_json().get('idEdificio'))))