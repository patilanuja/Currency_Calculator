import {apiKey} from './api-key.js';

document.addEventListener('DOMContentLoaded', function() {
    // By default, convert button is disabled
    document.querySelector('#currency-form').addEventListener('submit', function(event) {

        event.preventDefault();
        const currency = document.querySelector('#currency').value.toUpperCase();
        let api = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`; 

         // Enable button only if there is text in the input field
         document.querySelector('#currency').onkeyup = () => {
            if (document.querySelector('#currency').value.length > 0)
                document.querySelector('#submit').disabled = false;
            else
                document.querySelector('#submit').disabled = true;
        };

        // Fetch data from API
        fetch(api)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const rate = data.conversion_rates[currency];
                if (rate !== undefined) {
                    const result = `1 USD is equal to ${rate.toFixed(3)} ${currency}`;
                    document.querySelector('#result').innerHTML = result;
                } else {
                    document.querySelector('#result').innerHTML = 'Invalid currency or currency not found.';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                document.querySelector('#result').innerHTML = 'An error occurred. Please try again later.';
            });

         // Clear input field and disable button again
         document.querySelector('#currency').value = '';
         document.querySelector('#submit').disabled = true;

    });
    
});
