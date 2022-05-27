const input_name = document.getElementById('name')
const input_container = document.getElementById('input-container')
const output_name = document.getElementById('generate-name-output')
const button = document.getElementById('generate-name-btn')
const output_container = document.getElementById('output-container')



const generateName = async () => {
  const user_input = input_name.value //.normalize("NFD").replace(/\p{Diacritic}/gu, "")   //Awful (?)
  
  if (user_input == ""){
    return
  }
  
  const generated = await getNetworkOutput(user_input, "text")

  console.log("GENERATED: " + generated)
  input_container.style.display = 'none'
  output_container.style.display = 'flex'
  output_name.innerText = generated
}

const getNetworkOutput = async (user_input, mode) => {
  const url = `../generate?mode=${mode}&name=${user_input}`
  console.log(url)
  const generated = await fetch(url).then(
    response => {
      return response.json()
    }
  ).then(
    json => {
      return json.generated
    }
  )
  return generated
}

const tryAgain = () => {
  input_container.style.display = 'flex'
  output_container.style.display = 'none'
  input_name.value = ''
}