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
    const pila = new Pila();
    const salida = [];
  
   
  // Definimos un diccionario que asocia a cada operador su precedencia numérica
  const diccionario = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
    '^': 3,
  };

  // Convertimos la expresión infija en un arreglo de caracteres
  expression = expression.split('');

  // Recorremos la expresión de izquierda a derecha
  for (let i = 0; i < expression.length; i++) {
    // Obtenemos el caracter actual
    const caracter = expression[i];

    // Si el caracter es alfanumérico, lo agregamos directamente a la salida
    if (/^[a-zA-Z0-9]+$/.test(caracter)) {
      salida.push(caracter);
    }
    // Si el caracter es un paréntesis izquierdo, lo agregamos a la pila
    else if (caracter === '(') {
      pila.push(caracter);
    }
    // Si el caracter es un paréntesis derecho, sacamos elementos de la pila y los agregamos a la salida hasta encontrar el paréntesis izquierdo correspondiente
    else if (caracter === ')') {
      while (pila.length > 0 && pila[pila.length - 1] !== '(') {
        salida.push(pila.pop());
      }
      // Eliminamos el paréntesis izquierdo de la pila
      pila.pop();
    }
    // Si el caracter es un operador, sacamos elementos de la pila que tienen mayor o igual precedencia y los agregamos a la salida, y luego agregamos el operador a la pila
    else if (diccionario[caracter]) {
      while (
        pila.length > 0 &&
        diccionario[caracter] <= diccionario[pila[pila.length - 1]]
      ) {
        salida.push(pila.pop());
      }
      pila.push(caracter);
    }
  }

  // Sacamos todos los elementos que quedan en la pila y los agregamos a la salida
  while (pila.length > 0) {
    salida.push(pila.pop());
  }

  // Devolvemos la expresión postfija como una cadena de caracteres, separando cada elemento con un espacio en blanco
  return salida.join(' ');
}

  
 export default  function prefija(expression) {
    // Crear una pila vacía para los operandos y otra para los operadores.
    const operandos = new Pila();
    const operadores = new Pila();
  
    // Crear un objeto para almacenar la precedencia de los operadores.
    const diccionario = {
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
      const caracter = expression[i];
  
      // Si el caracter es un dígito o una letra, es un operando.
      if (/^[a-zA-Z0-9]+$/.test(caracter)) {
        operandos.push(caracter);
  
      // Si el caracter  es un paréntesis derecho, es un operador.
      } else if (caracter === ')') {
        operadores.push(caracter);
  
      // Si el caracter es un paréntesis izquierdo, se deben sacar los operadores
      // de la pila de operadores y agregarlos a la pila de operandos hasta que
      // se encuentre el paréntesis derecho correspondiente.
      } else if (caracter === '(') {
        while (operadores.top() !== ')') {
          operandos.push(operadores.pop());
        }
        operadores.pop();
  
      // Si el caracter  es un operador, se deben sacar de la pila de operadores
      // todos los operadores cuya precedencia sea mayor o igual a la del caracter,
      // y agregarlos a la pila de operandos.
      } else if (diccionario[caracter]) {
        while (
          !operadores.estaVacia() &&
          diccionario[caracter] < diccionario[operadores.top()]
        ) {
          operandos.push(operadores.pop());
        }
        operadores.push(caracter);
      }
    }
  
    // Agregar los operadores que queden en la pila de operadores a la pila de operandos.
    while (!operadores.estaVacia()) {
      operandos.push(operadores.pop());
    }
  
    // Invertir la pila de operandos para obtener la expresión en notación prefija.
    const salida = [];
    while (!operandos.estaVacia()) {
      salida.push(operandos.pop());
    }
  
    // Unir los elementos de la pila de salida en una cadena y retornarla.
    return salida.join('');
  }