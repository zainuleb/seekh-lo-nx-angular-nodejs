export class User {
  name?: string;
  email?: string;
  image?: string | ArrayBuffer | null;
  passwordHash?: string;
  contact?: string;
  isAdmin?: boolean;
  street?: string;
  house?: string;
  city?: string;
  state?: string;
  country?: string;
  zip?: string;
  role?: string;
}
