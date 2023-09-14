"use client";

import {useEffect} from "react";
import {Crisp} from "crisp-sdk-web";

export const CrispChat = () => {
     useEffect(() => {
          Crisp.configure( "21dcf0a1-cad2-40ef-9aea-9bcd2e8ac906")
     }, [])

     return null
}