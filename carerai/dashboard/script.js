// Chat funksionallığı
document.addEventListener('DOMContentLoaded', function() {
    const chatInput = document.querySelector('.chat-input input');
    const sendButton = document.querySelector('.send-button');
    const chatMessages = document.querySelector('.chat-messages');
    const suggestedButtons = document.querySelectorAll('.suggested-questions button');
    const clearChatButton = document.querySelector('.clear-chat');

    // Mesaj göndərmə funksiyası
    function sendMessage(message, isUser = true) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
        
        const currentTime = new Date().toLocaleTimeString('az-AZ', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });

        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${message}</p>
            </div>
            <span class="message-time">${currentTime}</span>
        `;

        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        if (isUser) {
            // AI cavabını simulyasiya edirik
            setTimeout(() => {
                const aiResponse = "Mesajınız qəbul olundu. Sizə necə kömək edə bilərəm?";
                sendMessage(aiResponse, false);
            }, 1000);
        }
    }

    // Mesaj göndərmə hadisəsi
    sendButton.addEventListener('click', () => {
        const message = chatInput.value.trim();
        if (message) {
            sendMessage(message);
            chatInput.value = '';
        }
    });

    // Enter düyməsi ilə mesaj göndərmə
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const message = chatInput.value.trim();
            if (message) {
                sendMessage(message);
                chatInput.value = '';
            }
        }
    });

    // Hazır suallar üçün hadisə
    suggestedButtons.forEach(button => {
        button.addEventListener('click', () => {
            sendMessage(button.textContent);
        });
    });

    // Söhbəti təmizləmə
    clearChatButton.addEventListener('click', () => {
        if (confirm('Söhbəti təmizləmək istədiyinizə əminsiniz?')) {
            chatMessages.innerHTML = '';
            // İlk salamlama mesajını əlavə edirik
            setTimeout(() => {
                sendMessage('Salam! Mən CareerAI məsləhətçinizəm. Karyera inkişafınız üçün sizə necə kömək edə bilərəm?', false);
            }, 500);
        }
    });
});

// Responsive menu üçün toggle funksiyası
const toggleMenu = () => {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('active');
}; 