import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { createUser, getCurrentUserProfileData } from '~/lib/provisioning';
import { authenticateUser, setPassword } from '~/lib/security';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

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
          label: 'Username',
        },
        firstName: {
          type: 'text',
          label: 'First Name',
        },
        lastName: {
          type: 'text',
          label: 'Last Name',
        },
        emailAddress: {
          label: 'Email Address',
          type: 'text',
          placeholder: '',
        },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        console.log(credentials);
        let password = credentials.password;
        let userObj = {
          email: credentials.emailAddress,
          familyName: credentials.lastName,
          fullName: `${credentials.firstName} ${credentials.lastName}`,
          givenName: credentials.firstName,
          forcePasswordChange: false,
          password,
          status: 'ACTIVE',
          username: credentials.username,
        };
        console.log(userObj);
        let user = await createUser(userObj);
        if (user.status == 200) {
          let response = await authenticateUser(
            credentials.username,
            credentials.password
          );
          const { status, data } = response;
          console.log('the data', data);
          if (status === 200) {
            let userProfile = await getCurrentUserProfileData(data.token);
            if (userProfile.status == 200) {
              let user = userProfile.data;
              console.log('user', user);
              return Promise.resolve(user);
            }
            return Promise.reject();
          } else {
            return Promise.reject();
          }
        } else {
          return Promise.reject();
        }
      },
    }),
    Providers.Credentials({
      id: 'login',
      name: 'Login',
      credentials: {
        emailAddress: {
          label: 'Email Address',
          type: 'text',
          placeholder: '',
        },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        let response = await authenticateUser(
          credentials.username,
          credentials.password
        );
        const { status, data } = response;
        if (status === 200) {
          let userProfile = await getCurrentUserProfileData(data.token);
          if (userProfile.status == 200) {
            let user = userProfile.data;
            return Promise.resolve(user);
          }
          return Promise.reject();
        } else {
          return Promise.reject();
        }
      },
    }),
  ],
  callbacks: {
    session: async (session, user) => {
      console.log('in the session', session);
      session.user = user.data;
      return Promise.resolve(session);
    },
    jwt: async (token, user, account, profile, isNewUser) => {
      // The user argument is only passed the first time this callback is called on a new session, after the user signs in
      if (user) {
        // Add a new prop on token for user data
        console.log('user', user);
        token.data = user;
      }
      return Promise.resolve(token);
    },
  },
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60,
  },
  debug: true,
};

export default (req, res) => NextAuth(req, res, options);
