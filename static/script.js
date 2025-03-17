function simulateProgress(callback) {
  const progressBar = document.getElementById('progressBar');
  const progressContainer = document.getElementById('progressContainer');
  progressBar.style.width = "0%";
  progressContainer.style.display = "block";
  let width = 0;
  const interval = setInterval(() => {
    width += 10;
    progressBar.style.width = width + "%";
    if (width >= 100) {
      clearInterval(interval);
      progressContainer.style.display = "none";
      callback();
    }
  }, 50);
}

function generatePassword() {
  const length = document.getElementById('passwordLength').value;
  const includeSymbols = document.getElementById('includeSymbols').checked;
  simulateProgress(() => {
    fetch('/programa/generador-de-contrasenas/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify({ length: length, include_symbols: includeSymbols })
    })
    .then(response => response.json())
    .then(data => {
      const passwordField = document.getElementById('generatedPassword');
      const statusMessage = document.getElementById('statusMessage');
      if (data.password.startsWith("❌") || data.password.startsWith("⚠️")) {
        statusMessage.innerText = data.password;
        passwordField.value = '';
      } else {
        passwordField.value = data.password;
        statusMessage.innerText = "✅ Contraseña generada correctamente. Fuerza: " + (data.strength || "Buena");
      }
    })
    .catch(() => {
      document.getElementById('statusMessage').innerText = "❌ Error al generar la contraseña.";
    });
  });
}

function copyPassword() {
  const passwordField = document.getElementById('generatedPassword');
  const statusMessage = document.getElementById('statusMessage');
  if (passwordField.value === '') {
    statusMessage.innerText = "⚠️ No hay contraseña para copiar.";
    return;
  }
  passwordField.select();
  document.execCommand('copy');
  statusMessage.innerText = "📋 ¡Contraseña copiada al portapapeles!";
}
