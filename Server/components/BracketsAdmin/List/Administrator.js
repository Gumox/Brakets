import React,{useState,useEffect} from "react";
import axios from "axios";
import _ from "lodash";
import styled from "styled-components";
import COLOR from "../../../constants/color";
import AdministratorModifiy from "../Modify/AdministratorModifiy";
import AdministratorChange from "../Modify/AdministratorChange"
import remakeCallNumber from "../../../functions/remakeCallNumber";
import moment from "moment";

const Administrator = ({
    staffs,
    setModifyAcion=()=>{}
}) =>{
    return(
        <div>
            {staffs.length?
                staffs.map((item,index)=>{
                    const _phone =String(item.staff_phone).replace(/-/g,"")

                    if(index+1 !== staffs.length){
                        return(
                            <Wrapper key={index} style={{borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                                <ListItem item={item} phone={_phone}  setModifyAcion={setModifyAcion} />
                            </Wrapper>
                        )
                    }else{
                        return(
                            <Wrapper key={index} style={{borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`,borderRadius:"0px 0px 10px 10px"}}>
                                <ListItem item={item}  phone={_phone}  setModifyAcion={setModifyAcion} />
                            </Wrapper>
                        )
                    }
                })
                :
                <Wrapper style={{borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`,borderRadius:"0px 0px 10px 10px",height:"60px"}}/>

            }
        </div>
    );
}

const ListItem =({
    item,
    phone,
    setModifyAcion=()=>{},
})=>{
    return(
        <PrView >
                    
            <HeaderCell style={{flexDirection:"column"}}>
                <div>{item.headquarter_name}</div>
                <div>{`(${item.headquarter_name_kr})`}</div>
            </HeaderCell>

            <HeaderCell>
                <View>
                    <div style={{fontSize:"14px"}}>
                        {item.headquarter_code}
                    </div>
                </View>
            </HeaderCell>

            <HeaderCell>
                <View>
                    <div style={{fontSize:"14px"}}>
                        {item.staff_code}
                    </div>
                </View>
            </HeaderCell>
            
            <HeaderCell>
                <View>
                    <div style={{fontSize:"14px"}}>
                        {item.staff_name}
                    </div>
                </View>
            </HeaderCell>

            <HeaderCell style={{fontSize:16}}>
                <View>
                    <div style={{fontSize:"14px"}}>
                        {remakeCallNumber(phone)}
                    </div>
                </View>
            </HeaderCell>
            <HeaderCell style={{fontSize:16}}>
                <View>
                    <div style={{fontSize:"14px"}}>
                        {item.staff_email}
                    </div>
                </View>
            </HeaderCell>
            
            <HeaderCell>
                {
                    item.staff_state >0 ?
                    <div style={{color:COLOR.CYAN_BLUE}}>{"ON"}</div>
                    :<div style={{color:COLOR.RED}}>{"OFF"}</div>
                }
            </HeaderCell>
            
            <HeaderCell >
                <ModifyButton
                    onClick={()=>{setModifyAcion(
                        <AdministratorModifiy staffs={staffs} info={item} setModifyAcion={setModifyAcion}/>
                    )}}
                >수정</ModifyButton>
            </HeaderCell>
            
            <HeaderCell >
                <ChangeButton 
                    onClick={()=>{setModifyAcion(
                        <AdministratorChange info={item} setModifyAcion={setModifyAcion}/>
                    )}}
                >변경</ChangeButton>
            </HeaderCell>
        </PrView>
    )
}
const RegistButton =styled.button`
    background-color : ${COLOR.INDIGO};
    width:80px;
    height : 50px;
    color:${COLOR.WHITE};
    margin:20px;
    font-size:16px;
    border-radius:10px;

`
const HeaderCell = styled.div`
    display:flex;
    min-height:60px;
    min-width:20px;
    justify-content:center;
    align-items:center;
    font-size:13px;
    flex:1;
    padding:5px;
`;
const ModifyButton =styled.button`
    background-color : ${COLOR.INDIGO};
    width:60px;
    height : 40px;
    color:${COLOR.WHITE};
    margin:20px;
    font-size:14px;
    border-radius:10px;

`
const ChangeButton =styled.button`
    background-color : ${COLOR.RED};
    width:60px;
    height : 40px;
    color:${COLOR.WHITE};
    margin:20px;
    font-size:14px;
    border-radius:10px;

`
const View = styled.div`

    display : flex;
    flex-direction : column;
    white-space: pre-wrap;
`;
const Wrapper  = styled.div`
    border-left:2px solid ${COLOR.LIGHT_GRAY};
    border-right:2px solid ${COLOR.LIGHT_GRAY};
`;


const PrView  = styled.div`
    display:flex;
    flex-direction:row;
`;

const InputLineArea  = styled.textarea`
    border 1px solid;
    border-radius: 5px;

`;



export default Administrator