let callPopup = document.querySelectorAll('.call-popup'),
    btnForm = document.querySelectorAll('.call-me'),
    btnDtls = document.querySelectorAll('.details-btn'),
    btnClosed = document.querySelectorAll('.modal-closed'),
    popupOrder = document.querySelector('.modal-order'),
    popupThanks = document.querySelector('.modal-thanks'),
    detailsBlock = document.querySelectorAll('.modal-details-block'),
    popupDetails = document.querySelector('.modal-details'),
    modalWindow = document.querySelector('.modal'),
    body = document.querySelector('body'),
    inputsName = document.querySelectorAll('input[name="name"'),
    popup = '';

// Маска для телефона
let inputsPhone = document.querySelectorAll('input[name="phone"]');
$(inputsPhone).mask("+7 (999) 99-99-999");

modalWindow.addEventListener('click', (e) => {
  if(e.target === modalWindow) {
    hidePopup();
  }
});
callPopup.forEach((btn) => {
  btn.addEventListener('click', () => {
    popup = popupOrder;
    showPopup(popupOrder);
  });
});
btnClosed.forEach((btn) => {
  btn.addEventListener('click', () => {
    hidePopup();
  });
});
btnDtls.forEach((btn, i) => {
  btn.addEventListener('click', () => {
    popup = popupDetails;
    showPopup(popupDetails, i);
  });
});
btnForm.forEach((btn, i) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();

    getErrorInp(btn.parentNode[0], btn.parentNode[1]);

    if(btn.parentNode[0].value != '' && btn.parentNode[1].value != '') {
      if(popup === popupOrder || popup === popupDetails) {
        popupOrder.classList.remove('popup-active', 'fadeIn', 'fadeOut');
        popupDetails.classList.remove('popup-active', 'fadeIn', 'fadeOut');
      }
      btn.parentNode[0].value = '';
      btn.parentNode[1].value = '';
      popup = popupThanks;
      showPopup(popupThanks);
    }
  });
});
inputsName.forEach((inp) => {
  inp.addEventListener('input', () => {
    if (/\d/.test(inp.value)) {
      getErrorInp(inp);
    }
  });
  inp.addEventListener('change', () => {
    if (/\d/.test(inp.value)) {
      inp.value = '';
      getErrorInp(inp);
      console.log(inp.value)
    }
  });
});

function showPopup(popup, i) {
  if(i || i == 0) {
    detailsBlock[i].classList.add('modal-active', 'animated', 'fadeIn');
  }
  body.classList.add('stopScroll');
  modalWindow.classList.add('modal-active', 'fadeIn');
  popup.classList.add('popup-active', 'animated', 'fadeIn');
}

function hidePopup() {
  getCheckBlock();

  body.classList.remove('stopScroll');
  modalWindow.classList.add('fadeOut');
  popup.classList.add('fadeOut');

  setTimeout(() => {
    modalWindow.classList.remove('modal-active','fadeIn', 'fadeOut');
    popup.classList.remove('popup-active', 'fadeIn', 'fadeOut');
  }, 950);
}

function getCheckBlock() {
  for(let i = 0; i < detailsBlock.length; i++) {
    if(detailsBlock[i].classList.contains('modal-active')) {
      detailsBlock[i].classList.add('fadeOut');
      setTimeout(() => {
        detailsBlock[i].classList.remove('modal-active', 'fadeIn', 'fadeOut');
      }, 950);
    }
  }
}

function getErrorInp(blockName, blockPhone) {
  if(blockName.value === '' || blockName.value.length < 3) {
    blockName.value = '';
    blockName.classList.add('inputError');
    setTimeout(() => {
      blockName.classList.remove('inputError');
    }, 1000);
  }

  if(blockPhone) {
    if(blockPhone.value === '' || blockPhone.value.length < 10) {
      blockPhone.value = '';
      blockPhone.classList.add('inputError');
      setTimeout(() => {
        blockPhone.classList.remove('inputError');
      }, 1000);
    }
  }
}