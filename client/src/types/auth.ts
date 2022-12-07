export type Credentials = {
  email: string;
  password: string;
};

export type VerifyRegister = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
};

export type OnboardingType = {
  age: number;
  house_type: 'apartment' | 'house' | 'townhouse' | 'villa';
  has_pets: boolean;
  has_children: boolean;
  time_at_home: number;
  description: string;
  address?: string;
  latitude?: number;
  longitude?: number;
};
