const main = document.querySelector('main')
const root = document.querySelector(':root')
const input = document.getElementById('input')
const resultInput = document.getElementById('result')

// only these keys will be allowed to enter the input
const allowedKeys = ["(", ")", "/", "*", "-", "+", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", ".", "%", " "]

// numbers' / expressions' buttons functionality
document.querySelectorAll('.charKey').forEach((charKeyBtn) => {
  charKeyBtn.addEventListener('click', () => {
    const value = charKeyBtn.dataset.value
    input.value += value
  })
})

// clear button's functionality
document.getElementById('clear').addEventListener('click', () => {
  input.value = ''
  input.focus() // quando o usuário limpar o input, ele foca automaticamente no input de novo, para digitar novos números
})

// input behaviour 
input.addEventListener('keydown', (event) => { // keydown = quando você pressiona uma tecla
  event.preventDefault() // quero impedir o comportamento padrão, porque se o usuário apertar a tecla, não quero que seja inserido o valor da tecla no input, quero controlar manualmente
  if (allowedKeys.includes(event.key)) { // event.key = tecla pressionada pelo usuário 
    input.value += event.key
    return
  }
  if (event.key === 'Backspace') {
    input.value = input.value.slice(0, -1) // começa no caractere 0 e vai até o -1 (penúltimo), excluindo o último 
    return
  }
  if (event.key === 'Enter') {
    calculate()
    return
  }
})

// equal button's functionality
document.getElementById('equal').addEventListener('click', calculate)

// calculate function 
function calculate() {
  resultInput.value = 'ERROR'
  resultInput.classList.add('error')

  const result = eval(input.value) // eval executa o código javascript **CUIDADO -> caso o usuário pudesse digitar o que quisesse, ele poderia colocar um script malicioso no input e executaria no eval()
 
  resultInput.value = result
  resultInput.classList.remove('error') // a função vai executar as duas primeiras linhas e depois vai executar o script, se o script for válido, o código continua rodando até o fim da função. o resultado vai ser como se nunca tivesse sido pintado de vermelho
}


// switch theme functionality
document.getElementById('themeSwitcher').addEventListener('click', () => {
  if (main.dataset.theme === 'dark') {
    root.style.setProperty('--bg-color', '#f1f5f9')
    root.style.setProperty('--border-color', '#aaa')
    root.style.setProperty('--font-color', '#212529')
    root.style.setProperty('--primary-color', '#26834a')
    main.dataset.theme = 'light'
  } else {
    root.style.setProperty('--bg-color', '#212529')
    root.style.setProperty('--border-color', '#666')
    root.style.setProperty('--font-color', '#f1f5f9')
    root.style.setProperty('--primary-color', '#4dff91')
    main.dataset.theme = 'dark'
  }
})

// copy to clipboard functionality 
document.getElementById('copyToClipboard').addEventListener('click', (event) => {
  const button = event.currentTarget // currentTarget é quem acionou o evento, que no caso é o próprio botão
  if (button.innerText === 'Copy') {
    button.innerText = 'Copied!'
    button.classList.add('success') // success é adicionada para pintar o botão
    navigator.clipboard.writeText(resultInput.value)
  } else {
    button.innerText = 'Copy'
    button.classList.remove('success')
  }
})