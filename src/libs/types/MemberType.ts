export default interface MemberType {
  id: string;
  userId: string;
  name: string;
  gender: string;
  dateOfBirth: Date;
  description: string;
  city: string;
  country: string;
  image: string | null;
  created: Date;
  updated: Date;
}
