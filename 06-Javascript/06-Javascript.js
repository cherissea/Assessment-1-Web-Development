// calculate function called by button
function calculate() {
        //get values from inputs
        const price = parseFloat(document.getElementById('price').value) || 0;
        const liters = parseFloat(document.getElementById('liters').value) || 0;

        //calculate total
        let total = price * liters;

        //displays result in riyals
        result.textContent='Total:'+ total.toFixed(2) + 'SR';
    }