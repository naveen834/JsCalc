getHistory = () => {
  return document.getElementById('history-value').innerText;
};
printHistory = (num) => {
  document.getElementById('history-value').innerText = num;
};
getOutput = () => {
  return document.getElementById('output-value').innerText;
};
printOutput = (num) => {
  if (num == '') {
    document.getElementById('output-value').innerText = num;
  } else {
    document.getElementById('output-value').innerText = getFormattedNumber(num);
  }
};
getFormattedNumber = (num) => {
  if (num == '-') {
    return '';
  }
  const n = Number(num);
  const value = n.toLocaleString('en');
  return reverseNumberFormat(value);
};
reverseNumberFormat = (num) => {
  return Number(num.replace(/,/g, ''));
};
const operator = document.querySelectorAll('.operator');
for (var i = 0; i < operator.length; i++) {
  operator[i].addEventListener('click', function () {
    if (this.id == 'clear') {
      printHistory('');
      printOutput('');
    } else if (this.id == 'backspace') {
      let output = reverseNumberFormat(getOutput()).toString();
      if (output) {
        //if output has a value
        output = output.substr(0, output.length - 1);
        printOutput(output);
      }
    } else {
      let output = getOutput();
      let history = getHistory();
      if (output == '' && history != '') {
        if (isNaN(history[history.length - 1])) {
          history = history.substr(0, history.length - 1);
        }
      }
      if (output != '' || history != '') {
        output = output == '' ? output : reverseNumberFormat(output);
        history = history + output;
        if (this.id == '=') {
          let result = eval(history);
          printOutput(result);
          printHistory('');
        } else {
          history = history + this.id;
          printHistory(history);
          printOutput('');
        }
      }
    }
  });
}
const number = document.querySelectorAll('.number');
number.forEach(function (num) {
  num.addEventListener('click', function () {
    let output = reverseNumberFormat(getOutput());
    if (output != NaN) {
      //if output is a number
      output = output + this.id;
      printOutput(output);
    }
  });
});
