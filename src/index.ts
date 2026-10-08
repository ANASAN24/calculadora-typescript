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


// Clase para la calculadora de la página
class CalculadoraUI {

    private contenedor: HTMLElement;
    private pantalla: HTMLInputElement;

    private numero1: number = 0;
    private operacion: string = "";


    constructor(contenedor: HTMLElement) {

        this.contenedor = contenedor;

        // Buscamos la pantalla DENTRO de esta calculadora
        this.pantalla =
            this.contenedor.querySelector(".pantalla") as HTMLInputElement;

        // Buscamos los botones DENTRO de esta calculadora
        const botones =
            this.contenedor.querySelectorAll("button");


        // Listener de cada botón de ESTA calculadora
        botones.forEach((boton) => {

            boton.addEventListener("click", () => {

                this.pulsarBoton(boton);

            });

        });
    }


    pulsarBoton(boton: Element): void {

        const valor = boton.textContent;

        if (valor === null) {
            return;
        }


        // Botón C
        if (valor === "C") {

            this.pantalla.value = "";
            this.numero1 = 0;
            this.operacion = "";

            return;
        }


        // Operaciones
        if (
            valor === "+" ||
            valor === "-" ||
            valor === "×" ||
            valor === "÷"
        ) {

            this.numero1 = Number(this.pantalla.value);
            this.operacion = valor;

            this.pantalla.value = "";

            return;
        }


        // Resultado
        if (valor === "=") {

            const numero2 = Number(this.pantalla.value);

            const calculadora =
                new CalculadoraBasica(this.numero1, numero2);

            let resultado: number = 0;


            switch (this.operacion) {

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

                        this.pantalla.value = "Error";

                        return;
                    }

                    resultado = calculadora.dividir();

                    break;
            }


            this.pantalla.value = resultado.toString();

            return;
        }


        // Números
        this.pantalla.value += valor;
    }
}


// Buscar todas las calculadoras del HTML
const calculadoras =
    document.querySelectorAll(".calculadora");


// Crear una CalculadoraUI para cada DIV
calculadoras.forEach((elemento) => {

    new CalculadoraUI(elemento as HTMLElement);

});