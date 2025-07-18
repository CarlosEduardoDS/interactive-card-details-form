const inputCardnumber = $('#inputCardNumber');
const cardForm = $('#cardForm');
const cardCompleted = $('#cardCompleted');

$('#btnConfirm').click(function () {
  let confirmacaoDeErro = false

  const nomeDigitadoBruto = $('#inputName').val().trim();

  if (nomeDigitadoBruto === "" || /\d/.test(nomeDigitadoBruto)) {
    alert("Nome inválido. Digite apenas letras e espaços.");
    confirmacaoDeErro = true;
    return;
  }

  let nomeDigitado = nomeDigitadoBruto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z\s]/g, "")
    .toUpperCase();

  $('#cardholderName').text(nomeDigitado);

  inputCardnumber.mask('0000 0000 0000 0000');
  const numeroDigitado = inputCardnumber.val().trim();
  const regexCartao = /^\d{4} \d{4} \d{4} \d{4}$/;
  if (!regexCartao.test(numeroDigitado)) {
    alert("Número do cartão inválido. Use o formato: 0000 1111 2222 3333");
    confirmacaoDeErro = true
    return;
  }
  $("#cardNumber").text(numeroDigitado);

  const mesDigitado = $('#inputMonth').val().trim();
  const mesNumero = parseInt(mesDigitado);
  if (mesNumero < 1 || mesNumero > 12) {
    alert("Mês inválido. Use um valor de 01 a 12.");
    confirmacaoDeErro = true
    return;
  }
  $("#expDateMonth").text(mesDigitado);

  const anoDigitado = $('#inputYear').val().trim();
  if (!/^\d{2}$/.test(anoDigitado)) {
    alert("Ano inválido. Use exatamente 2 dígitos (ex: 25).");
    confirmacaoDeErro = true
    return;
  }
  $("#expDateYear").text(anoDigitado);

  const cvcDigitado = $('#inputCvc').val().trim();
  if (!/^\d{3}$/.test(cvcDigitado)) {
    alert("CVC inválido. Use 3 dígitos.");
    confirmacaoDeErro = true
    return;
  }
  $("#cvc").text(cvcDigitado);

  if (!confirmacaoDeErro) {
    cardForm.css('display', 'none');
    cardCompleted.css('display', 'flex');
  } else {
    return;
  }
});

$('#btnConfirmSecondPage').click(function () {
  cardForm.css('display', 'flex');
  cardCompleted.css('display', 'none');

  $('#cardForm').find('input').val('');

  $('#cardholderName').text('JANE APPLESEED');
  $('#cardNumber').text('0000 0000 0000 0000');
  $('#expDateMonth').text('00');
  $('#expDateYear').text('00');
  $('#cvc').text('000');
});