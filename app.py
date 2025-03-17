from flask import Flask
from password_generator import bp as password_generator_bp

app = Flask(__name__)
app.register_blueprint(password_generator_bp)

if __name__ == "__main__":
    app.run(debug=True)
