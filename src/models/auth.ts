export interface IUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  email_verified_at?: string;
  position: string;
  status: string;
  created_at: string;
  updated_at: string;
  profile: IProfile;
}

export interface IProfile {
  id: number;
  id_profile: string;
  user_id: number;
  nick_name: string | null;
  address: string | null;
  date_of_birth: string | null;
  gender: string | null;
  id_image: string;
  id_cover_image: string;
  hashtag: string;
  level_number: number;
  experience_point: number;
  number_stars: number;
  school_name: string | null;
  class_name: string | null;
  created_at: string;
  updated_at: string;
}
