import React from "react";
import axios from "axios";

export const checkAccount = async(value)=>{
    const [result] = await Promise.all([
        axios
        .get(`${process.env.API_URL}/staff/isInsertedAccount?account=${value}`,)
        .then(({ data }) => data.data), 
        ])
    if(result.length > 0){
        return(true)
    }else{
        return(false)
    }
}

export const checkEmail = async(value)=>{
    const [result] = await Promise.all([
        axios
        .get(`${process.env.API_URL}/staff/isInsertedEmail?staffEmail=${value}`,)
        .then(({ data }) => data.data), 
    ])
    if(result.length > 0){
        
        return(true)
    }else{
            
        return(false)
    }
}

export const checkPhone = async(value)=>{
    const [result] = await Promise.all([
        axios
        .get(`${process.env.API_URL}/staff/isInsertedPhoneNumber?phone=${value}`,)
        .then(({ data }) => data.data), 
    ])
    if(result.length > 0){
            
        return(true)
    }else{
            
        return(false)
    }
}

