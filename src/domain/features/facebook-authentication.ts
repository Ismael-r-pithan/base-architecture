import { AuthenticationError } from '../errors'
import { AccessToken } from '../models'

export interface FacebookAuthentication {
  auth: (token: FacebookAuthentication.Params) => Promise<FacebookAuthentication.Result>
}

namespace FacebookAuthentication {
  export type Params = {
    token: string
  }

  export type Result = AccessToken | AuthenticationError
}
