import { environment } from '../../environments/environment';

function getGoogleOAuthURL() {
  const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
  const options = {
    redirect_uri: 'http://localhost:3000/auth/authenticate/google',
    client_id: environment.googleClientID,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ].join(' '),
  };

  console.log({ options });

  const qs = new URLSearchParams(options);

  console.log(qs.toString());

  return `${rootUrl}?${qs.toString()}`;
}

export default getGoogleOAuthURL;
