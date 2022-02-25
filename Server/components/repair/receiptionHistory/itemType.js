import React, { useEffect, useState } from "react";
import { setSelectType } from "../../../functions/useInRepairReceiptModal";

export default function ItemType(props){
    const key  =  props.index;
    const type1 = props.type1;
    const type2 = props.type2;
    const type3 = props.type3;
    const repiarType = props.repiarType;
    let list =  setSelectType(repiarType);
    let defaultSelect;
    if(key+1 === 1){
        
        defaultSelect =(
            <select defaultValue={type1} style={{borderWidth:0,borderBottomWidth:2 ,marginLeft:10}}
                onChange={(e)=>{
                    let price;
                    repiarType.map((el)=>{
                        if(el.value == e.target.value){
                            console.log(el.repair_price , e.target.value)
                            price = el.repair_price
                        }

                    })
                    props.onChange(e,price)
                }}>
                {
                    list
                }
            </select>
        )
    }else if(key+1 === 2){
        defaultSelect =(
            <select defaultValue={type2} style={{borderWidth:0,borderBottomWidth:2 ,marginLeft:10}}
                onChange={(e)=>{
                    let price;
                    repiarType.map((el)=>{
                        if(el.value == e.target.value){
                            console.log(el.repair_price , e.target.value)
                            price = el.repair_price
                        }

                    })
                    props.onChange(e,price)
                }}>
                {
                    list
                }
            </select>
        )
    }else if(key+1 === 3){
        defaultSelect =(
            <select defaultValue={type3} style={{borderWidth:0,borderBottomWidth:2 ,marginLeft:10}}
                onChange={(e)=>{
                    let price;
                    repiarType.map((el)=>{
                        if(el.value == e.target.value){
                            console.log(el.repair_price , e.target.value)
                            price = el.repair_price
                        }

                    })
                    props.onChange(e,price)
                }}>
                {
                    list
                }
            </select>
        )
    }
    useEffect(()=>{
        
    },[])
    return(
        <div>
            {
                defaultSelect
            }
        </div>
    )
}