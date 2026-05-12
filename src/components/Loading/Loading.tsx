import { Loader } from "@mantine/core"

interface LoadingProps {
    message?: string
}

const Loading = ({ message = 'Loading...' }: LoadingProps) => {
    return <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}>
        <Loader /><p style={{marginLeft:'10px',fontSize:'20px',fontWeight:'bold'}}>{message}</p></div>

}   

export default Loading