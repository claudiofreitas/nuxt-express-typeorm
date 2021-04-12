import HttpException from './HttpException'

class InvalidCheckoutTimeException extends HttpException {
  constructor(currentTime: string) {
    super(400, `Checkout time is invalid ${currentTime}`)
  }
}

export default InvalidCheckoutTimeException
