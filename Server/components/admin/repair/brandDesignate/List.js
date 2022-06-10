import React ,{useEffect,useState,useCallback} from "react";
import styled from "styled-components";
import COLOR from "../../../../constants/color";
import axios from "axios";
import _ from "lodash";
import remakeCallNumber from "../../../../functions/remakeCallNumber";

const List = ({
    user=[],
    infos=[],
    repairShops,
    allCheck=false,
    setAllCheck=()=>{},
    checkedList=[],
    setCheckedList=()=>{},
    categorys =[],
}) => {
    const categorysSorted = _.sortBy(_.sortBy(categorys,"season_name"),"category_name")
    return(
        <div>
            {
                categorysSorted.map((item,index)=>{
                    if(index+1 !== categorysSorted.length){
                        return(
                            <Wrapper key={index} style={{borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`,}}>
                                <ListItem item={item} infos={infos}  categorys={categorys} allCheck={allCheck} setAllCheck={setAllCheck} 
                                          checkedList={checkedList} setCheckedList={setCheckedList}/>
                            </Wrapper>
                        )
                    }else{
                        return(
                            <Wrapper key={index} style={{borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`,borderRadius:"0px 0px 10px 10px"}}>
                                <ListItem item={item} infos={infos}  categorys={categorys}  allCheck={allCheck} setAllCheck={setAllCheck}
                                          checkedList={checkedList} setCheckedList={setCheckedList}/>
                            </Wrapper>
                        )
                    }
                })
            }
        </div>
    );
};

const ListItem =({
    item,
    infos=[],
    categorys=[],
    allCheck,
    setAllCheck=()=>{},
    checkedList=[],
    setCheckedList=()=>{},
})=>{
    
    const brandCategorys = _.filter(_.sortBy(categorys,"category_name"),{"brand_name":item.brand_name})
    const [selectedCategory, setSelectedCategory]= useState(brandCategorys[0].pcategory_id)

    let check

    let find = _.filter(checkedList,{"pcategory_store_id":item.pcategory_store_id})
    if(find.length>0){
        check = true 
    }else{
        check =false
    }

    const checkboxHandler =(value)=>{
        //setCheck(value)
        if(!value){
            let result = _.filter(checkedList,function(o) {
                return o.pcategory_store_id !== item.pcategory_store_id;
            })
            setCheckedList(result)
        }else{
            let result = []
            if(checkedList.length>0){
                result = checkedList
            }
            result.push(item)
            result = _.uniqBy(result,"pcategory_store_id")
            setCheckedList(result)
        }
    }
    return(
        <PrView>
            <HeaderCell style={{flex:0,minWidth:40}}>
                <input type={"checkbox"} checked={check} onChange={()=>{
                    checkboxHandler(!check)
                }}/>
            </HeaderCell>
            <HeaderCell>
                {item.category_name}
            </HeaderCell>
                      
            <HeaderCell>
                {item.receiver_name}
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
    min-height:60px;
    min-width:20px;
    justify-content:center;
    align-items:center;
    font-size:13px;
    flex:1;
`;
const HeaderCellv2 = styled.div`
    display:flex;
    min-height:60px;
    min-width:20px;
    font-size:13px;
    flex:1;
`;
const SearchSelect = styled.select`
    padding:15px;
    border:0;
    &:focus { 
    outline: none !important;
    border-color: #719ECE;
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
    font-size:13px;
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
    font-size:13px;
    padding:5px;
    border-radius: 10px;
    cursor: pointer;
    &:hover{
        background-color:${COLOR.LIGHT_GRAY};
    }

`;



export default List