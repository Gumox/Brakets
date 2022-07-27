import React ,{useEffect,useState,useCallback} from "react";
import styled from "styled-components";
import COLOR from "../../../../constants/color";
import axios from "axios";
import _ from "lodash";
import remakeCallNumber from "../../../../functions/remakeCallNumber"


const List = ({
    user=[],
    brands=[],
}) => {
    
    return(
        <div>
            {brands.length > 0 
                ?
                brands.map((item,index)=>{
                    if(index+1 !== brands.length){
                        return(
                            <Wrapper key={index} style={{borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                                <ListItem item={item}/>
                            </Wrapper>
                        )
                    }else{
                        return(
                            <Wrapper key={index} style={{borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`,borderRadius:"0px 0px 10px 10px"}}>
                                <ListItem item={item}/>
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

const ListItem =({item})=>{
    
    const [modifyOn,setModifyOn]= useState(false)
    const [modifyBrandName,setModifyBrandName] = useState(item.brand_name);
    const [modifyServiceDate,setModifyServiceDate] = useState(item.service_date);

    const emptySpace =(str)=>{
        let name = ""
        for(let i =0; i<str.length;i++){
            if(str[i] === " "&& str[i+1] && str[i+1] !== " "){
                name += "_"
            }else if(str[i] !== " " && str[i]){
                name += str[i]
            }
        }
        return(String(name).replace(/_/g," "))
        
    }
    const change = async(brandName,brandId,serviceDate)=>{
        const [result] = await Promise.all([
            axios
              .post(`${process.env.API_URL}/brand/brandInfoChange?brandName=${brandName.trim()}&brandId=${brandId}&serviceDate=${serviceDate}`,)
              .then(({ data }) => data.body), 
            ])
        alert("브랜드 정보가 수정되었습니다.")
        window.location.reload();
    }

    return(
        <PrView >
                            
            <HeaderCell>
                <ColView>
                    <InColView>{item.headquarter_name_kr}</InColView>
                    <InColView>({item.headquarter_name})</InColView>
                </ColView>
            </HeaderCell>

            <HeaderCell>
                {!modifyOn && <div>{item.brand_name}</div>}
                {modifyOn &&
                    <div style={{flex:1,display:"flex",justifyContent:"center",height:"56px"}}>
                        <InputLine style={{textAlign:"center", border:0, borderBottom:"2px solid", margin:5}} placeholder={item.brand_name} onChange={(e)=>{setModifyBrandName(e.target.value)}}/>
                    </div> 
                }
            </HeaderCell>

            <HeaderCell>
                {!modifyOn && <div>{item.service_date+" 일"}</div>}
                {modifyOn &&
                    <div style={{flex:1,display:"flex",justifyContent:"center",height:"56px"}}>
                        <InputLine type="number" style={{textAlign:"center", border:0, borderBottom:"2px solid", margin:5}} placeholder={item.service_date} onChange={(e)=>{setModifyServiceDate(e.target.value)}}/>
                    </div> 
                }
            </HeaderCell>

            
            <HeaderCell style={{color: COLOR.RED}}>
                {!modifyOn && <ModifyView onClick={()=>{ setModifyOn(!modifyOn)}}>
                    수정
                </ModifyView>}
                {modifyOn&&
                    <div style={{display:"flex",flexDirection:"row",justifyContent:"space-around",flex:1}}>
                        <ModifyView onClick={()=>{change(emptySpace(modifyBrandName),item.brand_id,modifyServiceDate)}}>
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



const ColView  = styled.div`
    display:flex;
    flex-direction: column;
`;
const InColView  = styled.div`
    display:flex;
    font-size:13px;
    justify-content:center;
    align-items:center;
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
    /*border:2px solid ${COLOR.BLACK};
    border-left : 0px solid ${COLOR.BLACK};*/
`;

const PrView  = styled.div`
    display:flex;
    flex-direction:row;
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
    &:hover{
        background-color:${COLOR.LIGHT_GRAY};
    }

`;
const InputLine  = styled.input`
    border: 0px;
    margin: 2px;
    padding-left:10px;
    font-size:13px;
    display:flex;
    &:focus { 
        outline: none !important;
        border-color: #719ECE;
        box-shadow: 0 0 10px #719ECE;
    }
`;


export default List