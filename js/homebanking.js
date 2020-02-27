//Declaración de variables
var nombreUsuario="Rodrigo";
var saldoCuenta=50000;
var limiteExtraccion=10000;

var agua=350;
var telefono=425;
var luz=210;
var internet=570;

var cuentaAmiga1=1234567; //numero de cuenta predefinido para la prueba de "transferir dinero".
var cuentaAmiga2=7654321; //numero de cuenta predefinido para la prueba de "transferir dinero".

var codSeguridad=7846; //codigo de seguridad predefinido para el inicio de sesion.
var claveIngresada=null;
var ingreso=false;

//Ejecución de las funciones que actualizan los valores de las variables en el HTML.
window.onload = function() {
	if(iniciarSesion()){
	    cargarNombreEnPantalla();
	    actualizarSaldoEnPantalla();
	    actualizarLimiteEnPantalla();
    }else{if(isNaN(claveIngresada)){
	    	document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
	    	document.getElementById("limite-extraccion").innerHTML = "PARA OPERAR DEBE INICIAR SESIÓN";
    		}else{
    		document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
	    	document.getElementById("limite-extraccion").innerHTML = "DINERO RETENIDO";		
    		}
    }
}

//Funciones a crear
function sumarDinero(dinero){
	saldoCuenta+=dinero;
}

function restarDinero(dinero){
	saldoCuenta-=dinero;
}

function haySaldoDisponible(importe){
	var confirmacion=true;
	if(importe>saldoCuenta){
		confirmacion=false;
	}else{
		confirmacion=true;
	}
	return confirmacion;
}

function consultarLimiteDeExtraccion(importe){
	var confirmacion=true;
	if(importe>limiteExtraccion){
		confirmacion=false;
	}else{
		confirmacion=true;
	}
	return confirmacion;

}

function consultarCambio(importe){
	var confirmacion=true;
	var resto=0;

	resto=importe%100;
	if(resto==0){
		confirmacion=true;
	}else{
		confirmacion=false;
	}
	return confirmacion;
}

function validarDatoIncorrecto(dato){  //valida que dato no contenga letras, si es un dato incorrecto devuelve true.
	if(isNaN(dato/10) || dato==""){
		return true;
	}else{
		return false;
	}
}

//Funciones que tenes que completar
function cambiarLimiteDeExtraccion() {
	
	if(ingreso){
		limiteExtraccion=prompt("Nuevo limite de extracción: ");
		validacion=validarDatoIncorrecto(limiteExtraccion);

		if(limiteExtraccion<0 || validacion){
			alert("El valor solicitado no es valido");

		}else{
			actualizarLimiteEnPantalla();
			alert("Nuevo Limite de extracción: " + limiteExtraccion);						
		}
	}else{

		alert("Para operar debe iniciar sesión.");
	}
}

function extraerDinero() {
	var saldoAnterior=saldoCuenta;

	if(ingreso){
		var dinero=prompt("Extracción: ");
		
		validacion=validarDatoIncorrecto(dinero);
		

		if(isNaN(dinero) || dinero<0 || validacion ){ 
			alert("Dato incorrecto. Por favor ingrese el valor numérico");
		}else{

			var saldoAnterior=saldoCuenta;
			if(haySaldoDisponible(dinero)){
				if(consultarLimiteDeExtraccion(dinero)){
					if(consultarCambio(dinero)){
						restarDinero(parseInt(dinero));
						console.log(saldoCuenta);
						actualizarSaldoEnPantalla();
						alert("Has retirado: $" + dinero +"\n\nSaldo Anterior: $"+ saldoAnterior + "\n\nSaldo Actual: $" + saldoCuenta + "\n\n");
					}else{
						alert("Solo puedes extraer billetes de $100, intentalo nuevamente ")
					}
				}else{
					alert("La cantidad de dinero que deseas extraer es mayor a tu limite de extracción");
				}
			}else{
				alert("No hay saldo disponible en tu cuenta para extraer esa cantidad de dinero")
			}
		}
	}else{
		alert("Para operar debe iniciar sesión.");
	}
}

function depositarDinero() {
	if(ingreso){
		var saldoAnterior=saldoCuenta;
		var dinero=prompt("Ingrese la cantidad a depositar: ");

		validacion=validarDatoIncorrecto(dinero);
		
		if(dinero<0 || validacion){
			alert("El importe que desea depositar no es valido");
			return;			
			
		}else{
			sumarDinero(parseInt(dinero));
			console.log(saldoCuenta);
			actualizarSaldoEnPantalla();
			alert("Has depositado: $" + dinero +"\n\nSaldo Anterior: $"+ saldoAnterior + "\n\nSaldo Actual: $" + saldoCuenta + "\n\n");
		}
	}else{
		alert("Para operar debe iniciar sesión.");	

	}

}

