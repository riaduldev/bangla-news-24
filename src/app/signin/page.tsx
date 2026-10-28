"use client"

import { signIn } from "@/lib/auth-client";
import { redirect } from "next/navigation";


const SignInPage = () => {
    const onSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const user = Object.fromEntries(formData.entries()) as {name:string, email: string , password:string, image:string};

        // console.log(user);
        const {data, error} = await signIn.email({
                     ...user,
                     callbackURL: "/"
                })
                if(data) {
                    console.log(data);
                    redirect("/")
                }
                if(error){
                    console.log(error);
                }

    }
    return (
        <div className="flex flex-col items-center justify-center mt-5">
            <h2 className="font-bold text-3xl">Sign-In Now</h2>
             <form onSubmit={onSubmit}>
            <fieldset className="fieldset border-base-300 rounded-box w-xs p-4">

  <label className="label">Email</label>
  <input name="email" type="email" className="input" placeholder="Email" />

  <label className="label">Password</label>
  <input name="password" type="password" className="input" placeholder="Password" />

  <button type="submit" className="btn bg-red-700 text-white mt-4">Sign-In</button>
</fieldset>
           </form>
        </div>
    );
};

export default SignInPage;