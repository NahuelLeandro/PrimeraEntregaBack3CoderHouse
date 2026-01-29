/* practica de fork*/

function operacionCompleja(){
    let result = 0;
    //calculo muy pesado
    for ( let i = 0 ; i < 5e10 ; i++){
        result += i;
    }

    return result;
}
//cuando el padre golpea compleja con .on se ejecuta la funcion
process.on("compleja", message =>{
    const result = operacionCompleja();
    process.send(result);//envia el resultado al proceso padre
})