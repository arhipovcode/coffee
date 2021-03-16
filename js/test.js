let itemsTestOne = document.querySelectorAll('.test-block-wrapper-item'),
    itemsTestThree = document.querySelectorAll('.test-block-3-item'),
    testBlocks = document.querySelectorAll('.test-block'),
    testWrapper = document.querySelector('.test-wrap'),
    prevBtn = document.querySelector('.test-prev-btn'),
    nextBtn = document.querySelector('.test-next-btn'),
    presentBtn = document.querySelector('.present-btn'),
    num = document.querySelector('.test-question-is span'),
    testNum = 0;

itemsTestOne.forEach((el) => {
  el.addEventListener('click', () => {
    if(el.classList.contains('item-active')) {
      el.classList.remove('item-active');
      return;
    }
    getCheckItem(itemsTestOne);
    el.classList.add('item-active');
  });
});
itemsTestThree.forEach((el) => {
  el.addEventListener('click', () => {
    if(el.classList.contains('item-active')) {
      el.classList.remove('item-active');
      return;
    }
    getCheckItem(itemsTestThree);
    el.classList.add('item-active');
  });
});
prevBtn.addEventListener('click', () => {
  prevTest();
});
nextBtn.addEventListener('click', () => {
  nextTest();
});
presentBtn.addEventListener('click', () => {
  let inputName = testBlocks[testNum].querySelector('input[name="name"'),
      inputPhone = testBlocks[testNum].querySelector('input[name="phone"');
  getErrorInp(inputName, inputPhone);

  if(inputName.value != '' && inputPhone.value != '') {
    inputName.value = '';
    inputPhone.value = '';
    popup = popupThanks;
    showPopup(popupThanks);
  }
});

function getCheckItem(item) {
  for(let i = 0; i < item.length; i++) {
    if(item[i].classList.contains('item-active')) {
      item[i].classList.remove('item-active');
    }
  }
}

function prevTest() {
  if(testNum === 0) {
    return;
  }
  testBlocks[testNum].classList.remove('test-block-active', 'fadeIn');
  testNum--;
  num.innerText--;
  testBlocks[testNum].classList.add('test-block-active', 'animated', 'fadeIn');
  if(testNum === 0) {
    prevBtn.disabled = true;
    prevBtn.classList.remove('btn-color');
  }
  if(testNum === 2) {
    nextBtn.classList.remove('hideBtn');
    nextBtn.classList.add('animated', 'fadeIn');
    presentBtn.classList.remove('showBtn', 'animated', 'fadeIn');
  }
}

function nextTest() {
  if(testNum === 3) {
    return;
  }
  if(getCheckBlockTest(testNum)) {
    return;
  }
  prevBtn.disabled = false;
  prevBtn.classList.add('btn-color');
  testBlocks[testNum].classList.remove('test-block-active', 'fadeIn');
  testNum++;
  num.innerText++;
  testBlocks[testNum].classList.add('test-block-active', 'animated', 'fadeIn');
  if(testNum === 3) {
    nextBtn.classList.add('hideBtn');
    presentBtn.classList.add('showBtn', 'animated', 'fadeIn');
  }
}

function getCheckBlockTest(testNum) {
  if(testNum === 0) {
    for(let i = 0; i < itemsTestOne.length; i++) {
      if(itemsTestOne[i].classList.contains('item-active')) {
        return false;
      }
    }
    pulseBlock(itemsTestOne);
    return true;
  }
  if(testNum === 1) {
    if(testBlocks[testNum].querySelector('input').value === '') {
      getErrorInp(testBlocks[testNum].querySelector('input'));
      return true;
    }
  }
  if(testNum === 2) {
    for(let i = 0; i < itemsTestThree.length; i++) {
      if(itemsTestThree[i].classList.contains('item-active')) {
        return false;
      }
    }
    pulseBlock(itemsTestThree);
    return true;
  }
}

function pulseBlock(block) {
  for(let i = 0; i < block.length; i++) {
    block[i].classList.add('animate__pulse');

    setTimeout(() => {
      block[i].classList.remove('animate__pulse');
    }, 950);
  }
}

