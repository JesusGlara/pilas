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
  
 export default function postFija(expression) {
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
  