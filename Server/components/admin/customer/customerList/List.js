import React ,{useEffect,useState,useCallback} from "react";
import styled from "styled-components";
import COLOR from "../../../../constants/color";
import axios from "axios";
import _ from "lodash";
import { onChangePhoneNumber, onFocusPhoneNumber, onBlurPhoneNumber } from "../../onEventPhoneNumber";

const List = ({
    user=[],
    infos=[],
    customers=[],
}) => {
    
    return(
        <div>
            {customers.length>0
                ?
                customers.map((item,index)=>{
                    if(index+1 !== customers.length){
                        return(
                            <Wrapper key={index} style={{borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                                <ListItem item={item} infos={infos} user={user} />
                            </Wrapper>
                        )
                    }else{
                        return(
                            <Wrapper key={index} style={{borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`,borderRadius:"0px 0px 10px 10px"}}>
                                <ListItem item={item} infos={infos} user={user}  />
                            </Wrapper>
                        )
                    }
                    
                })
                :
                <Wrapper style={{height:"60px",borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`,borderRadius:"0px 0px 10px 10px"}}/>
            }
        </div>
    );
};

const ListItem =({
    item,
    infos=[],
    user=[],
})=>{
    
    const [modifyOn,setModifyOn]= useState(false)
    const [modifyName,setModifyName] = useState(item.name);
    const [modifyPhone,setModifyPhone] = useState(item.phone);

    const emptySpace =(str)=>{
        let name = ""
        for(let i =0; i<str.length;i++){
            if(str[i] === " "&& str[i+1] && str[i+1] !== " "){
                name += "_"
            }else if(str[i] !== " " && str[i]){
                name += str[i]
            }
        }
        return(String(name).replace(/_/g," ").trim())
    }
      

    const change = async(customerName,customerId,customerPhone)=>{
        const [result] = await Promise.all([
            axios
              .post(`${process.env.API_URL}/customer/modify?customerName=${customerName}&customerPhone=${customerPhone}&customerId=${customerId}`,)
              .then(({ data }) => data.body), 
            ])
        alert("고객 정보가 수정되었습니다.")
        window.location.reload();
    }
    return(
        <PrView>
            <HeaderCell>
                {!modifyOn 
                    ?
                    <HeaderCell>
                        <div>{item.name}</div>
                    </HeaderCell>
                    :
                    <HeaderCell style={{alignItems:"normal",padding:10}}>
                        <InputLine placeholder={item.name} onChange={(e)=>{setModifyName(e.target.value)}}/>
                    </HeaderCell>    
                }
            </HeaderCell>

            <HeaderCell>
                {!modifyOn 
                    ?
                    <HeaderCell>
                        <div>{item.phone}</div>
                    </HeaderCell>
                    :
                    <HeaderCell style={{alignItems:"normal",padding:10}}>
                        <InputLine type="tel" placeholder={item.phone} value={modifyPhone || ""}
                            onChange={(e)=>{setModifyPhone(onChangePhoneNumber(e.target.value))}}
                            onFocus={(e)=>{setModifyPhone(onFocusPhoneNumber(e.target.value))}}
                            onBlur={(e)=>{setModifyPhone(onBlurPhoneNumber(e.target.value))}}
                        />
                    </HeaderCell>    
                }
            </HeaderCell>

            
            <HeaderCell style={{color: COLOR.RED,flex:1}} >
                {!modifyOn && <ModifyView onClick={()=>{ setModifyOn(!modifyOn)}}>
                    수정
                </ModifyView>}
                {modifyOn&&
                    <div style={{display:"flex",flexDirection:"row",justifyContent:"space-around",flex:1}}>
                        <ModifyView onClick={()=>{change(emptySpace(modifyName||item.name),item.customer_id,onFocusPhoneNumber(modifyPhone||item.phone))}}>
                            수정
                        </ModifyView>
                        <ChangeView onClick={()=>{setModifyOn(!modifyOn)}}>
                            취소
                        </ChangeView>
                    </div>
                }
            </HeaderCell>

        </PrView>
    )
}
const Wrapper  = styled.div`
    border-left:2px solid ${COLOR.LIGHT_GRAY};
    border-right:2px solid ${COLOR.LIGHT_GRAY};
`;

const HeaderCell = styled.div`
    display:flex;
    height:60px;
    min-width:20px;
    justify-content:center;
    align-items:center;
    font-size:13px;
    flex:1;
    padding:5px;
`;

const InputLine  = styled.input`
    border: 0px;
    margin: 2px;
    padding-left: 10px;
    font-size: 14px;
    display: flex;
    border:0;
    border-bottom: 1px solid;
    text-align: center;
    &:focus { 
        outline: none !important;
        border-color: #719ECE;
        box-shadow: 0 0 10px #719ECE;
        border-bottom:0px;
    }
`;
const PrView  = styled.div`
    display:flex;
    flex-direction:row;
`;
const TextInsider = styled.textarea`
    flex:1;
    background-color:${COLOR.WHITE};
    resize:none;
    
    text-align: center;
    font-weight:bold;
    border:0;
`;
const ModifyView = styled.div`
    color:${COLOR.CYAN_BLUE};
    display:flex;
    justify-content:center;
    align-items:center;
    font-size:14px;
    padding:5px;
    border-radius: 10px;
    cursor: pointer;
    &:hover{
        background-color:${COLOR.LIGHT_GRAY};
    }

`;

const ChangeView = styled.div`
    color:${COLOR.RED};
    display:flex;
    justify-content:center;
    align-items:center;
    font-size:14px;
    padding:5px;
    border-radius: 10px;
    cursor: pointer;
    &:hover{
        background-color:${COLOR.LIGHT_GRAY};
    }

`;



export default List