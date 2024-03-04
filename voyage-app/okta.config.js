export default {
  oidc: {
    clientId: process.env.EXPO_PUBLIC_OKTA_CLIENT_ID,
    redirectUri: process.env.EXPO_PUBLIC_REDIRECT_URI,
    endSessionRedirectUri: process.env.EXPO_PUBLIC_LOGOUT_REDIRECT_URI, // e.g.: com.okta.example:/logout
    discoveryUri: process.env.EXPO_PUBLIC_ISSUER, // e.g.: https://dev-1234.okta.com/oauth2/default
    scopes: ['openid', 'profile', 'offline_access'],
    requireHardwareBackedKeyStore: false,
  },
};
