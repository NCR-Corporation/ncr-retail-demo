import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { findConsumer, createConsumer } from '~/lib/cdm';
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
        password = bcrypt.hashSync(password, salt);
        // let user = {
        //   password: password,
        //   consumerProfile: {
        //     profileUsername: credentials.emailAddress,
        //     firstName: credentials.firstName,
        //     lastName: credentials.lastName,
        //     identifiersData: [
        //       {
        //         fieldName: 'emailAddress',
        //         fieldValue: credentials.emailAddress,
        //         status: 'ACTIVE',
        //       },
        //     ],
        //   },
        // };
        let user = {
          email: credentials.emailAddress,
          fullName: `${credentials.firstName} ${credentials.lastName}`,
          givenName: credentials.firstName,
          password,
          status: 'ACTIVE',
          username: credentials.emailAddress,
        };
        console.log(user);
        let consumer = await createConsumer(user);
        console.log(consumer);
        return Promise.resolve(consumer);
      },
    }),
    Providers.Credentials({
      id: 'login',
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Login',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        emailAddress: {
          label: 'Email Address',
          type: 'text',
          placeholder: '',
        },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        let consumer = await findConsumer(credentials.emailAddress);
        if (consumer.data.numberFound === 0) {
          return Promise.reject();
        } else {
        }

        console.log('here', credentials);
        if (false) {
          // Any object returned will be saved in `user` property of the JWT
          return Promise.resolve(user);
        } else {
          // If you return null or false then the credentials will be rejected
          console.log('yo');
          return Promise.reject();
          // You can also Reject this callback with an Error or with a URL:
          // return Promise.reject(new Error('error message')) // Redirect to error page
          // return Promise.reject('/path/to/redirect')        // Redirect to a URL
        }
      },
    }),
  ],

  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60,
  },
  debug: true,
};

export default (req, res) => NextAuth(req, res, options);
