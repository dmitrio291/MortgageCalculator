document.addEventListener('DOMContentLoaded', () => {

    /* Values from text inputs */
    const totalCost = document.getElementById('total-cost'),
        anInitialFee = document.getElementById('an-initial-fee'),
        creditTerm = document.getElementById('credit-term');

    /* Values from range inputs */    
    const totalCostRange = document.getElementById('total-cost-range'),
        anInitialFeeRange = document.getElementById('an-initial-fee-range'),
        creditTermRange = document.getElementById('credit-term-range');

    /* Total values */
    const totalAmountOfCredit = document.getElementById('amount-of-credit'),
        totalMonthlyPayment = document.getElementById('monthly-payment'),
        totalRecommendedIncome = document.getElementById('recommended-income');

    /* All ranges */
    const inputsRange = document.querySelectorAll('.input-range');

    /* All inputs */
    const inputsNumbers = document.querySelectorAll('.input-numbers');    

    /* All buttons with an interest rate */
    const bankButtons = document.querySelectorAll('.bank');

    const assignValue = (input) => {

        if ( input === 'range' ) {

            totalCost.value = totalCostRange.value;

            anInitialFee.value = anInitialFeeRange.value;

            creditTerm.value = creditTermRange.value;

        } else {

            totalCostRange.value = totalCost.value;

            anInitialFeeRange.value = anInitialFee.value;

            creditTermRange.value = creditTerm.value;

        }

    }

    const banks = [
        {
            name: 'alfa',
            percents: 8.7
        },
        {
            name: 'sberbank',
            percents: 8.4
        },
        {
            name: 'pochta',
            percents: 7.9
        },
        {
            name: 'tinkoff',
            percents: 9.2
        },
    ]

    let currentPercent = banks[0].percents;
    
    for ( let bank of bankButtons ) {

        bank.addEventListener( 'click', () => {        

            for ( let item of bankButtons ) {
                item.classList.remove( 'active' );
            }

            bank.classList.add( 'active' );

            takeActiveBank( bank );

        });

    }

    const takeActiveBank = currentActive => {

        const dataAttributeValue = currentActive.dataset.name;

        const currentBank = banks.find( bank => bank.name === dataAttributeValue );
        
        currentPercent = currentBank.percents;

        calculation( totalCost.value, anInitialFee.value, creditTerm.value );

    }

    for ( let input of inputsRange ) {

        input.addEventListener( 'input', () => {

            assignValue('range');

            calculation( totalCost.value, anInitialFee.value, creditTerm.value );

        });

    }

    for ( let input of inputsNumbers ) {

        input.addEventListener( 'change', () => {

            assignValue();

            calculation( totalCostRange.value, anInitialFeeRange.value, creditTermRange.value );

        });

    }

    const calculation = ( totalCost = 0, anInitialFee = 10000, creditTerm = 1 ) => {

        let monthlyPayment,

            loanAmount = totalCost - anInitialFee,

            interestRate = currentPercent,

            numberOfYears = creditTerm,

            numberOfMonths = 12 * numberOfYears;
        
        monthlyPayment = ( loanAmount + ((( loanAmount / 100 ) * interestRate ) / 12 ) * numberOfMonths ) / numberOfMonths;     
        
        const monthlyPaymentArounded = Math.round(monthlyPayment);

        if ( monthlyPaymentArounded < 0 ) {

            return false;

        } else {

            totalAmountOfCredit.innerHTML = `${loanAmount} ₽`;

            totalMonthlyPayment.innerHTML = `${monthlyPaymentArounded} ₽`;

            totalRecommendedIncome.innerHTML = `${monthlyPaymentArounded + ((monthlyPaymentArounded / 100) * 35)} ₽`;
            
        }

    }



});