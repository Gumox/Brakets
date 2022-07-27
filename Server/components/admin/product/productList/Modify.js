import React ,{useEffect,useState,useCallback} from "react";
import styled from "styled-components";
import COLOR from "../../../../constants/color";
import Router, { useRouter } from "next/router";
import axios from "axios";
import image from "../../../../public/icons/OK_image.png"
const ProductModify = ({
    infos=[],
    brands=[],
    user,
    item,
    cancel=()=>{},
}) =>{
    const router = useRouter();
    const [brandId,setBrandId] =useState(item.brand_id)
    const brandName = useState(item.brand_name)

    const [productBarcode,setProductBarcode] =useState(item.barcode)
    const [tagPrice,setTagPrice] =useState(numberDot(item.tag_price,"원"))
    const [orgPrice,setOrgPrice] =useState(numberDot(item.org_price,"원"))

    
    const [categorys,setCategorys] = useState([])
    const [seasons,setSeasons] = useState([])
    const [styles,setStyles] = useState([])

    const [seasonSelected,setSeasonSelected] = useState(item.season_id)
    const [categorySelected,setCategorySelected] = useState(item.category_id)
    const [styleSelected,setStyleSelected] = useState(item.style_id)

    const [color,setColor] =useState(item.color)
    const [degree,setDegree] =useState(item.degree)
    const [size,setSize] =useState(item.size)

    const [productName,setProductName] =useState(item.name)
    

    const [useURL,setUseURL] =useState(true)
    const [imgURL,setImgURL] =useState(item.image)

    const [imgBase64, setImgBase64] = useState(); // 파일 base64
    const [imgFile, setImgFile] = useState("/icons/imageSelect.png");	//파일	

    
    let disabledLineColor = COLOR.BLACK

    if(!useURL){
        disabledLineColor = `rgb(250,250,250)`
    }
    
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
    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImgBase64(event.target.files[0]);
          let reader = new FileReader();
          reader.onload = (e) => {
            setImgFile(e.target.result);
          };
          reader.readAsDataURL(event.target.files[0]);
        }else{
            setImgFile("/icons/image.png");
        }
    }
    const onChangePay = (value)=>{
        let result =String(value).replace(/[^0-9]/g, '')
        return result
    }
    const onFocusPay = (value) =>{
        let result = String(value).replace(/,/,"").replace(/ 원/,"")
        return result
    }
    const onBlurPay = (value) =>{
        let result = null
        if(value > 0){
            result = numberDot(value,"원")
        }
        return result
    }
    

    const getSeasonAndCategory= async(brandId) =>{
        setBrandId(brandId)
        let _brandId =null
        if(brandId !==""){
            _brandId = brandId
        }
        
        const [seasonResult] = await Promise.all([
            axios
              .get(`${process.env.API_URL}/product/season?brandId=${_brandId}`,)
              .then(({ data }) => data.data), 
        ])
        const [categoryResult] = await Promise.all([
            axios
                .post(`${process.env.API_URL}/getProductCategory`,{brand:_brandId })
                .then(({ data }) => data.body), 
        ])

        setSeasons(seasonResult)
        setCategorys(categoryResult)



        if(seasonResult.length>0){
            setSeasonSelected(seasonResult[0].value)
            
        }else{
            setStyles([]) 
            setStyleSelected(null)
        }
            
        if(categoryResult.length>0){
            setCategorySelected(categoryResult[0].pcategory_id)
            const [stylesResult] = await Promise.all([
                axios
                .get(`${process.env.API_URL}/product/seasonStyleInBrand?pcategoryId=${categoryResult[0].pcategory_id}&brandId=${brandId}`,)
                .then(({ data }) => data.data), 
            ])
            setStyles(stylesResult) 
            
            if(stylesResult.length>0){
                setStyleSelected(stylesResult[0].value)
            }
        }else{
            setCategorySelected(null)
        }
        
        
    }
    const getStyle= async(value,brandId) =>{
        
        setCategorySelected()

        let seasonId = null;
        if(value && value !== ""){
            seasonId = value
        }

        
        const [result] = await Promise.all([
            axios
              .get(`${process.env.API_URL}/product/seasonStyleInBrand?pcategoryId=${value}&brandId=${brandId}`,)
              .then(({ data }) => data.data), 
        ])
        setStyles(result)    
    }


    const modifyProduct = async() =>{
        const formData = new FormData();

        formData.append('companyName', infos[0].headquarter_name)
        formData.append('brandName',item.brand_name)
        formData.append('productId',item.product_id)
        
        formData.append('barcode', productBarcode)

        formData.append('brandId', brandId)
        formData.append('seasonId', seasonSelected)
        formData.append('categoryId', categorySelected)
        formData.append('styleId', styleSelected)

        formData.append('tag_price', onFocusPay(tagPrice))
        formData.append('org_price', onFocusPay(orgPrice))
        formData.append('color', color)
        formData.append('degree', degree)
        formData.append('size', size)
        formData.append('productName', emptySpace(productName))
        formData.append('useURL', useURL)
        formData.append('imageUrl', imgURL)
        formData.append('imgfiles',imgBase64)
        
        
        const [result] = await Promise.all([
            axios
              .post(`${process.env.API_URL}/product/updateProduct`,formData)
              .then(({ data }) => data.body), 
            ])
        alert("제품 정보가 수정되었습니다.")
        //window.location.reload();
    }
    useEffect(()=>{
        getSeasonAndCategory(item.brand_id)
    },[brandId])
    return (
        <Wrapper >
            <InsideWrapper>
           
            
                    
                
                <h2 style={{marginLeft:20}}>상품 정보 변경</h2>
                
                <PrView tyle={{borderRadius: "10px 10px 0 0 "}}>
                    <div tyle={{borderRadius: "10px 10px 0 0 "}}>
                        <PrView style={{borderRadius: "10px 0 0 0 "}}>
                            <NameBox style={{borderRadius: "10px 0 0 0 "}}>
                                상품 바코드
                            </NameBox>

                            <InputBoxTr style={{borderTop:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                                <InputLine value={productBarcode ||""} style={{flex:1,maxWidth:"205px",textAlign:"center"}} onChange={(e)=>{setProductBarcode(e.target.value)}}/>
                            </InputBoxTr>

                            <NameBox>
                                브랜드
                            </NameBox>

                            <InputBoxTr style={{width:"291px",borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderRight:`2px solid ${COLOR.LIGHT_GRAY}`,fontWeight:"bold",display:"flex",justifyContent:"center"}}>
                                <InputSelect style={{flex:1,border:0,textAlign:"center",fontSize:"16px"}} 
                                    value={brandId}
                                    onChange={(e)=>{getSeasonAndCategory(e.target.value)}}>
                                    <option value={""}>{}</option>
                                    {
                                        brands.map((items,index)=>(
                                            <option key={index} value={items.brand_id}>{items.brand_name}</option>
                                        ))
                                    }
                                </InputSelect>
                            </InputBoxTr>
                        </PrView>

                        <PrView >
                            <NameBox style={{borderTop:"2px solid rgb(244,244,244)"}}>
                                상품 명
                            </NameBox>

                            <LongInputBox style={{maxWidth:"646px"}}>
                                <InputLine value={productName ||""} style={{flex:1,maxWidth:"645px",paddingLeft:"50px"}} onChange={(e)=>{setProductName(e.target.value)}}/>
                            </LongInputBox>
                        </PrView>

                        <PrView>
                            <NameBox  style={{borderTop:"2px solid rgb(244,244,244)"}}>
                                판매가
                            </NameBox>

                            <InputBox style={{borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderRight:`2px solid ${COLOR.LIGHT_GRAY}`,width:"210px"}}>
                                <InputLine value={tagPrice || ""} style={{flex:1,maxWidth:"205px",textAlign:"center",paddingLeft:0}} 
                                    onChange={(e)=>{setTagPrice(onChangePay(e.target.value))}}
                                    onFocus={(e)=>{setTagPrice(onFocusPay(e.target.value))}}
                                    onBlur={(e)=>{setTagPrice(onBlurPay(e.target.value))}}
                                />
                            </InputBox>

                            <NameBox >
                                원가
                            </NameBox>

                            <InputBox style={{borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderRight:`2px solid ${COLOR.LIGHT_GRAY}`,width:"291px"}}>
                                <InputLine value={orgPrice || ""} style={{flex:1,width:"290px",paddingLeft:"45px"}} 
                                    onChange={(e)=>{setOrgPrice(onChangePay(e.target.value))}}
                                    onFocus={(e)=>{setOrgPrice(onFocusPay(e.target.value))}}
                                    onBlur={(e)=>{setOrgPrice(onBlurPay(e.target.value))}}
                                />
                            </InputBox>
                        </PrView>
                    </div>

                    <div style={{borderRadius: "0 10px 0 0 ",flex:1,height:"180px",display:"flex",borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderRight:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                        <ProductImage style={{borderRadius: "0 10px 0 0 " }} src={item.image}/>
                    </div>
                </PrView>

                <PrView>
                    <NameBox style={{borderTop:"2px solid rgb(244,244,244)"}}>
                        시즌
                    </NameBox>

                    <InputBoxTr style={{borderTop:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                        <InputSelect value={seasonSelected} style={{flex:1,border:0,textAlign:"center",fontSize:"16px"}}
                         onChange={(e)=>{setSeasonSelected(e.target.value)}}>
                            {
                                seasons.map((item,index)=>(
                                    <option key={index} value={item.value}>{item.season_name}</option>
                                ))
                            }
                        </InputSelect>
                    </InputBoxTr>

                    <NameBox style={{borderTop:"2px solid rgb(244,244,244)"}}>
                        카테고리
                    </NameBox>

                    <InputBoxTr style={{width:"150px",borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderLeft: `3px solid ${COLOR.LIGHT_GRAY}`}} >
                    <InputSelect value={categorySelected} style={{flex:1,border:0,textAlign:"center",fontSize:"16px"}} onChange={(e)=>{getStyle(e.target.value,brandId)}}>
                            {
                                categorys.map((item,index)=>(
                                    <option key={index} value={item.pcategory_id}>{item.category_name}</option>
                                ))
                            }
                        </InputSelect>
                    </InputBoxTr>
                    <NameBox >
                        스타일 No.
                    </NameBox>

                    <InputBoxTr style={{borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderRight:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                    <InputSelect value={styleSelected} style={{flex:1,border:0,textAlign:"center",fontSize:"16px"}} onChange={(e)=>{setStyleSelected(e.target.value)}}>
                            {
                                styles.map((item,index)=>(
                                    <option key={index} value={item.value}>{item.text}</option>
                                ))
                            }
                        </InputSelect>
                    </InputBoxTr>
                </PrView>

                <PrView>
                    <NameBox style={{borderTop:"2px solid rgb(244,244,244)"}}>
                        Color
                    </NameBox>

                    <InputBoxTr style={{borderTop:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                        <InputLine value={color ||""} style={{flex:1,fontSize:14,textAlign:"center"}} onChange={(e)=>{setColor(e.target.value)}}/>
                    </InputBoxTr>

                    <NameBox style={{borderTop:"2px solid rgb(244,244,244)"}}>
                        차수
                    </NameBox>

                    <InputBoxTr style={{width:"150px",borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderLeft: `3px solid ${COLOR.LIGHT_GRAY}`}} >
                        <InputLine value={degree ||""} style={{flex:1,width:"146px",fontSize:14,textAlign:"center"}} onChange={(e)=>{setDegree(e.target.value)}}/>
                    </InputBoxTr>

                    <NameBox style={{borderTop:"2px solid rgb(244,244,244)"}}>
                        Size
                    </NameBox>

                    <InputBoxTr style={{borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderRight:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                        <InputLine value={size ||""} style={{flex:1,width:"200px",fontSize:14,textAlign:"center"}} onChange={(e)=>{setSize(e.target.value)}}/>
                    </InputBoxTr>
                </PrView>

               

               
                <PrView style={{borderRadius: "0 0 10px 10px"}}>
                    <NameBox style={{width:"144px",borderRadius: "0 0 0 10px",height:240, borderTop:"2px solid rgb(244,244,244)"}}>
                        <TwoNameBox>
                            <ColView>
                                상품 이미지
                            </ColView>
                            <ColView>
                                변경
                            </ColView>
                        </TwoNameBox>
                    </NameBox>

                    <LongInputBox style={{borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderRadius: "0 0 10px 0",height:240,flexDirection:"column",borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                        
                        <PrView style={{flex:1,alignItems:"center" ,height:"80px"}}>
                            <CheckBox checked={useURL} style={{marginLeft:20}} type="checkbox" onChange={()=>{setUseURL(!useURL)}}/>
                            <div style={{fontSize:13,marginLeft:"20px",display:"flex",alignItems:"center"}}>{"URL 직접 입력"}</div>
                            <input disabled={!useURL} value={imgURL ||""} style={{flex:1,height:"20px",marginLeft:20,marginRight:20,border:0,borderBottom:`2px solid ${disabledLineColor}`}} onChange={(e)=>{setImgURL(e.target.value)}}/>
                        </PrView>
                        
                        <PrView style={{borderRadius: "0 0 10px 0",flex:2,alignItems:"center" ,height:"160px",borderTop:`2px solid ${COLOR.LIGHT_GRAY}`}}>

                            <div style={{display:"flex",alignItems:"center", width :120,height:"160px"}}>
                                <label htmlFor="image_file">
                                    <ImageButton src={imgFile} onClick={(e)=>{onImageChange(e)}}/>
                                </label>
                                <ImageInput disabled={useURL} type="file" accept="image/png, image/jpeg" id="image_file"   multiple="multiple" onChange={(e)=>{onImageChange(e)}}/>
                                
                            </div>
                            <div style={{display:"flex",flexDirection:"column",height:"160px",padding:"20px"}}>
                                <PrView >
                                    <CheckBox checked={!useURL} type="checkbox"  onChange={()=>{setUseURL(!useURL)}}/>
                                    <div style={{fontSize:14,marginLeft:"20px",display:"flex",alignItems:"center"}}>{"이미지 파일 올리기 - 권장이미지 : 500px * 500px / 5M 이하 / gif, png, jpg "}</div>
                                </PrView>
                            </div>
                            
                        </PrView>
                    </LongInputBox>
                </PrView>
                
                
                
                
                
                
                    <CenterView>
                        <RegistButton onClick={()=>{modifyProduct()}}>
                            변경
                        </RegistButton>

                        <RegistButton style={{backgroundColor:COLOR.RED}} onClick={()=>{cancel()}}>
                            취소
                        </RegistButton>
                    </CenterView>
                
            </InsideWrapper>
        </Wrapper>
    );
};

const numberDot=(value,moneySymbol)=>{
    return(String(value).replace(/[^0-9]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ",")+" "+moneySymbol)
}
const Wrapper = styled.div`
    padding:2%;
    background-color:${COLOR.WHITE};
    display:flex;
    min-width:750px;
`;

const RegistButton =styled.button`
    background-color : ${COLOR.INDIGO};
    width:80px;
    height : 50px;
    color:${COLOR.WHITE};
    margin:20px;
    font-size:16px;
    border-radius:10px;

`;
const InsideWrapper  = styled.div`
    display:flex;
    width:1000px;
    justify-content:center;
    flex-direction: column;
`;
const PrView  = styled.div`
    min-width:540px;
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
    font-size: 16px;
    display:flex;
    align-items:center;
    display:flex;
    flex-direction:column;

`;
const NameBox  = styled.div`
    height : 60px;
    width:145px;
    background-color:${COLOR.LIGHT_GRAY};
    font-size: 16px;
    display:flex;
    justify-content:center;
    align-items:center;
`;
const InputBox  = styled.div`
    height : 60px;
    width:360px;
    display:flex;
    justyfiy-content:center;
    ailgn-items:center;
`;
const InputBoxTr  = styled.div`
    height : 60px;
    background-color:${COLOR.WHITE};
    color:${COLOR.DARK_INDIGO};
    font-size: 16px;
    display:flex;
    width:210px;
    font-weight:bold;
`;
const LongInputBox  = styled.div`
    height : 60px;
    width:855px;
    border: 2px solid ${COLOR.LIGHT_GRAY};
    border-bottom:0;
    border-left :0;
    display:flex;
    justyfiy-content:center;
    ailgn-items:center;
    font-size:18px;

`;
const InputLine  = styled.input`
    border 0px;
    font-size:16px;
    margin: 3px;
    display:flex;
    &:focus { 
        outline: none !important;
        border-color: #719ECE;
        box-shadow: 0 0 10px #719ECE;
    }

`;

const ImageInput = styled.input`
    visibility:hidden;
`
const ImageButton = styled.img`
    width:100px;
    height:100px;
    background-color:${COLOR.WHITE};
    padding:10px;
    object-fit: contain;
    margin-left: 25px;
`
const ProductImage = styled.img`
    background-color:${COLOR.WHITE};
    padding:10px;
    flex:1;
    object-fit: contain;
`
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

const InputSelect  = styled.select`
    border: 0px;
    margin: 3px;
    font-size:14px;
    display:flex;
    &:focus { 
        outline: none !important;
        border-color: #719ECE;
        box-shadow: 0 0 10px #719ECE;
    }
`;

const InputItem  = styled.input`
   
`;


export default ProductModify