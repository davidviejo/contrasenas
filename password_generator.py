from flask import Blueprint, render_template_string, request, jsonify
import secrets
import string

bp = Blueprint("password_generator", __name__, url_prefix="/program/password_generator")

def generar_contrasena_segura(longitud, include_symbols=True):
    try:
        longitud = int(longitud)
        if longitud < 4:
            return "⚠️ La longitud debe ser al menos 4 caracteres."
        caracteres = string.ascii_letters + string.digits
        if include_symbols:
            caracteres += string.punctuation
        contrasena = [
            secrets.choice(string.ascii_lowercase),
            secrets.choice(string.ascii_uppercase),
            secrets.choice(string.digits)
        ]
        contrasena += [secrets.choice(caracteres) for _ in range(longitud - 3)]
        secrets.SystemRandom().shuffle(contrasena)
        return ''.join(contrasena)
    except ValueError:
        return "❌ Error: Ingresa un número válido."

html_template = """
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Generador de Contraseñas IA</title>
  <link rel="stylesheet" href="/static/styles.css">
</head>
<body>
  <div class="container">
    <h1>🔐 Generador de Contraseñas IA</h1>
    <p>Indica la longitud deseada y genera una contraseña segura.</p>
    <input type="number" id="passwordLength" min="4" max="128" value="12">
    <div>
      <input type="checkbox" id="includeSymbols" checked>
      <label for="includeSymbols">Incluir símbolos</label>
    </div>
    <!-- Barra de progreso -->
    <div id="progressContainer"><div id="progressBar"></div></div>
    <button onclick="generatePassword()" title="Generar Contraseña de manera segura">Generar Contraseña</button>
    <div class="password-box">
      <input type="text" id="generatedPassword" readonly>
      <button onclick="copyPassword()" title="Copiar al portapapeles">📋 Copiar</button>
    </div>
    <p id="statusMessage"></p>
    <script src="/static/script.js"></script>
  </div>
</body>
</html>
"""

@bp.route("/", methods=["GET"])
def home():
    return render_template_string(html_template)

@bp.route("/generate", methods=["POST"])
def generate():
    data = request.get_json()
    longitud = data.get('length', 12)
    include_symbols = data.get('include_symbols', True)
    password = generar_contrasena_segura(longitud, include_symbols)
    strength = "Buena" if len(password) >= 12 else "Regular"
    return jsonify({"password": password, "strength": strength})
