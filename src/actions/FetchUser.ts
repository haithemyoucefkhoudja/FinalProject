
import { IUser } from "@/types/user"; // User interface

interface Credentials {
  email: string;
  password: string;
}
const fakeUsers: IUser[] = [
    {
        id: "c98e55d2-1163-4a6d-a7fc-0466b9d849aa",
        name: "Haithem",
        password: "123dsd",
        email: "haithemyk@gmail.com",
        role: "Mod" 
    },
    {
        id: "8c534938-9f61-4eb6-8484-7a8e665c1095",
        name: "Angry",
        password: "123dsd",
        email: "AngryWolf@gmail.com",
        role: "Gay" 
    },
    {
        id: "070552ea-4868-4081-b6e8-dafa0d42f6b8",
        name: "helios4",
        password: "123dsd",
        email: "helios@gmail.com",
        role: "Admin" 
    }
];

export default async function isUser({ credentials }: { credentials: Credentials }): Promise<IUser | null> {
  try {

    const user: IUser | null =  fakeUsers.filter( user=> user?.email == credentials.email)[0];

    if (!user) {
      return null;
    }

    const isMatch =  user.password == credentials.password;

    if (!isMatch) {
      return null;
    }

    return user;
  } catch (error) {
    console.error('Login error:', error);
    throw error; // Rethrow the error after logging
  }
};
