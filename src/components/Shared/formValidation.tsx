
function checkValidity(inputValue :any, rules: any) {

    let isValid = true;

    if ( !rules ) {
      return isValid; 
    }

    if ( rules.required ) {
      isValid = inputValue.trim() !== '' && isValid;
    }

    if ( rules.selection ) {
      isValid = inputValue !== '0' && isValid;
    }

    if ( rules.isLetters ) {
      
      const pattern = RegExp(/^[A-Za-z]+$/);
      isValid = inputValue.match(pattern) && isValid;
     }

    if ( rules.minLength ) {
      isValid = inputValue.trim().length >= rules.minLength && isValid;
    }

    if ( rules.maxLength ) {
      isValid = inputValue.trim().length <= rules.maxLength && isValid;
    }

    if ( rules.isEmail ) {
      
      //const pattern = RegExp(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
      const pattern = RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
      isValid = pattern.test(inputValue) && isValid;
     }

    return isValid;
  }
export default checkValidity;