// Clase principal
class Calculadora {

    protected numero1: number;
    protected numero2: number;

    constructor() {
        this.numero1 = 0;
        this.numero2 = 0;
    }

    sumar(): number {
        return this.numero1 + this.numero2;
    }

    restar(): number {
        return this.numero1 - this.numero2;
    }

    multiplicar(): number {
        return this.numero1 * this.numero2;
    }

    dividir(): number {
        if (this.numero2 === 0) {
            return 0;
        }

        return this.numero1 / this.numero2;
    }
}


// Herencia
class CalculadoraBasica extends Calculadora {

    constructor(numero1: number, numero2: number) {
        super();

        this.numero1 = numero1;
        this.numero2 = numero2;
    }
}


// Elementos de la página
const pantalla = document.getElementById("pantalla") as HTMLInputElement;
const botones = document.querySelectorAll("button");

let numero1: number = 0;
let operacion: string = "";


// Listener para los botones
botones.forEach((boton) => {

    boton.addEventListener("click", () => {

        const valor = boton.textContent;

        if (valor === null) {
            return;
        }

        // Botón C
        if (valor === "C") {
            pantalla.value = "";
            numero1 = 0;
            operacion = "";
            return;
        }

        // Operaciones
        if (valor === "+" || valor === "-" || valor === "×" || valor === "÷") {

            numero1 = Number(pantalla.value);
            operacion = valor;
            pantalla.value = numero1 + " " + operacion + " ";

            return;
        }

        // Resultado
        if (valor === "=") {

            const numero2 = Number(pantalla.value);

            const calculadora = new CalculadoraBasica(numero1, numero2);

            let resultado: number = 0;

            switch (operacion) {

                case "+":
                    resultado = calculadora.sumar();
                    break;

                case "-":
                    resultado = calculadora.restar();
                    break;

                case "×":
                    resultado = calculadora.multiplicar();
                    break;

                case "÷":

                    if (numero2 === 0) {
                        pantalla.value = "Error";
                        return;
                    }

                    resultado = calculadora.dividir();
                    break;
            }

            pantalla.value = resultado.toString();

            return;
        }

        // Números
        pantalla.value += valor;
    });
});