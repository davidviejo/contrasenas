document.addEventListener("DOMContentLoaded", function() {
    // Efecto typewriter para el mensaje del asistente virtual
    const message = "Saludos, soy tu asistente virtual. Estoy listo para llevarte al futuro. ¿Qué proyecto innovador deseas crear hoy?";
    let index = 0;
    const aiMessage = document.getElementById("aiMessage");
  
    function typeLetter() {
        if (index < message.length) {
            aiMessage.textContent += message.charAt(index);
            index++;
            setTimeout(typeLetter, 50);
        }
    }
    if(aiMessage) typeLetter();
  
    // Menú hamburguesa para móvil
    const menuIcon = document.getElementById('menuIcon');
    const mainNav = document.getElementById('mainNav');
    if (menuIcon) {
      menuIcon.addEventListener('click', () => {
        mainNav.classList.toggle('menu-opened');
      });
    }
  
    // Lazy loading de imágenes (ejemplo)
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach(img => {
      img.addEventListener('load', () => {
        img.classList.add('loaded');
      });
    });
  
    // Filtrado por categoría
    const filterSelect = document.getElementById('filterSelect');
    if (filterSelect) {
      filterSelect.addEventListener('change', function() {
          const filter = this.value;
          const cards = document.querySelectorAll('.card');
          cards.forEach(card => {
              if (filter === 'todos' || card.getAttribute('data-category') === filter) {
                  card.style.display = 'block';
              } else {
                  card.style.display = 'none';
              }
          });
      });
    }
  
    // Búsqueda rápida en tiempo real
    const quickSearch = document.getElementById('quickSearch');
    if (quickSearch) {
      quickSearch.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
          const title = card.querySelector('h3').textContent.toLowerCase();
          const desc = card.querySelector('p').textContent.toLowerCase();
          if (title.includes(query) || desc.includes(query)) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    }
  
    // Funcionalidad para botones flotantes y modales:
  
    // Modal de correo
    const emailButton = document.getElementById('emailButton');
    const emailModal = document.getElementById('emailModal');
    const closeEmailModal = document.getElementById('closeEmailModal');
  
    if(emailButton) {
      emailButton.addEventListener('click', () => {
        emailModal.style.display = 'block';
      });
    }
    if(closeEmailModal) {
      closeEmailModal.addEventListener('click', () => {
        emailModal.style.display = 'none';
      });
    }
  
    // Envío del formulario de correo
    const emailForm = document.getElementById('emailForm');
    if(emailForm) {
      emailForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const subject = document.getElementById('emailSubject').value;
        const message = document.getElementById('emailMessage').value;
        fetch('/send_email', {
          method: 'POST',
          headers: {'Content-Type': 'application/json; charset=UTF-8'},
          body: JSON.stringify({subject: subject, message: message})
        })
        .then(response => response.json())
        .then(data => {
          alert(data.msg);
          emailModal.style.display = 'none';
        })
        .catch(err => {
          alert("Error al enviar el correo.");
        });
      });
    }
  
    // Modal de chat con IA
    const chatButton = document.getElementById('chatButton');
    const chatModal = document.getElementById('chatModal');
    const closeChatModal = document.getElementById('closeChatModal');
  
    if(chatButton) {
      chatButton.addEventListener('click', () => {
        chatModal.style.display = 'block';
      });
    }
    if(closeChatModal) {
      closeChatModal.addEventListener('click', () => {
        chatModal.style.display = 'none';
      });
    }
  
    // Envío del chat (simulación con ChatGPT)
    const sendChat = document.getElementById('sendChat');
    const chatInput = document.getElementById('chatInput');
    const chatWindow = document.getElementById('chatWindow');
    if(sendChat && chatInput && chatWindow) {
      sendChat.addEventListener('click', function() {
        const userMessage = chatInput.value;
        if(userMessage.trim() === "") return;
        const userMsgElem = document.createElement('div');
        userMsgElem.textContent = "Tú: " + userMessage;
        userMsgElem.style.marginBottom = "10px";
        chatWindow.appendChild(userMsgElem);
        chatInput.value = "";
        fetch('/chat', {
          method: 'POST',
          headers: {'Content-Type': 'application/json; charset=UTF-8'},
          body: JSON.stringify({message: userMessage})
        })
        .then(response => response.json())
        .then(data => {
          const aiMsgElem = document.createElement('div');
          aiMsgElem.textContent = "IA: " + data.response;
          aiMsgElem.style.marginBottom = "10px";
          aiMsgElem.style.color = "#5dbcd2";
          chatWindow.appendChild(aiMsgElem);
        })
        .catch(err => {
          const errorElem = document.createElement('div');
          errorElem.textContent = "Error al comunicarse con la IA.";
          errorElem.style.marginBottom = "10px";
          errorElem.style.color = "#ff6666";
          chatWindow.appendChild(errorElem);
        });
      });
    }
  
    // Cerrar modal si se hace clic fuera de él
    window.addEventListener('click', (event) => {
      if (event.target == emailModal) {
        emailModal.style.display = 'none';
      }
      if (event.target == chatModal) {
        chatModal.style.display = 'none';
      }
    });
  });
  