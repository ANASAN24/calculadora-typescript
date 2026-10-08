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

        // Crear la estructura de la calculadora
        this.crearCalculadora();


        // Buscar la pantalla DENTRO de esta calculadora
        this.pantalla =
            this.contenedor.querySelector(".pantalla") as HTMLInputElement;


        // Buscar los botones DENTRO de esta calculadora
        const botones =
            this.contenedor.querySelectorAll("button");


        // Listener de cada botón
        botones.forEach((boton) => {

            boton.addEventListener("click", () => {

                this.pulsarBoton(boton);

            });

        });
    }


    // Crea el HTML de la calculadora dentro del DIV
    private crearCalculadora(): void {

        this.contenedor.innerHTML = `

            <h1>Calculadora</h1>

            <input
                type="text"
                class="pantalla"
                readonly
            >

            <div class="botones">

                <button>C</button>
                <button>÷</button>
                <button>×</button>
                <button>-</button>

                <button>7</button>
                <button>8</button>
                <button>9</button>
                <button>+</button>

                <button>4</button>
                <button>5</button>
                <button>6</button>
                <button>=</button>

                <button>1</button>
                <button>2</button>
                <button>3</button>
                <button>0</button>

            </div>

        `;
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

            // Dejamos la pantalla vacía para escribir el segundo número
            this.pantalla.value = "";

            return;
        }


        // Resultado
        if (valor === "=") {

            const numero2 =
                Number(this.pantalla.value);


            const calculadora =
                new CalculadoraBasica(
                    this.numero1,
                    numero2
                );


            let resultado: number = 0;


            switch (this.operacion) {

                case "+":

                    resultado =
                        calculadora.sumar();

                    break;


                case "-":

                    resultado =
                        calculadora.restar();

                    break;


                case "×":

                    resultado =
                        calculadora.multiplicar();

                    break;


                case "÷":

                    if (numero2 === 0) {

                        this.pantalla.value = "Error";

                        return;
                    }

                    resultado =
                        calculadora.dividir();

                    break;
            }


            this.pantalla.value =
                resultado.toString();

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

    new CalculadoraUI(
        elemento as HTMLElement
    );

});

class CronometroUI {

    private contenedor: HTMLElement;
    private pantalla: HTMLElement;

    private segundos: number = 0;
    private intervalo: number | null = null;

    constructor(contenedor: HTMLElement) {

        this.contenedor = contenedor;

        this.crearCronometro();

        this.pantalla =
            this.contenedor.querySelector(".pantalla") as HTMLElement;

        const iniciar =
            this.contenedor.querySelector(".iniciar") as HTMLButtonElement;

        const pausar =
            this.contenedor.querySelector(".pausar") as HTMLButtonElement;

        const reiniciar =
            this.contenedor.querySelector(".reiniciar") as HTMLButtonElement;

        iniciar.addEventListener("click", () => this.iniciar());
        pausar.addEventListener("click", () => this.pausar());
        reiniciar.addEventListener("click", () => this.reiniciar());
    }

    private crearCronometro(): void {

        this.contenedor.innerHTML = `

            <h1>Cronómetro</h1>

            <div class="pantalla">
                00:00
            </div>

            <button class="iniciar">
                Iniciar
            </button>

            <button class="pausar">
                Pausar
            </button>

            <button class="reiniciar">
                Reiniciar
            </button>

        `;
    }

    private iniciar(): void {

        if (this.intervalo !== null) {
            return;
        }

        this.intervalo = window.setInterval(() => {

            this.segundos++;

            this.actualizarPantalla();

        }, 1000);
    }

    private pausar(): void {

        if (this.intervalo !== null) {

            clearInterval(this.intervalo);

            this.intervalo = null;
        }
    }

    private reiniciar(): void {

        this.pausar();

        this.segundos = 0;

        this.actualizarPantalla();
    }

       private actualizarPantalla(): void {

        const minutos =
            Math.floor(this.segundos / 60);

        const segundos =
            this.segundos % 60;

        this.pantalla.textContent =
            `${minutos.toString().padStart(2, "0")}:${segundos.toString().padStart(2, "0")}`;
    }
}


// Crear los cronómetros del HTML
const cronometros =
    document.querySelectorAll(".cronometro");

cronometros.forEach((elemento) => {

    new CronometroUI(
        elemento as HTMLElement
    );

});