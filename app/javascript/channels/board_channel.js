import consumer from "./consumer"

const appBoard = consumer.subscriptions.create("BoardChannel", {
    connected() {
        // Called when the subscription is ready for use on the server
    },

    disconnected() {
        // Called when the subscription has been terminated by the server
    },

    received(data) {
	const messages = document.getElementById('Card');
	messages.insertAdjacentHTML('beforeend', data['message']);
    },

    speak: function(message) {
        return this.perform('speak', {message: message});
    }
});

window.addEventListener("keypress", function(e) {
    if (e.keyCode === 13) {
        appBoard.speak(e.target.value);
        e.target.value = '';
        e.preventDefault();
    }
})