export interface User {
    ID: number;
    first_name: string;
    last_name: string;
    dni: string;
    phone: string;
    email: string;
    city: string;
    gender: string;
    age: number;
    birth_date: Date;
    deleted: boolean;
  }