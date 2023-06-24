import { Image, Typography, Badge, Space} from "antd";
import { BellFilled, MailOutlined, LoginOutlined, LogoutOutlined} from "@ant-design/icons"
import { UserAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
function AppHeader() {
  const {user, logOut} = UserAuth()

  const handleSignOut = async ()=>{
    try{
      await logOut()
      localStorage.clear('token')
    }
    catch(error){
      console.log(error)
    }
  }


      return(
        <div className="AppHeader" >
            <Image
        width={40}
        src="http://pngimg.com/uploads/cv/cv_PNG1.png"
      ></Image>
      <Typography.Title style={{fontFamily:"serif"}}>CV Manager</Typography.Title>
      <Space>
        <Badge count={10} dot>
          <MailOutlined
            style={{ fontSize: 24 }}
          />
        </Badge>
        <Badge count={20} dot>
          <BellFilled
            style={{ fontSize: 24 }}
          />
        </Badge>
        <Badge>
          {(user ?
          <LogoutOutlined
            style={{ fontSize: 24 }}
            onClick={handleSignOut}
          />:<Link to="/signin"><LoginOutlined  style={{ fontSize: 24 }}  /> </Link>)}
          
        </Badge>
      </Space>

        </div>
    )
}
export default AppHeader