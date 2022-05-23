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
    categorys =[]
}) => {
    const categorysSorted = _.sortBy(_.sortBy(categorys,"season_name"),"category_name")
    return(
        <div>
            {
                categorysSorted.map((item,index)=>{
                    if(index+1 !== categorysSorted.length){
                        return(
                            <Wrapper key={index} style={{borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`,}}>
                                <ListItem item={item} infos={infos}  categorys={categorys} />
                            </Wrapper>
                        )
                    }else{
                        return(
                            <Wrapper key={index} style={{borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`,borderRadius:"0px 0px 10px 10px"}}>
                                <ListItem item={item} infos={infos}  categorys={categorys} />
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
})=>{
    
    const brandCategorys = _.filter(_.sortBy(categorys,"category_name"),{"brand_name":item.brand_name})
    const [selectedCategory, setSelectedCategory]= useState(brandCategorys[0].pcategory_id)

    const [repairShopList,setRepairShopList] = useState([])
    return(
        <PrView>
            <HeaderCell style={{flex:1 ,borderRadius: "10px 0px 0px 0px"}}>
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
    font-size:16px;
    flex:1;
`;
const HeaderCellv2 = styled.div`
    display:flex;
    min-height:60px;
    min-width:20px;
    font-size:16px;
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