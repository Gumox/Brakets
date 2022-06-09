import React,{useState,useEffect} from "react";
import axios from "axios";
import _ from "lodash";
import styled from "styled-components";
import COLOR from "../../../constants/color";
import CompanyModify from "../Modify/CompanyModifiy";
import moment from "moment";

const Company = ({
    infos,
    brands,
    setModifyAcion =()=>{}
}) =>{
    const cancelButton =()=>{
        setModifyAcion(null)
    }
    
    return(
        <Wrapper>
            {infos.map((item,index)=>{
                let brand = _.filter(brands, {"headquarter_id": item.value});
                return(
                <PrView key={index}>
                    <HeaderCell style={{flex:0.1,borderLeft:"1px solid"}}>
                        {index+1}
                    </HeaderCell>
                    <HeaderCell style={{flexDirection:"column"}}>
                        <div>{item.headquarter_name}</div>
                        <div>{`\n(${item.text})`}</div>
                    </HeaderCell>
                    
                    <HeaderCell>
                    <div>{moment(item.timestamp).format("YYYY-MM-DD")}</div>
                    </HeaderCell>
                    
                    <HeaderCell style={{flexDirection:"column"}}>
                        {brand.map((el,key)=>(
                            <div key={key} style={{marginTop:5}}>{el.brand_name}</div>
                        ))}
                    </HeaderCell>
                    
                    <HeaderCell>
                        {item.headquarter_code}
                    </HeaderCell>
                    
                    <HeaderCell>
                        {
                            item.state >0 ?
                            <div style={{color:COLOR.CYAN_BLUE}}>{"ON"}</div>
                            :<div style={{color:COLOR.RED}}>{"OFF"}</div>
                        }
                    </HeaderCell>
                    
                    <HeaderCell >
                        <ModifyButton onClick={()=>{
                        setModifyAcion(
                            <CompanyModify info={item} cancelButton={cancelButton}/>

                        )}}>
                            수정
                        </ModifyButton>
                    </HeaderCell>
                </PrView>
                )
            })}
        </Wrapper>
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
    min-width:20px;
    justify-content:center;
    align-items:center;
    font-size:20px;
    flex:1;
    padding:5px;
    border-bottom:1px solid;
    border-right : 1px solid;
`;
const ModifyButton =styled.button`
    background-color : ${COLOR.INDIGO};
    width:80px;
    height : 50px;
    color:${COLOR.WHITE};
    margin:20px;
    font-size:16px;
    border-radius:10px;

`
const Wrapper  = styled.div`
    overflow:auto;
    &::-webkit-scrollbar {
        width: 8px;
        height: 10px;
        background: rgba(210, 210, 210, 0.4);
      }
      &::-webkit-scrollbar-thumb {
        background: rgba(96, 96, 96, 0.7);
        border-radius: 6px;
      }
`;
const InsideWrapper  = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction: column;
`;
const InputTableBox  = styled.div`
    min-width:1080px;
    border:2px solid;
`;
const PrView  = styled.div`
    display:flex;
    flex-direction:row;
`;
const ColView  = styled.div`
    display:flex;
    flex-direction: column;
`;
const CenterView  = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-around;
`;

const TwoNameBox  = styled.div`
    font-size: 18px;
    display:flex;
    align-items:center;
    justify-content:space-around;

`;
const NameBox  = styled.div`
    height : 80px;
    width : 200px;
    border 1px solid;
    font-size: 18px;
    display:flex;
    justify-content:center;
    align-items:center;
`;
const InputBox  = styled.div`
    height : 80px;
    flex:1.3;
    border 1px solid;
    display:flex;
    justyfiy-content:center;
    ailgn-items:center;
`;
const LongInputBox  = styled.div`
    height : 80px;
    flex:3.31;
    border 1px solid;
    display:flex;
    justyfiy-content:center;
    ailgn-items:center;
`;
const InputLine  = styled.input`
    border 1px solid;
    border-radius: 5px;
    padding-left:10px;
    font-size:20px;

`;
const InputLineArea  = styled.textarea`
    border 1px solid;
    border-radius: 5px;

`;

const RegistAligo  = styled.div`
    border-radius: 5px;
    color:${COLOR.RED};
    font-size:15px;
    &:hover {
        color: #ff8585;
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

export default Company