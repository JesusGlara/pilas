class NodoPila {
    constructor(data,exp){
        
        this.data = data;
        this.siguiente = null;
    }
}

 export default class PilaLista {
    
    constructor(){
        this.cima = null;
        this.size=0;
    }

    pilaVacia = () => {
        return this.cima === null;

    }


    insertar(data){
        const  nuevo = new NodoPila(data);
        nuevo.siguiente = this.cima;
        this.cima=nuevo;
        this.size++;
    }
    impresion(){

        if (this.pilaVacia()){
            console.log("LA PILA ESTA VACIA");
            console.log(`La cantidad de elemntos es de: ${this.size}`);
        }else{

          let temporal;
          temporal=this.cima;  

          let cadena;
          cadena="Elementos de la pila: ";
          let cadena2=`La cantidad de elementos es: ${this.size}`;
          let cadena3=`La cantidad de elementos es: ${this.cima.data}`
          while(temporal!==null){
            cadena+=` ${temporal.data}`;
            // cadena2+= `${this.size}`;
           
            temporal=temporal.siguiente;
          }
          
          console.log(cadena);
          console.log(cadena2);
          console.log(cadena3);
        }
    }

pop(){
    if(this.cima===null){
        console.log("LA PILA ESTA VACIA ")
    }
    
    let aux =this.cima.data;

this.cima=this.cima.siguiente;
this.size--;
return aux;

}

limpiarPila = () =>{
this.cima=null;
   
}
tam= () => {
    let temp =this.cima;
    let count =0;
    while(tempsudo){
        count++;
        temp=temp.siguiente;
    }
    return count;
  }
 /*  postFija(expresion) {
    let salida = "";
    let array=expresion.split("");
    let pila = new PilaLista();
    let diccionario = {
      "+": 1,
      "-": 1,
      "*": 2,
      "/": 2,
      "^": 3
    };
  
    for (let i = 0; i < array.tam(); i++) {
      let caracter = array[i];
      if (/^[a-zA-Z0-9]+$/.test(caracter)) {
        salida += caracter;
      } else if (caracter === "(") {
        pila.push(caracter);
      } else if (caracter=== ")") {
        while (pila.tam(pila) > 0 && pila[pila.tam(pila) - 1] !== "(") {
          salida += pila.pop();
        }
     //   pila.pop();
      } else {
        while ( pila.tam(pila)> 0 && pila[pila.tam(pila) - 1] !== "(" && diccionario[caracter] <= diccionario[pila[pila.tam(pila)- 1]]
        ) {
          salida += pila.pop();
        }
        pila.push(caracter);
      }
    }
  
    while (pila.tam(pila) > 0) {
      salida += pila.pop();
    }
  
console.log(salida);
console.log(pila.tam(pila));

} */

postFija(expresion){
  let pila= new PilaLista();
  let array=expresion.split("");
  let diccionario={
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 2,
    "^": 3
  };

  let salida=[];

  for(let i=0;i<=expresion.length;i++){
let char=array[i];
if(/^[a-zA-Z0-9]+$/.test(char)){
  
  salida+=char;
}else if(char==="("){
  pila.insertar(char);
}else if(char===")"){
  while( pila.cima!==null && pila.cima.data!=="("){
    salida.push(pila.pop());

  }
  pila.pop();

}
else{
  while(pila.cima!==null&&pila.cima.data!=="("&&diccionario[pila.cima.data>=diccionario[char]]){
    salida.push(pila.pop());
  }
  pila.insertar(char);
}



  }
  while(!pila.pilaVacia){
    salida.push(pila.pop());
  }
  return salida.join('');
}
}





