import React ,{useEffect,useState,useCallback} from "react";
import styled from "styled-components";
import COLOR from "../../../../constants/color";
import axios from "axios";
import _ from "lodash";
import moment from "moment";


const List = ({
    user=[],
    season=[],
}) => {
    const sortedSeason = _.sortBy(season,"brand_name")
    return(
        <div>
            {sortedSeason.length ?
                sortedSeason.map((item,index)=>{
                    if(index+1 !== sortedSeason.length){
                        return(
                            <Wrapper key={index}>
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
                <Wrapper style={{borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`,borderRadius:"0px 0px 10px 10px",height:"60px" }}/>
                            
            }
        </div>
    );
};

const ListItem =({item})=>{
    
    const [modifyOn,setModifyOn]= useState(false)

    const emptySpace =(str)=>{
        console.log("s ",str)
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

    return(
        <PrView >
                            
            <HeaderCell>
                {item.brand_name}
            </HeaderCell>

            <HeaderCell>
                {item.season_name}
            </HeaderCell>

            <HeaderCell>
                {item.season_code}
            </HeaderCell>


            <HeaderCell>
                {item.start_date ? moment(item.start_date).format("YYYY-MM-DD"):"" }
            </HeaderCell>
            
            <HeaderCell>
                {item.end_date ? moment(item.end_date).format("YYYY-MM-DD"):"" }
            </HeaderCell>
            
            {/*<HeaderCell style={{color: COLOR.RED}}>
                {!modifyOn && <ModifyView onClick={()=>{ setModifyOn(!modifyOn)}}>
                    수정
                </ModifyView>}
                {modifyOn&&
                    <div style={{display:"flex",flexDirection:"row",justifyContent:"space-around",flex:1}}>
                        <ModifyView onClick={()=>{}}>
                            수정
                        </ModifyView>
                        <ChangeView onClick={()=>{setModifyOn(!modifyOn)}}>
                            취소
                        </ChangeView>
                    </div>
                }
            </HeaderCell>*/}
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
    font-size:12px;
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