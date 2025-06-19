import ImageKit from "imagekit";
import config from "@/lib/config";
import { NextResponse } from "next/server";


const {env:{
    imagekit:
    {publickey,privatekey,urlEndpoint}
}}=config;

const imagekit=new ImageKit(opts:{
     publicKey:config.env.imagekit.publickey,
     privatekey:config.env.imagekit.privatekey,
     urlEndpoint:config.env.imagekit.urlEndpoint,
});

export async function GET(){
    return NextResponse.json(
        imagekit.getAuthenticationParameters()
    );
}