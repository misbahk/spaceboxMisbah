import React from 'react'
import { GithubOutlined } from '@ant-design/icons';
import { signOut } from '../services/auth';
import { message } from 'antd';
import { useHistory } from 'react-router-dom';

const Navbar = () => {
    let history = useHistory()

    const handleLogout = async () => {
        await signOut();
        message.info('logged out successfully', 3);
        history.push("/login")
    };
    return (
        <div
            style={{
                backgroundColor: 'black',
                display: 'flex',
                justifyContent: 'right',
                padding: '5px 20px',
                alignItems: 'center',
                borderBottom: '2px solid gray',
            }}
        >
            {/* <div
                style={{
                    cursor: 'pointer'
                }}
                onClick={history.push("/")}
            >
                <GithubOutlined onClick={history.push("/")} style={{ fontSize: '50px', color: '#8f0052' }} />
            </div> */}
            <div>
                <button
                    style={{
                        marginLeft: '10px',
                        padding: '8px 13px',
                        backgroundColor: '#8f0052',
                        color: 'white',
                        borderRadius: '5px',
                        border: '1px solid gray',
                        cursor: 'pointer'
                    }}
                    onClick={()=>history.push("/repolist")}>Saved Repo</button>
            </div>
            <div>
                <button
                    style={{
                        marginLeft: '10px',
                        padding: '8px 13px',
                        backgroundColor: '#8f0052',
                        color: 'white',
                        borderRadius: '5px',
                        border: '1px solid gray',
                        cursor: 'pointer'
                    }}
                    onClick={handleLogout}>Logout</button>
            </div>
        </div>
    )
}

export default Navbar