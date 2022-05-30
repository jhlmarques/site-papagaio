const input_name = document.getElementById('name')
const input_container = document.getElementById('input-container')
const output_name = document.getElementById('generate-name-output')
const button = document.getElementById('generate-name-btn')
const mode_selection = document.getElementById('mode')
const output_container = document.getElementById('output-container')



const generateName = async () => {
  const user_input = input_name.value //.normalize("NFD").replace(/\p{Diacritic}/gu, "")   //Awful (?)
  
  if (user_input == ""){
    return
  }
  
  var msg
  const mode = mode_selection.value
  const url = `../generate?mode=${mode}&text=${user_input}`
  const generation_output = await fetch(url).then(
    response => {
      return response.json()
    }
  ).then(
    json => {
      return json
    }
  )

  if (generation_output.error){
    switch (generation_output.error){
      case 1:
        msg = "Por favor, use caracteres válidos apenas."
        break
      default:
        msg = "Erro desconhecido - contate o PET"
    }
  }
  else{
    console.log("GENERATED: " + generation_output.generated)
    const gen_msg = (mode == 0) ? "Seu nome Shakespeareano é " : "Texto gerado:\n"

    msg = gen_msg + generation_output.generated
  }

  input_container.style.display = 'none'
  output_container.style.display = 'flex'
  output_name.innerText = msg

}


const tryAgain = () => {
  input_container.style.display = 'flex'
  output_container.style.display = 'none'
  input_name.value = ''
}