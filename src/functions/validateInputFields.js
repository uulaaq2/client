import { ConstructionOutlined } from '@mui/icons-material'
import { setError, setSuccess, setWarning } from './setReply'

const validateInputFields = (inputs) => {  
  try {        
    let inputValue = ''
    let errorText = ''
    let notChecked
    let erroredElements = []

    for (let key in inputs) {    
      errorText = ''
      notChecked = true
      if (inputs.hasOwnProperty(key)) {
          if (inputs[key].validate) {
            let currentKey= inputs[key]
  
            inputValue = currentKey.ref.current.value
            
            if (currentKey.required) {
              if (inputValue.replace(/\s+/g, '') === '') {
                errorText = currentKey.name + ' is required'
                erroredElements.push(currentKey.ref.current)
              }
  
              notChecked = false
            }
    
            if (currentKey.pattern && notChecked) {
              if (!inputValue.match(currentKey.pattern)) {
                errorText = 'Invalid ' + currentKey.name
                erroredElements.push(currentKey.ref.current)
              }
  
              notChecked = false
            }
    
            if (currentKey.match) {
              if(inputValue !== currentKey.match.current.value) {
                errorText = currentKey.matchLabel + ' should match ' + currentKey.name
                erroredElements.push(currentKey.ref.current)
              }
            }  
            
            currentKey.setErrorText(errorText)
          }
      }
    }   
    
    
    
    if (erroredElements.length > 0) {
      inputs.setErroredInputFields(erroredElements)
      return setWarning()
    } else {
      return setSuccess()
    }    
  } catch (error) {
    return setError(error)
  }
}

export default validateInputFields