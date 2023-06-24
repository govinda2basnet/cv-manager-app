import {Menu,Layout} from "antd";

import { PlusCircleTwoTone,MenuUnfoldOutlined,SnippetsOutlined,AppstoreOutlined, FileDoneOutlined,AccountBookOutlined,BookOutlined, UserOutlined, TeamOutlined, IdcardFilled, IdcardOutlined} from "@ant-design/icons"
import { useNavigate } from "react-router-dom";

function SideMenu() {
    const navigate = useNavigate();
    return(
        <>
        
            <Menu 
            
            style={{backgroundColor:'white', height:"100%"}}
            onClick={(item) => {
                //item.key
                navigate(item.key);
                

            }}
            items={[
                {
                    label:"Dashboard",
                    icon: <AppstoreOutlined/>,
                    key: "/dashboard",

                },

                {
                    label:"Applicants",
                    icon: <UserOutlined/>,
                    key: "/applicant",

                },
                {
                    label:"Interviewer",
                    icon: <TeamOutlined/>,
                    key: "/interviewer",
                },
                {
                    label:"Schedule Interview",
                    icon: <PlusCircleTwoTone/>,
                    key: "/scheduleinterview",
                },
                {
                    label:"Offer Letter",
                    icon: <MenuUnfoldOutlined/>,
                    key: "/offerletter",
                },
                {
                    label:"Assessment Test",
                    icon: <FileDoneOutlined/>,
                    key: "/assessmenttest",
                }, 
                {
                    label:"Letter Templete",
                    icon: <SnippetsOutlined />,
                    key: "/lettertemplete",
                }, 
                {
                    label:"Position",
                    icon: <IdcardOutlined />,
                    key: "/position",
                }, 
            ]}
            />

            
        </>
    )
}
export default SideMenu 