import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth2'

passport.use(
  new GoogleStrategy(
    {
      clientID:
        '517990986942-om3ifr5o5vlhs5chtbrt18d3s21tn5i1.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:8080/auth/oauth/google/callback'
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: any
    ) => {
      done(null, profile)
    }
  )
)

export default passport
