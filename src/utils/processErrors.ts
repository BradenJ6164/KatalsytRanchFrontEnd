export function processErrors(errors: any[]) {
  let errorstring = ""
  if (!errors) {
    
    return "Internal Client Error"
  }
  errors.forEach(error => {
    if (typeof error === 'string') {
      errorstring = errorstring + " " + error
    } else if (typeof error === 'object') {
      if (error.message !== undefined) {
        errorstring = errorstring + " " + error.message + "\n"
      }
    }
  })
  return errorstring
}
