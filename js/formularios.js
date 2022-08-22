const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{6,15}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
}

const campos = {
	usuario: false,
	email: false,
	password: false,
}

const validarFormulario = (e) => {
    switch(e.target.name) {
        case "user":
            validarCampo(expresiones.usuario, e.target, 'usuario')
        break;

        case "email":
            validarCampo(expresiones.correo, e.target, 'email')
        break;

        case "password":
            validarCampo(expresiones.password, e.target, 'password')
            validarPassword2();
        break;

        case "password2":
            validarPassword2();
        break;
    }
}


// Variable de mensaje de error
const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo--${campo}`).classList.remove('form-grupo-incorrecto');
		document.getElementById(`grupo--${campo}`).classList.add('form-grupo-correcto');
		document.querySelector(`#grupo__${campo} .formulario--input-error`).classList.remove('formulario--input-error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo--${campo}`).classList.add('form-grupo-incorrecto');
		document.getElementById(`grupo--${campo}`).classList.remove('form-grupo-correcto');
		document.querySelector(`#grupo--${campo} .formulario--input-error`).classList.add('formulario--input-error-activo');
		campos[campo] = false;
	}
}

// Variable para la verificacion de la password
const validarPassword2 = () => {
	const inputPassword1 = document.getElementById('password');
	const inputPassword2 = document.getElementById('password2');

    if(inputPassword1.value !== inputPassword2.value){
        document.getElementById(`grupo--password2`).classList.add('form-group-incorrecto');
        document.getElementById(`grupo--password2`).classList.remove('form-group-correcto');
        document.querySelector(`#grupo--password2 .formulario--input-error`).classList.add('formulario--input-error-activo');
        campos['password'] = false;
    } else {
        document.getElementById(`grupo--password2`).classList.remove('form-group-incorrecto');
        document.getElementById(`grupo--password2`).classList.add('form-group-correcto');
        document.querySelector(`#grupo--password2 .formulario--input-error`).classList.remove('formulario--input-error-activo');
        campos['password'] = true;
    }
}


inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const terminos = document.getElementById('terminos')

    if(campos.user && campos.email && campos.password && terminos.checked){
        formulario.reset();
    }
});



// NO USAR

// Codigo para mostrar mensaje de error (uno por cada input)
            // if(expresiones.password.test(e.target.value)){
            //     document.getElementById('grupo--password').classList.remove('form-group-incorrecto'); 
            //     document.getElementById('grupo--password').classList.add('form-group-correcto');
            //     document.querySelector('#grupo--password .formulario--input-error').classList.remove('formulario--input-error-activo');
            //     campos['password'] = true;
            // } else{
            //     document.getElementById('grupo--password').classList.add('form-group-incorrecto');
            //     document.getElementById('grupo--password').classList.remove('form-group-correcto');
            //     document.querySelector('#grupo--password .formulario--input-error').classList.add('formulario--input-error-activo');
            //     campos['password'] = false;
            // }