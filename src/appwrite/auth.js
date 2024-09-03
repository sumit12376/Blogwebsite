import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";

//we created a class and object then directly export
//taki hum apne login , signin ... me sidha object hi call kare (rather than new se bana ke)

export class AuthService {
      //need 2 things account and client
    client = new Client();
    account;// we did not new account when we call only we need (save resources b*tch)

     // constructor will only create when a instance is created
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
            
    }
      // we create function seperate so if in future we want to chnage backend (wrapper)
  // then code ki ma bhen na karni pade

    async createAccount({email, password, name}) {
        try {
             //this (appwrite)create method need first feild ID
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
               //call another method
        //we will call or redirect if success login to home
                return this.login({email, password});
            } else {
               return  userAccount;
            }
        } catch (error) {
            throw error;
        }
    }
  //now same for all
    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

  //this function to check is any body logged in ? (check session)
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }
  //agar try catch me fas gaya to bhi null kardo means (not logged in)
        return null;
    }

    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService