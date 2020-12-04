
function processPayment(token, buttonTarget) {

    let data = {
        card_token: token,
        hash: PagSeguroDirectPayment.getSenderHash(),
        installment: document.querySelector('select.select_installments').value,
        card_name: document.querySelector('input[name=card_name]').value,
        _token: csrf
    }


    $.ajax({
        type: "POST",
        url: urlProcess,
        data: data,
        dataType: "json",
        success: function (res) {
            toastr.success(res.data.message, 'Sucesso')
            window.location.href = `${urlThanks}?order=${res.data.order}`;
        },
        error: function (err) {
            // console.log(err.responseText)

            buttonTarget.disabled = false;
            buttonTarget.innerHTML = 'Efeturar Pagamento';

            let obj = JSON.parse(err.responseText);
            document.querySelector('div.msg').innerHTML = showErrorMessages(obj.data.message.error.message);
        }
    });
}

function getInstallments(amount, brand) {
    PagSeguroDirectPayment.getInstallments({
        amount: amount,
        brand: brand,
        maxInstallmentNoInterest: 0,
        success: function (res) {

            // console.log(res)

            let selectInstallments = drawSelectInstallments(res.installments[brand])

            document.querySelector('div .installments').innerHTML = selectInstallments
        },
        error: function (err) {
            console.log(err);
        },
        complete: function (res) {
            console.log(res);
        }
    })
}

function drawSelectInstallments(installments) {

    let select = '<label>Opções de Parcelamento:</label>';

    select += '<select class="form-control select_installments">';

    for (let l of installments) {
        select += `<option value="${l.quantity}|${l.installmentAmount}">${l.quantity}x de ${l.installmentAmount} - Total fica ${l.totalAmount}</option>`;
    }


    select += '</select>';

    return select;
}

function showErrorMessages(message) {
    return `
        <div class="alert alert-danger">${message}</div>
    `;
}

function errorsMapPagseguroJs(code) {

    switch (code) {
        case "10000":
            return "Bandeira do cartão inválida!"
            break;

        case "10001":
            return "Número do cartão com tamanho inválido!"
            break;
        // case "10002":
        case "30405":
            return "Data com formato inválida!"
            break;

        case "10003":
            return "Código de segurança inválida!"
            break;

        case "10004":
            return "Código de segurança obrigatório!"
            break;

        case "10006":
            return "Tamanho de código de segurança inválido!"
            break;

        default:
            return "Houve um erro na validação do seu cartão de crédito!"
            break;
    }

}