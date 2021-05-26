import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { createUser, getCurrentUserProfileData } from '~/lib/provisioning';
import { authenticateUser, exchangeToken } from '~/lib/security';

const options = {
  site: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  // Configure one or more authentication providers
  providers: [
    Providers.Credentials({
      id: 'register',
      name: 'Register',
      credentials: {
        username: {
          type: 'text',
          label: 'Username'
        },
        firstName: {
          type: 'text',
          label: 'First Name'
        },
        lastName: {
          type: 'text',
          label: 'Last Name'
        },
        emailAddress: {
          label: 'Email Address',
          type: 'text',
          placeholder: ''
        },
        password: { label: 'Password', type: 'password' }
      },
      authorize: async (credentials) => {
        let password = credentials.password;
        let userObj = {
          email: credentials.emailAddress,
          familyName: credentials.lastName,
          fullName: `${credentials.firstName} ${credentials.lastName}`,
          givenName: credentials.firstName,
          forcePasswordChange: false,
          password,
          status: 'ACTIVE',
          username: credentials.username
        };
        let user = await createUser(userObj);
        if (user.status == 200) {
          let response = await authenticateUser(credentials.username, credentials.password);
          const authenticateUserResponse = response;
          if (authenticateUserResponse.status === 200) {
            let userProfile = await getCurrentUserProfileData(authenticateUserResponse.data.token);
            if (userProfile.status == 200) {
              let user = userProfile.data;
              let expiresAt = new Date();
              expiresAt.setSeconds(expiresAt.getSeconds() + 900);
              let userSessionObj = {
                token: authenticateUserResponse.data.token,
                username: user.username,
                givenName: user.givenName,
                expires: expiresAt
              };
              return Promise.resolve(userSessionObj);
            }
            return Promise.reject(userProfile);
          } else {
            return Promise.reject(authenticateUserResponse);
          }
        } else {
          let error = user.data.message;
          throw new Error(error);
        }
      }
    }),
    Providers.Credentials({
      id: 'login',
      name: 'Login',
      credentials: {
        emailAddress: {
          label: 'Email Address',
          type: 'text',
          placeholder: ''
        },
        password: { label: 'Password', type: 'password' }
      },
      authorize: async (credentials) => {
        let response = await authenticateUser(credentials.username, credentials.password);
        const { status, data } = response;
        if (status === 200) {
          let userProfile = await getCurrentUserProfileData(data.token);
          if (userProfile.status == 200) {
            let user = userProfile.data;
            let expiresAt = new Date();
            expiresAt.setSeconds(expiresAt.getSeconds() + 900);
            let userSessionObj = {
              token: data.token,
              username: user.username,
              givenName: user.givenName,
              expires: expiresAt
            };
            return Promise.resolve(userSessionObj);
          }
          return Promise.reject();
        } else {
          return Promise.reject();
        }
      }
    }),
    Providers.Credentials({
      id: 'update-session',
      name: 'Update Session',
      credentials: {
        token: {
          label: 'Token',
          type: 'text',
          placeholder: ''
        }
      },
      authorize: async (credentials) => {
        let userProfile = await getCurrentUserProfileData(credentials.token);
        if (userProfile.status == 200) {
          let user = userProfile.data;
          let expiresAt = new Date();
          expiresAt.setSeconds(expiresAt.getSeconds() + 900);
          let userSessionObj = {
            token: credentials.token,
            username: user.username,
            givenName: user.givenName,
            expires: expiresAt
          };
          return Promise.resolve(userSessionObj);
        }
        return Promise.reject();
      }
    })
  ],
  callbacks: {
    session: async (session, user) => {
      session.user = user.data;
      // Renew token if token expires in 5 minutes.
      let now = new Date().getTime() / 1000;
      let expires = new Date(session.user.expires).getTime() / 1000;
      console.log('session time left: ', expires - now);
      if (expires - now < 500) {
        console.log('I need to reauthenticate my token ' + session.user.token);
        let newToken = await exchangeToken(session.user.token);
        session.user.token = newToken.data.token;
        let expiresAt = new Date();
        expiresAt.setSeconds(expiresAt.getSeconds() + 900);
        session.user.expires = expiresAt;
      }
      return Promise.resolve(session);
    },
    jwt: async (token, user) => {
      if (user) {
        token.data = user;
      }
      return Promise.resolve(token);
    }
  },
  session: {
    jwt: true
  },
  debug: true
};

export default (req, res) => NextAuth(req, res, options);
