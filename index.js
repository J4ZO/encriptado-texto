// Texto Encriptar - Desencriptar
const textEncriptar = document.querySelector('.texto-encriptar');
const text = document.querySelector('.texto');

// Texto advertencia
const advertencia = document.querySelector('.advertencia');
const iconAdvertencia = document.querySelector('.advertencia-icon');
const alert = document.querySelector('.alertLetras');

//  botones
const encriptar = document.getElementById('encriptar');
const desencriptar = document.getElementById('desencriptar');
const copiar = document.getElementById('copiar');

// Texto resultante
const resultado = document.querySelector('.mostrarTexto');
const noTexto = document.querySelector('.notexto');

// Copia
const copiado = document.querySelector('.copiado');

// Funcion que muestra si hay texto o no
function toggleTexto(value) {
    if (value) {
        resultado.classList.remove('none');
        noTexto.classList.add('none');
        copiar.classList.remove('none');
    } else {
        resultado.classList.add('none');
        noTexto.classList.remove('none');
        copiar.classList.add('none');
    }
}


// Funcion de obtener texto y encriptarlo
function obtenerTexto() {
    const value = textEncriptar.value;
    let valorEncriptado = '';
    if (value.length < 1) {
        toggleTexto(false);
    } else {
        for (let letra = 0; letra < value.length; letra++) {
            switch (value[letra]) {
                case 'a':
                    valorEncriptado += 'ai';
                    break;
                case 'e':
                    valorEncriptado += 'enter';
                    break;
                case 'i':
                    valorEncriptado += 'imes';

                    break;
                case 'o':
                    valorEncriptado += 'ober';
                    break;
                case 'u':
                    valorEncriptado += 'ufat';
                    break;

                default:
                    valorEncriptado += value[letra];
                    break;
            }

        }
        toggleTexto(true);
        resultado.innerText = valorEncriptado;
    }
}
// Funcion de obtener texto y desencriptarlo
function desencriptarTexto() {
    let value = textEncriptar.value;
    const valores = ['ai', 'enter', 'imes', 'ober', 'ufat'];
    let valorDesencriptado;
    if (value.length < 1) {
        toggleTexto(false);
    } else {
        for (const i of valores) {
            if (value.includes(i)) {
                switch (i) {
                    case 'ai':
                        valorDesencriptado = value.replaceAll('ai', 'a');
                        value = valorDesencriptado;
                        break;
                    case 'enter':
                        valorDesencriptado = value.replaceAll('enter', 'e');
                        value = valorDesencriptado;
                        break;
                    case 'imes':
                        valorDesencriptado = value.replaceAll('imes', 'i');
                        value = valorDesencriptado;
                        break;
                    case 'ober':
                        valorDesencriptado = value.replaceAll('ober', 'o');
                        value = valorDesencriptado;
                        break;
                    case 'ufat':
                        valorDesencriptado = value.replace('ufat', 'u');
                        value = valorDesencriptado;
                        break;

                    default:
                        break;
                }
            }

        }
        toggleTexto(true);
        resultado.innerText = value;
    }
}

// Funcion copiar
function copiarTexto() {
    let seleccion = document.createRange();
    seleccion.selectNodeContents(resultado);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(seleccion);
    let res = document.execCommand('copy');
    window.getSelection().removeRange(seleccion);
}

// Bloquea mayusculas y acentos
function bloquearMayusculas() {
    const valorTexto = textEncriptar.value;
    const regex = /[A-Z]|[á-é-í-ó-ú]/g;
    const encontrar = valorTexto.match(regex);
    try {
        if (encontrar.length >= 1) {
            encriptar.setAttribute('disabled', '');
            desencriptar.setAttribute('disabled', '');
            copiar.setAttribute('disabled', '');
            advertencia.classList.add('alert');
            iconAdvertencia.classList.add('alert-icon');
        }
    } catch (error) {
        encriptar.removeAttribute('disabled');
        desencriptar.removeAttribute('disabled');
        copiar.removeAttribute('disabled');
        advertencia.classList.remove('alert');
        iconAdvertencia.classList.remove('alert-icon');
    }

}

// Funcion que detecta que no hay texto
function hayTexto() {
    const value = textEncriptar.value;
    if (value.length < 1) {
        resultado.classList.add('none');
        noTexto.classList.remove('none');
        copiar.classList.add('none');
    }

    if (value.length == 200) {
        alert.classList.add('alertaTexto');
    } else {
        alert.classList.remove('alertaTexto');
    }
}

// Funcion que muestra si ya se hizo la copia
function mostrarCopiado() {
    copiado.classList.add('impulso');
    setTimeout(() => {
        copiado.classList.remove('impulso');
    }, 1500);
}




// Eventos
encriptar.addEventListener('click', obtenerTexto);
desencriptar.addEventListener('click', desencriptarTexto);
copiar.addEventListener('click', copiarTexto);
copiar.addEventListener('click', mostrarCopiado);
textEncriptar.addEventListener('input', bloquearMayusculas);
textEncriptar.addEventListener('input', hayTexto);
