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
            {
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
              .post(`${process.env.API_URL}/brand/brandInfoChange?brandName=${brandName}&brandId=${brandId}&serviceDate=${serviceDate}`,)
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
                {modifyOn && <input style={{textAlign:"center"}} placeholder={item.brand_name} onChange={(e)=>{setModifyBrandName(e.target.value)}}/>}
            </HeaderCell>

            <HeaderCell>
                {!modifyOn && <div>{item.service_date+" 일"}</div>}
                {modifyOn && <input type="number" style={{textAlign:"center"}} placeholder={item.service_date} onChange={(e)=>{setModifyServiceDate(e.target.value)}}/>}
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
    font-size:15px;
    justify-content:center;
    align-items:center;
`;
const HeaderCell = styled.div`
    display:flex;
    height:60px;
    min-width:20px;
    justify-content:center;
    align-items:center;
    font-size:16px;
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



export default List