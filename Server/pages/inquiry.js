import RepairHeader from '../components/RepairHeader'

export default function inquiry() {
    return(
        <div>
            <RepairHeader />
            <p><h3>조회</h3><hr></hr>
            회사 설정 : 
                <select name="company" >
                    <option value="com">회사1</option>
                    <option value="comp">회사2</option>
                    <option value="compa">회사3</option>
                    <option value="compan">회사4</option> 
                </select>
            서비스 카드 번호 : 
                <input></input> 
                <h6>⚠️직접 입력 후 엔터를 누르거나 바코드 리더기를 이용해주세요</h6>
            <br></br><br></br>
            <hr></hr>

            조회 조건
            <br></br><br></br>
                수선처 : 
                <select name="soosun" >
                    <option value="soo">수선처1</option>
                    <option value="soos">수선처2</option>
                    <option value="soosu">수선처3</option>
                </select>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                브랜드 : 
                <select name="brand" >
                    <option value="br">브랜드1</option>
                    <option value="bra">브랜드2</option>
                    <option value="bran">브랜드3</option>
                </select>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                날짜 기준 : 
                <select name="date_standard" >
                    <option value="d">매장접수일</option>
                    <option value="da">수선처접수일</option>
                    <option value="dat">수선처발송일</option>
                </select>


            </p>

            <style jsx>{
                `
                p {
                    padding : 0px 100px 0px 100px;
                }

                h6 {
                    color : red;
                }
                `
            }
            </style>
        </div>
    )
}