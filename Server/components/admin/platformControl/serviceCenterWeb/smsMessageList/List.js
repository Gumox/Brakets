import React ,{useEffect,useState,useCallback} from "react";
import styled from "styled-components";
import COLOR from "../../../../../constants/color";
import axios from "axios";
import _ from "lodash";


const List = ({
    user=[],
    list=[],
    addState,
    changeState,
    addHandler=()=>{},
    changeHandler=()=>{}
}) => {

    
    return(
        <div>
            {list.length ?
                list.map((item,index)=>{
                    if(index+1 !== list.length){
                        return(
                            <Wrapper key={index} style={{borderBottom:`1px solid ${COLOR.LIGHT_GRAY}`}}>
                                <ListItem num={index+1} item={item} addState={addState} changeState={changeState} addHandler={addHandler} changeHandler={changeHandler}/>
                            </Wrapper>
                        )
                    }else{
                        return(
                            <div key={index}>
                                <Wrapper style={{borderBottom:`1px solid ${COLOR.LIGHT_GRAY}`}}>
                                    <ListItem num={index+1} item={item} addState={addState} changeState={changeState} addHandler={addHandler} changeHandler={changeHandler}/>
                                </Wrapper>
                                
                                <Wrapper  style={{borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`,borderRadius:"0px 0px 10px 10px"}}>
                                    <ListItem num={"add"} item={item} addState={addState} changeState={changeState} addHandler={addHandler} changeHandler={changeHandler}/>
                                </Wrapper>
                            </div>
                        )
                        
                    }
                })
                :
                <Wrapper style={{borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`,borderRadius:"0px 0px 10px 10px",height:"60px"}}/>
                            
            }
        </div>
    );
};

const ListItem =({
    item,
    num,
    addState,
    changeState,
    addHandler=()=>{},
    changeHandler=()=>{}
})=>{

    const smsMessageText =item.text

    if(num === "add"){
        return(
            <PrView>
                          
                
                <HeaderHash>
                    
                </HeaderHash>
                <HeaderCell style={{flex:3,width:"300px"}}>

                </HeaderCell>
    
                
                <HeaderCell style={{flex:0.5,width:"300px"}}>
                    <ChangeView onClick={()=>{addHandler()}}>
                        추가
                    </ChangeView>
                </HeaderCell>
    
                
            </PrView>
        )
    }
    else{
        return(
            <PrView>
                          
                
                <HeaderHash>
                    {num}
                </HeaderHash>
                <HeaderCell style={{flex:3,width:"300px"}}>
                    <View>
                        <div style={{fontSize:"14px"}}>
                            {smsMessageText}
                        </div>
                    </View>
                </HeaderCell>
    
                
                <HeaderCell style={{flex:0.5,width:"300px"}}>
                    <ModifyView onClick={()=>{
                        changeHandler(smsMessageText,item.value)
                    }}>
                        편집
                    </ModifyView>
                </HeaderCell>
    
                
            </PrView>
        )
    }
    
}

const Wrapper  = styled.div`
    border-left:2px solid ${COLOR.LIGHT_GRAY};
    border-right:2px solid ${COLOR.LIGHT_GRAY};
`;
const HeaderHash  = styled.div`
    display:flex;
    min-height:80px;
    width:50px;
    border-right:1px solid ${COLOR.LIGHT_GRAY};
    justify-content:center;
    align-items:center;
    font-size:16px;
    padding:5px;
`;
const HeaderCell = styled.div`
    display:flex;
    min-height:80px;
    width:200px;
    justify-content:center;
    align-items:center;
    font-size:16px;
    flex:2;
    padding:5px;
`;

const View = styled.div`

    display : flex;
    flex-direction : column;
    white-space: pre-wrap;
`;
const PrView  = styled.div`
    display:flex;
    flex-direction:row;
`;
const TextInsider = styled.textarea`
    flex:1;
    background-color:${COLOR.WHITE};
    min-height:80px;
    max-height:150px;
    font-size:15px;
    resize: none;
    text-align: left;
    border:0;

    &:focus { 
        outline: none !important;
        border-color: #719ECE;
    }
`;
const ModifyView = styled.div`
    color:${COLOR.CYAN_BLUE};
    display:flex;
    justify-content:center;
    align-items:center;
    font-size:16px;
    padding:5px;
    border-radius: 10px;
    cursor: pointer;
    font-weight: bold;
    &:hover{
        background-color:${COLOR.LIGHT_GRAY};
    }

`;

const ChangeView = styled.div`
    color:${COLOR.RED};
    display:flex;
    justify-content:center;
    align-items:center;
    font-size:16px;
    padding:5px;
    border-radius: 10px;
    cursor: pointer;
    font-weight: bold;
    &:hover{
        background-color:${COLOR.LIGHT_GRAY};
    }

`;

const CheckBox = styled.input `
    appearance: none;
    display: inline-block;
    width: 20px;
    height: 20px;
    background-clip: content-box;
    border: 1.5px solid #bbbbbb;
    border-radius: 10px;
    padding:3px;

    &:checked{

        background-color: ${COLOR.INDIGO};
        border-radius: 10px;
    }

`
const CheckBoxRed = styled.input `
    appearance: none;
    display: inline-block;
    width: 20px;
    height: 20px;
    background-clip: content-box;
    border: 1.5px solid #bbbbbb;
    border-radius: 10px;
    padding:3px;

    &:checked{

        background-color: ${COLOR.RED};
        border-radius: 10px;
    }

`


export default List