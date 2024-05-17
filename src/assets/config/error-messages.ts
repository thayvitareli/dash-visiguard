const strings = {
  required: "Campo obrigatório",
  string: "Valor inválido",
  number: "Valor inválido",
  maxLength: (size: string) => `Tamanho máximo de ${size} caracteres`,
  minLength: (size: string) => `Tamanho mínimo de ${size} caracteres`,
  length: (size: string) => `Tamanho deve ser de ${size} caracteres`,
  email: "Digite um e-mail válido",
  date: "Data inválida",
  phone: "Digite um número de celular válido",
};

export default strings;
