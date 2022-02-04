import RepairHeader from '../components/RepairHeader'
export default function Settlement()  {
    return(
    <div>
        <RepairHeader />
        <p>수선비 정산<hr></hr></p>
        <style jsx>{
            `
            p {
                padding : 0px 100px 0px 100px;
            }
            `
        }
        </style>
    </div>
    )
}