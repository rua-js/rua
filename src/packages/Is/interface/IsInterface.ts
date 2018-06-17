
interface IsInterface {
  email(email: string): boolean
  phone(phone: string | number): boolean
  string(string: any): boolean
  number(number: any): boolean
  numeric(number: any): boolean
  float(number: any): boolean
}

export default IsInterface
