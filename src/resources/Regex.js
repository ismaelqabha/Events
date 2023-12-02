export const base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
export const emailVerification = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
// const phoneByCountry = {
//     US: /(\([0-9]{3}\)[\s-]|[0-9]{3}[\s-])[0-9]{3}[-\s][0-9]{4}/g,
//     GB: /(?:(?:\(?(?:0(?:0|11)\)?[\s-]?\(?|\+)?(44)\)?[\s-]?(? (...),
//     FR: /(?:(?:\(?(?:0(?:0|11)\)?[\s-]?\(?|\+)?(44)\)?[\s-]?(? (...),
//     PT: /(?:(?:\(?(?:0(?:0|11)\)?[\s-]?\(?|\+)?(44)\)?[\s-]?(? (...),
//     IE:  /(?:(?:\(?(?:0(?:0|11)\)?[\s-]?\(?|\+)?(44)\)?[\s-]?(? (...),
//     DE:  /(?:(?:\(?(?:0(?:0|11)\)?[\s-]?\(?|\+)?(44)\)?[\s-]?(? (...),
//   };