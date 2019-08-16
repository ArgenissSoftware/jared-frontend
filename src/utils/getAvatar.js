import { md5 } from '../services/util.service';

export default function(email, query) {
  const formattedEmail = ('' + email).trim().toLowerCase();
  let hash = md5(formattedEmail);
  return `https://www.gravatar.com/avatar/${hash}.jpg?${query}`;
}