function pagarServicio() {
	if(ingreso){
		var opcion=parseInt(prompt("Ingrese el número que corresponda con el servicio que querés pagar: \n1-Agua\n2-Luz\n3-Internet\n4-Teléfono"));
		var confirmacion=true;
		switch(opcion){
			case 1:

				if(haySaldoDisponible(agua)){
					var saldoAnterior=saldoCuenta;
					restarDinero(agua);
					alert("Has pagado el servicio de Agua:\n Saldo anterior:$"+saldoAnterior+"\n Dinero descontado:$"+agua+"\n Saldo actual:$"+saldoCuenta);
					actualizarSaldoEnPantalla();
				}else{
					alert("No hay suficiente saldo en tu cuenta para pagar este servicio");
				}
				break;
			case 2:
				if(haySaldoDisponible(luz)){
					var saldoAnterior=saldoCuenta;
					restarDinero(luz);
					alert("Has pagado el servicio de Agua:\n Saldo anterior:$"+saldoAnterior+"\n Dinero descontado:$"+luz+"\n Saldo actual:$"+saldoCuenta);
					actualizarSaldoEnPantalla();
				}else{
					alert("No hay suficiente saldo en tu cuenta para pagar este servicio");
				}		
				break;
			case 3:
				if(haySaldoDisponible(internet)){
					var saldoAnterior=saldoCuenta;
					restarDinero(internet);
					alert("Has pagado el servicio de Agua:\n Saldo anterior:$"+saldoAnterior+"\n Dinero descontado:$"+internet+"\n Saldo actual:$"+saldoCuenta);
					actualizarSaldoEnPantalla();
				}else{
					alert("No hay suficiente saldo en tu cuenta para pagar este servicio");
				}				
				break;
			case 4:
				if(haySaldoDisponible(telefono)){
					var saldoAnterior=saldoCuenta;
					restarDinero(telefono);
					alert("Has pagado el servicio de Agua:\n Saldo anterior:$"+saldoAnterior+"\n Dinero descontado:$"+telefono+"\n Saldo actual:$"+saldoCuenta);
					actualizarSaldoEnPantalla();
				}else{
					alert("No hay suficiente saldo en tu cuenta para pagar este servicio");
				}				
				break;
			default:
				alert("No existe el servicio que se ha seleccionado.");
		}
	}else{
		alert("Para operar debe iniciar sesión.");	
	}
}

function transferirDinero() {
	if(ingreso){

		var montoAtransferir=0;
		var numCuenta=0;
		montoAtransferir=prompt("Ingrese el monto que desea transferir:");
		validacion=validarDatoIncorrecto(montoAtransferir);
		if(isNaN(montoAtransferir) || montoAtransferir<0 || validacion){
			alert("Dato incorrecto. Por favor ingrese el valor numérico");
		}else{

			if(haySaldoDisponible(montoAtransferir)){
				numCuenta=prompt("Ingrese el numero de cuenta destino:");
				if(numCuenta==cuentaAmiga1 || numCuenta==cuentaAmiga2){
					restarDinero(montoAtransferir);
					alert("Se han transferido "+montoAtransferir+"\nCuenta destino:"+numCuenta);
					actualizarSaldoEnPantalla();

				}else{
					alert("Solo se puede transferir dinero a una cuenta amiga");
				}

			}else{
				alert("No hay suficiente saldo en tu cuenta para realizar la transferencia");
			}
		}
	}else{
		alert("Para operar debe iniciar sesión.");		

	}
}

function iniciarSesion() {

	
	var claveIngresada = prompt("Ingrese clave: ");
	var datoIncorrecto=validarDatoIncorrecto(claveIngresada); //consulto que no ingresen letras
	
	if(claveIngresada==codSeguridad && datoIncorrecto== false){
		alert("Bienvenido "+nombreUsuario +" ya puedes comenzar ha realizar operaciones.");
		
		
		ingreso=true;
		return true;


	}else{
		if(datoIncorrecto==true) {  //valido que no ingresó letras ni espacio en blanco
			alert("Ingreso fallido. Operación cancelada.");
			saldoCuenta=0;

			
			return false;

		}else{
			alert("Código incorrecto. Tu dinero ha sido retenido por cuestiones de seguridad.");
			saldoCuenta=0;
			
			return false;
		}
	}

}

//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
}

function actualizarSaldoEnPantalla() {
    document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
}

function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}
