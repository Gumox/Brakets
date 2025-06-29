import React ,{useEffect,useState,useCallback} from "react";
import styled from "styled-components";
import COLOR from "../../../../constants/color";
import axios from "axios";
import _ from "lodash";
import ProductModify from "./Modify";

const List = ({
    user=[],
    infos=[],
    products=[],
    brands=[],
    setActionView=()=>{}
}) => {
    const cancel =()=>{
        setActionView(null)
    }
    
    return(
        <div>
            {products.length ?
                products.map((item,index)=>{
                    if(index+1 !== products.length){
                        return(
                            <Wrapper key={index} style={{borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                                <ListItem item={item} cancel={cancel} infos={infos} brands={brands} user={user} setActionView={setActionView}/>
                            </Wrapper>
                        )
                    }else{
                        return(
                            <Wrapper key={index} style={{borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`,borderRadius:"0px 0px 10px 10px"}}>
                                <ListItem item={item} cancel={cancel} infos={infos} brands={brands} user={user}  setActionView={setActionView}/>
                            </Wrapper>
                        )
                    }
                })
                :
                <Wrapper style={{borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`,borderRadius:"0px 0px 10px 10px",height:"60px"}} />
            }
        </div>
    );
};

const ListItem =({
    item,
    infos=[],
    brands=[],
    user=[],
    setActionView=()=>{},
    cancel=()=>{}
})=>{
    
    return(
        <PrView>
                      
            <HeaderCell style={{flex:1}}>
                {item.brand_name}
            </HeaderCell>

            <HeaderCell>
                {item.season_name}
            </HeaderCell>

            <HeaderCell >
                {item.category_name}
            </HeaderCell>

            <HeaderCell >
                <View>
                    <div style={{fontSize:"13px"}}>
                        {item.barcode}
                    </div>
                </View>
            </HeaderCell>

            <HeaderCell style={{flex:1.5}}>
                <View>
                    <div style={{fontSize:"13px"}}>
                        {item.style_code}
                    </div>
                </View>
            </HeaderCell>
            
            <HeaderCell>
                <View>
                    <div style={{fontSize:"13px"}}>
                        {item.color}
                    </div>
                </View>
            </HeaderCell>
            
            <HeaderCell style={{flex:0.75}}>
                {item.degree}차
            </HeaderCell>
            
            <HeaderCell style={{flex:0.75}}>
                {item.size}
            </HeaderCell>
            
            <HeaderCell style={{flex:3}}>
                <View>
                    <div style={{fontSize:"13px"}}>
                        {item.name}
                    </div>
                </View>
            </HeaderCell>

            <HeaderCell style={{color: COLOR.RED,flex:1}} >
                <ModifyView style={{color: COLOR.RED}} 
                onClick={()=>{setActionView(
                    <ProductModify item={item} infos={infos} brands={brands} user={user} cancel={cancel}/>
                    )}}>
                    수정
                </ModifyView>
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
const View = styled.div`

        display : flex;
    flex-direction : column;
    white-space: pre-wrap;
    word-break: break-all;
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



export default List