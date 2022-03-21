// salvar en variable inputs, botones ,espacio para el resultado
// boton reset
const bill = document.querySelector('.bill_input');
const customTip = document.querySelector('.tip_grid_custom');
const tipGrid = document.querySelectorAll('.tip_grid_button');
const tipLabel = document.querySelector('.tip_grid_custom');
const span = document.querySelector('.tip_custom');
const pplInput = document.querySelector('.people_input');
const errorMsg = document.querySelector('.error_msg');
const tipResult = document.querySelector('#tip_result');
const totalResult = document.querySelector('#total_result');
const resetBtn = document.querySelector('.reset');
const attributionDiv = document.querySelector('.attribution');



// click event listener
window.addEventListener('DOMContentLoaded', () => {
    

        let billAmount = 0; 
        let tipAmount = 0;
        let pplAmount = 1;

        // Listen on a change on bill input and return the value on FLOAT
        bill.addEventListener('change', () => {
            let billValue = parseFloat(bill.value);
            billAmount = billValue;
            
        });
        bill.addEventListener('click', hideDiv );

        // Loop trough buttons listening on click event 
        for(let i = 0; i < (tipGrid.length - 1) ; i++) {
            tipGrid[i].addEventListener('click', (e) => {
                btnSelected(e);
                clearTipInput();
            })
        }

        // Hide custom label on click 
        tipLabel.addEventListener('click', () => {
        
            clearBtn();
            hideDiv();
            // span.classList.add('hide');
            if( tipLabel.value){
                span.classList.add('hide');
            } else {
                span.classList.add('hide')
            }

            tipLabel.addEventListener('change', (e) => {
                tipAmount = parseInt(e.target.value);
                calcTip();
                
            })
        })

        // Listen on change of ppl Input and return value
        // if value is 0 show error message 
    
        pplInput.addEventListener('input', () => {
            hideDiv();
            
            let pplValue = parseInt(pplInput.value);
            if(pplValue === 0) {
                pplInput.classList.add('error')
                errorMsg.classList.remove('hide');
            } else {
                pplInput.classList.remove('error');
                errorMsg.classList.add('hide');
                
            }
            pplAmount = pplValue;
            calcTip();
            
            
        });

        // FUNCTIONS 

        function hideDiv(){
            attributionDiv.classList.add('hide');
        }
        // funcion que agregue o quite clases 
        // BUG , checar como arreglar el event bubbling 
        function btnSelected(e) {
            clearBtn();
            let btn = e.target;
            if(btn.classList.contains('btnSelected')) {
                btn.classList.remove('btnSelected')
            } else {
                btn.classList.add('btnSelected');
            }
            tipAmount = parseInt(btn.textContent); // RETORNA VALOR DEL BTN 
            calcTip(); 
        }
        
        function calcTip() {
            
            let tipCalculated = (billAmount * tipAmount) / billAmount;
            let tipPerPerson = tipCalculated / pplAmount;
            let total = (tipCalculated + billAmount) / pplAmount;
        
            if( pplAmount === 0 || Number.isNaN(pplAmount) ) {
                tipPerPerson = tipCalculated / 1;
                total = tipCalculated + billAmount;
            }
            
            printTip(tipPerPerson);
            printTotal(total);
            
        }
        
        // deletes btnSelected class on previous btn element 
        function clearBtn() {
            for(let i = 0; i < (tipGrid.length - 1) ; i++) {
                if(tipGrid[i].classList.contains('btnSelected')) {
                    tipGrid[i].classList.remove('btnSelected')
                } 
                
            }
        }
        
        // Reset custom tip input value to 0 and shows again Text
        function clearTipInput(){
            tipLabel.value = '';
            span.classList.remove('hide');
        }
        
        // Function takes the tip amount and display the HTML 
        function printTip(tip){
            if(Number.isNaN(tip)) {
                tip = 0;
            }
            tipResult.innerHTML = `$${tip}`;
        }
        
        function printTotal(total) {
            
            totalResult.innerHTML = `$${total}`;
        }
        
        // RESET APP

        resetBtn.addEventListener('click', () => {
            
            location.reload();
        } );

        
    
    

});

    

 





