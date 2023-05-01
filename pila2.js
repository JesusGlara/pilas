class Node {
    constructor(data) {
      this.data= data;
      this.siguiente = null;
    }
  }
  
 class Pila {
    constructor() {
      this.cima = null;
    }
  
    estaVacia() {
      return this.cima === null;
    }
  
    push(data) {
      let  nuevo = new Node(data);
      nuevo.siguiente = this.cima;
      this.cima = nuevo;
    }
  
    pop() {
      if (this.estaVacia()) {
        throw new Error('La pila esta vacia ');
      }
      const value = this.cima.data;
      this.cima = this.cima.siguiente;
      return value;
    }
  
    top() {
      if (this.estaVacia()) {
        throw new Error('La pila esta vacia');
      }
      return this.cima.data;
    }
  }
  
function postFija(expression) {
    const stack = new Pila();
    const output = [];
  
    const operators = {
      '+': 1,
      '-': 1,
      '*': 2,
      '/': 2,
      '^': 3,
    };
  
    expression = expression.split('');
  
    for (let i = 0; i < expression.length; i++) {
      const token = expression[i];
  
      if (/^[a-zA-Z0-9]+$/.test(token)) {
        output.push(token);
      } else if (token === '(') {
        stack.push(token);
      } else if (token === ')') {
        while (stack.top() !== '(') {
          output.push(stack.pop());
        }
        stack.pop();
      } else if (operators[token]) {
        while (
          !stack.estaVacia() &&
          operators[token] <= operators[stack.top()]
        ) {
          output.push(stack.pop());
        }
        stack.push(token);
      }
    }
  
    while (!stack.estaVacia()) {
      output.push(stack.pop());
    }
  
    return output.join('');
  }
 export default  function prefija(expression) {
    // Crear una pila vacía para los operandos y otra para los operadores.
    const operandos = new Pila();
    const operadores = new Pila();
  
    // Crear un objeto para almacenar la precedencia de los operadores.
    const precedencia = {
      '^': 4,
      '*': 3,
      '/': 3,
      '+': 2,
      '-': 2,
      '(': 1,
    };
  
    // Convertir la expresión a un arreglo de caracteres.
    expression = expression.split('');
  
    // Recorrer los caracteres de la expresión.
    for (let i = expression.length - 1; i >= 0; i--) {
      const token = expression[i];
  
      // Si el token es un dígito o una letra, es un operando.
      if (/^[a-zA-Z0-9]+$/.test(token)) {
        operandos.push(token);
  
      // Si el token es un paréntesis derecho, es un operador.
      } else if (token === ')') {
        operadores.push(token);
  
      // Si el token es un paréntesis izquierdo, se deben sacar los operadores
      // de la pila de operadores y agregarlos a la pila de operandos hasta que
      // se encuentre el paréntesis derecho correspondiente.
      } else if (token === '(') {
        while (operadores.top() !== ')') {
          operandos.push(operadores.pop());
        }
        operadores.pop();
  
      // Si el token es un operador, se deben sacar de la pila de operadores
      // todos los operadores cuya precedencia sea mayor o igual a la del token,
      // y agregarlos a la pila de operandos.
      } else if (precedencia[token]) {
        while (
          !operadores.estaVacia() &&
          precedencia[token] < precedencia[operadores.top()]
        ) {
          operandos.push(operadores.pop());
        }
        operadores.push(token);
      }
    }
  
    // Agregar los operadores que queden en la pila de operadores a la pila de operandos.
    while (!operadores.estaVacia()) {
      operandos.push(operadores.pop());
    }
  
    // Invertir la pila de operandos para obtener la expresión en notación prefija.
    const output = [];
    while (!operandos.estaVacia()) {
      output.push(operandos.pop());
    }
  
    // Unir los elementos de la pila de salida en una cadena y retornarla.
    return output.join('');
  }