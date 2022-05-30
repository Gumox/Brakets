import React ,{useEffect,useState,useCallback} from "react";
import styled from "styled-components";
import COLOR from "../../../../../constants/color";
import axios from "axios";
import _ from "lodash";


const List = ({
    user=[],
    list=[],
}) => {

    
    return(
        <div>
            {list.length ?
                list.map((item,index)=>{
                    if(index+1 !== list.length){
                        return(
                            <Wrapper key={index} style={{borderBottom:`1px solid ${COLOR.LIGHT_GRAY}`}}>
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
                <Wrapper style={{borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`,borderRadius:"0px 0px 10px 10px",height:"60px"}}/>
                            
            }
        </div>
    );
};

const ListItem =({item})=>{
    
    const [levelCheck,setLevelCheck] = useState(item.level)
    const [stateCheck,setStateCheck] = useState(item.state)

    const levelCheckHandler =(value)=>{
        setLevelCheck(value)
        changeLevel(item.value,value)
    }

    const stateCheckHandler =(value)=>{
        setStateCheck(value)
        changeState(item.value,value)
    }

    const changeLevel= async(faultId,level) =>{
        let data ={
            levelOn:true,
            faultId:faultId,
            level: level
        }
        const [result] = await Promise.all([
            axios
            .post(`${process.env.API_URL}/faultDivision/changeStateOrLevel`,data)
            .then(({ data }) => data.data), 
        ])
    }

    const changeState= async(faultId,state) =>{
        let data ={
            stateOn:true,
            faultId:faultId,
            state: state
        }
        const [result] = await Promise.all([
            axios
            .post(`${process.env.API_URL}/faultDivision/changeStateOrLevel`,data)
            .then(({ data }) => data.data), 
        ])
    }

    return(
        <PrView>
                      
            <HeaderCell>
                {item.text}
            </HeaderCell>

            <HeaderCell style={{flex:3}}>
                <PrView>
                    <CheckBox checked={levelCheck} type="checkbox" onChange={()=>{levelCheckHandler(!levelCheck)}}/>
                    <div style={{fontSize:13,marginLeft:"20px",display:"flex",alignItems:"center"}}>사용가능</div>
                    <CheckBoxRed checked={!levelCheck} style={{marginLeft:20}} type="checkbox" onChange={()=>{levelCheckHandler(!levelCheck)}}/>
                    <div style={{fontSize:13,marginLeft:"20px",display:"flex",alignItems:"center"}}>불가능</div>
                </PrView>
            </HeaderCell>

            <HeaderCell style={{flex:3}}>
                <PrView>
                    <CheckBox checked={stateCheck} type="checkbox" onChange={()=>{stateCheckHandler(!stateCheck)}}/>
                    <div style={{fontSize:13,marginLeft:"20px",display:"flex",alignItems:"center",color:COLOR.CYAN_BLUE}}>On</div>
                    <CheckBoxRed checked={!stateCheck} style={{marginLeft:20}} type="checkbox" onChange={()=>{stateCheckHandler(!stateCheck)}}/>
                    <div style={{fontSize:13,marginLeft:"20px",display:"flex",alignItems:"center",color:COLOR.RED}}>Off</div>
                </PrView>
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
    font-size:16px;
    flex:2;
    padding:5px;
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