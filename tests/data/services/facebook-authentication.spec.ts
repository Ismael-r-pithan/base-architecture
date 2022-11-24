import { FacebookAuthentication } from '../../../src/domain/features/facebook-authentication'
import { AuthenticationError } from '../../../src/domain/errors/authentication'
class FacebookAuthenticationService {
  constructor(private readonly loadFacebookUserByTokenApi: LoadFacebookUserByTokenApi) { }
  async auth(params: FacebookAuthentication.Params): Promise<AuthenticationError> {
    await this.loadFacebookUserByTokenApi.loadUserByToken(params.token)
    return new AuthenticationError()
  }
}

interface LoadFacebookUserByTokenApi {
  loadUserByToken: (token: string) => Promise<LoadFacebookUserApi.Result>
}

class LoadFacebookUserApiByTokenApiSpy implements LoadFacebookUserByTokenApi {
  token?: string
  result = undefined
  async loadUserByToken(token: string): Promise<LoadFacebookUserApi.Result> {
    this.token = token
    return this.result
  }
}

namespace LoadFacebookUserApi {
  export type Params = {
    token: string
  }

  export type Result = undefined
}

describe('FacebookAuthenticationService', () => {
  it('should call LoadFacebookUserByTokenApi with correct params', async () => {
    const loadFacebookUserByTokenApi = new LoadFacebookUserApiByTokenApiSpy()
    const fb = new FacebookAuthenticationService(loadFacebookUserByTokenApi)

    await fb.auth({ token: 'any_token' })

    expect(loadFacebookUserByTokenApi.token).toBe('any_token')
  })

  it('should return AuthenticationError when LoadFacebookUserByTokenApi returns undefined', async () => {
    const loadFacebookUserByTokenApi = new LoadFacebookUserApiByTokenApiSpy()
    loadFacebookUserByTokenApi.result = undefined
    const fb = new FacebookAuthenticationService(loadFacebookUserByTokenApi)

    const result = await fb.auth({ token: 'any_token' })

    expect(result).toEqual(new AuthenticationError())
  })
})
