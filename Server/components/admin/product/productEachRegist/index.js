import React ,{useEffect,useState,useCallback} from "react";
import styled from "styled-components";
import COLOR from "../../../../constants/color";
import Router, { useRouter } from "next/router";
import axios from "axios";
import image from "../../../../public/icons/OK_image.png"
const ProductEachRegist = ({infos,brands,user}) =>{
    const router = useRouter();

    const [brandId,setBrandId] =useState(null)

    const [categorys,setCategorys] = useState([])
    const [seasons,setSeasons] = useState([])
    const [styles,setStyles] = useState([])

    
    const [seasonSelected,setSeasonSelected] = useState()
    const [categorySelected,setCategorySelected] = useState()
    const [styleSelected,setStyleSelected] = useState()

    const [productBarcode,setProductBarcode] =useState(null)
    const [tagPrice,setTagPrice] =useState(null)
    const [orgPrice,setOrgPrice] =useState(null)

    const [color,setColor] =useState(null)
    const [degree,setDegree] =useState(null)
    const [size,setSize] =useState(null)

    const [productName,setProductName] =useState(null)
    

    const [useURL,setUseURL] =useState(true)
    const [imgURL,setImgURL] =useState(null)

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
        return(String(name).replace(/_/g," "))
        
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

    const registProduct = async() =>{
        if(seasons.length > 0 && categorys.length > 0 && styles.length > 0){
            if(!productBarcode){
                alert('상품 바코드를 등록해 주세요')
            }else if(!(String(productName).replace(/_/g,"").length > 0)){
                alert('상품 명을 입력해 주세요')
            }else if(!tagPrice>0){
                alert('판매가를 입력해 주세요')
            }else if(!orgPrice>0){
                alert('원가를 입력해 주세요')
            }else if(!(String(color).replace(/_/g,"").length > 0)){
                alert('색상을 입력해 주세요')
            }else if(!(String(degree).replace(/_/g,"").length > 0)){ /// ?
                alert('차수를 입력해 주세요')
            }else if(!(String(size).replace(/_/g,"").length > 0)){
                alert('사이즈를 입력해 주세요')
            }else if(useURL&&!(String(imgURL).replace(/_/g,"").length > 0)){
                alert('상품 이미지를 입력해 주세요')
            }else if(!useURL&&!imgBase64){
                alert('상품 이미지를 등록해 주세요')
            }else{
                const formData = new FormData();
                formData.append('companyName', infos[0].headquarter_name)
                formData.append('brandName',_.find(brands,{"brand_id":Number(brandId)}).brand_name)
                formData.append('barcode', productBarcode)
                formData.append('tagPrice', tagPrice)
                formData.append('orgPrice', orgPrice)
                formData.append('brandId', brandId)
                formData.append('seasonId', seasonSelected)
                formData.append('categoryId', categorySelected)
                formData.append('styleId', styleSelected)
                formData.append('color', color)
                formData.append('degree', degree)
                formData.append('size', size)
                formData.append('productName', emptySpace(productName))
                formData.append('useURL', useURL)
                formData.append('imgUrl', imgURL)
                formData.append('imgfiles',imgBase64)
                
                const [result] = await Promise.all([
                    axios
                    .post(`${process.env.API_URL}/product/regist`,formData)
                    .then(({ data }) => data.body), 
                    ])
                alert("새로운 상품이 등록되었습니다.")
                router.push("/admin/productControl")
            }

        }else if(!brandId){
            alert('브랜드를 선택해주세요')
        }else if(!seasons.length){
            alert('등록된 시즌이 없습니다 먼저 시즌을 등록해 주세요')
        }else if(!categorys.length){
            alert('등록된 카테고리가 없습니다 먼저 카테고리를 등록해 주세요')
        }else if(!styles.length){
            alert('등록된 스타일이 없습니다 먼저 스타일을 등록해 주세요')
        }
        
    }
  
    return (
        <Wrapper >
            <InsideWrapper>
           
            
                    
                
                <h2>상품 개별 등록</h2> 
                
                <PrView style={{borderRadius: "10px 10px 0 0 "}}>
                    <NameBox style={{borderRadius: "10px 0 0 0 "}}>
                        상품 바코드
                    </NameBox>

                    <InputBox style={{borderTop:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                        <InputLine value={productBarcode} style={{flex:1}} onChange={(e)=>{setProductBarcode(e.target.value)}}></InputLine>
                    </InputBox>

                    <NameBox>
                        브랜드 선택
                    </NameBox>

                    <InputBox style={{borderRadius: "0 10px 0 0 ",borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderRight:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                        <InputSelect style={{borderRadius: "0 10px 0 0 ",flex:1,border:0,textAlign:"center",fontSize:"16px"}} onChange={(e)=>{getSeasonAndCategory(e.target.value)}}>
                            <option value={""}>{}</option>
                            {
                                brands.map((item,index)=>(
                                    <option key={index} value={item.brand_id}>{item.brand_name}</option>
                                ))
                            }
                        </InputSelect>
                    </InputBox>
                </PrView>

                <PrView >
                    <NameBox style={{borderTop:`2px solid rgb(244, 244, 244)`}}>
                        상품 명
                    </NameBox>

                    <LongInputBox >
                        <InputLine value={productName} style={{flex:1,}} onChange={(e)=>{setProductName(e.target.value)}}></InputLine>
                    </LongInputBox>
                </PrView>

                <PrView>
                    <NameBox style={{borderTop:`2px solid rgb(244, 244, 244)`}}>
                        판매가
                    </NameBox>

                    <InputBox style={{borderTop:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                        <InputLine value={tagPrice || ""}  style={{flex:1}} 
                            onChange={(e)=>{setTagPrice(onChangePay(e.target.value))}}
                            onFocus={(e)=>{setTagPrice(onFocusPay(e.target.value))}}
                            onBlur={(e)=>{setTagPrice(onBlurPay(e.target.value))}}
                        />
                    </InputBox>

                    <NameBox>
                        원가
                    </NameBox>

                    <InputBox style={{borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderRight:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                        <InputLine value={orgPrice || ""} style={{flex:1}} 
                            onChange={(e)=>{setOrgPrice(onChangePay(e.target.value))}}
                            onFocus={(e)=>{setOrgPrice(onFocusPay(e.target.value))}}
                            onBlur={(e)=>{setOrgPrice(onBlurPay(e.target.value))}}
                        />
                    </InputBox>
                </PrView>

                <PrView>
                    <NameBox style={{borderTop:`2px solid rgb(244, 244, 244)`}}>
                        시즌
                    </NameBox>

                    <InputBox style={{borderTop:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                        <InputSelect value={seasonSelected} style={{flex:1,border:0,textAlign:"center",fontSize:"16px"}} onChange={(e)=>{setSeasonSelected(e.target.value)}}>
                            {
                                seasons.map((item,index)=>(
                                    <option key={index} value={item.value}>{item.season_name}</option>
                                ))
                            }
                        </InputSelect>
                    </InputBox>

                    <NameBox style={{borderTop:`2px solid rgb(244, 244, 244)`}}>
                        카테고리
                    </NameBox>

                    <InputBox style={{borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderRight:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                        <InputSelect value={categorySelected} style={{flex:1,border:0,textAlign:"center",fontSize:"16px"}} onChange={(e)=>{getStyle(e.target.value,brandId)}}>
                            {
                                categorys.map((item,index)=>(
                                    <option key={index} value={item.pcategory_id}>{item.category_name}</option>
                                ))
                            }
                        </InputSelect>
                    </InputBox>
                </PrView>

                <PrView>
                    <NameBox style={{borderTop:`2px solid rgb(244, 244, 244)`}}>
                        스타일 No.
                    </NameBox>

                    <InputBox style={{borderTop:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                        <InputSelect value={styleSelected} style={{flex:1,border:0,textAlign:"center",fontSize:"16px"}} onChange={(e)=>{setStyleSelected(e.target.value)}}>
                            {
                                styles.map((item,index)=>(
                                    <option key={index} value={item.value}>{item.text}</option>
                                ))
                            }
                        </InputSelect>
                    </InputBox>

                    <NameBox style={{borderTop:`2px solid rgb(244, 244, 244)`}}>
                        Color
                    </NameBox>

                    <InputBox style={{borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderRight:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                        <InputLine value={color} style={{flex:1,width:"210px",fontSize:14,textAlign:"center"}} onChange={(e)=>{setColor(e.target.value)}}></InputLine>
                    </InputBox>
                </PrView>
                
                <PrView>
                    <NameBox style={{borderTop:`2px solid rgb(244, 244, 244)`}}>
                        차수
                    </NameBox>

                    <InputBox style={{borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                        <InputLine value={degree} style={{flex:1,width:"150px",fontSize:14,textAlign:"center"}} onChange={(e)=>{setDegree(e.target.value)}}></InputLine>
                    </InputBox>

                    <NameBox style={{borderTop:`2px solid rgb(244, 244, 244)`}}>
                        Size
                    </NameBox>

                    <InputBox style={{borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`,borderRight:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                        <InputLine value={size} style={{flex:1,width:"200px",fontSize:14,textAlign:"center"}} onChange={(e)=>{setSize(e.target.value)}}></InputLine>
                        
                    </InputBox>
                </PrView>


               
                <PrView style={{borderRadius: "0 0 10px 10px"}}>
                    <NameBox style={{height:240,borderRadius: "0 0 0 10px",borderTop:`2px solid rgb(244, 244, 244)`}}>
                        상품 이미지
                    </NameBox>

                    <LongInputBox style={{borderRadius: "0 0 10px 0",height:240,borderTop:0,flexDirection:"column",borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                        
                        <PrView style={{flex:1,alignItems:"center" ,height:"80px"}}>
                            <CheckBox checked={useURL} style={{marginLeft:20}} type="checkbox" onChange={()=>{setUseURL(!useURL)}}/>
                            <div style={{fontSize:13,marginLeft:"20px",display:"flex",alignItems:"center"}}>{"URL 직접 입력"}</div>
                            <input disabled={!useURL} value={imgURL} style={{flex:1,height:"20px",marginLeft:20,marginRight:20,border:0,borderBottom:`2px solid ${disabledLineColor}`}} onChange={(e)=>{setImgURL(e.target.value)}}/>
                        </PrView>
                        
                        <PrView style={{flex:2,alignItems:"center" ,height:"160px",borderTop:`2px solid ${COLOR.LIGHT_GRAY}`}}>

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
                        <RegistButton onClick={()=>{
                            if(brands.length>0){
                                registProduct()
                            }else{
                                alert('등록된 브랜드가 없습니다 먼저 브랜드를 등록해 주세요')
                            }
                        }}>
                            등록
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
    width: 60px;
    height : 40px;
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
    font-size: 14px;
    display:flex;
    align-items:center;
    justify-content:space-around;

`;
const NameBox  = styled.div`
    height : 60px;
    width:145px;
    background-color:${COLOR.LIGHT_GRAY};
    font-size: 14px;
    display:flex;
    justify-content:center;
    align-items:center;
`;
const InputBox  = styled.div`
    border-left: 2px solid ${COLOR.LIGHT_GRAY};
    height : 60px;
    width:360px;
    display:flex;
    justyfiy-content:center;
    ailgn-items:center;
`;
const InputBoxTr  = styled.div`
    height : 60px;
    background-color:${COLOR.WHITE};
    font-size: 14px;
    display:flex;
    justify-content:center;
    width:210px;
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
    border: 0px;
    margin: 2px;
    padding-left:10px;
    font-size:14px;
    display:flex;
    &:focus { 
        outline: none !important;
        border-color: #719ECE;
        box-shadow: 0 0 10px #719ECE;
    }
`;
const InputSelect  = styled.select`
    border: 0px;
    margin: 2px;
    font-size:14px;
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
    object-fit: contain;
    background-color:${COLOR.WHITE};
    padding:10px;
    margin-left: 25px;
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



export default ProductEachRegist