import {Menu,Layout} from "antd";

import { PlusCircleTwoTone,MenuUnfoldOutlined,FileUnknownOutlined,AppstoreOutlined, FileDoneOutlined,AccountBookOutlined,BookOutlined, UserOutlined, TeamOutlined} from "@ant-design/icons"
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
                    icon: <UserOutlined/>,
                    key: "/dashboard",

                },

                {
                    label:"Applicants",
                    icon: <AppstoreOutlined/>,
                    key: "/applicant",

                },
                // {
                //     label:"Applicant With Experience",
                //     icon: <AccountBookOutlined/>,
                //     key: "/experiencedApplicant",
                // },
                // {
                //     label:"Experience",
                //     icon: <BookOutlined/>,
                //     key: "/Experience",
                // },
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
            ]}
            />

            
        </>
    )
}
export default SideMenu