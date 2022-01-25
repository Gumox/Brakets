import RepairHeader from '../components/RepairHeader'

export default function return_unregistered() {
    return(
        <div>
            <RepairHeader />
            <p>미등록 반송<hr></hr></p>
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