import { Col, Row } from 'antd'
import React from 'react'
import 'antd/dist/antd.css';

const SavedRepoList = () => {
    let repoList = JSON.parse(localStorage.getItem("repoList"))
    console.log(repoList)
    if (repoList === null) {
        return <p style={{color:"#e33776"}}>No repositories found as of now :{"("} .<br/>
           If your're logged in Either save or First Log-in ofcourse<br/>
           and save the repository which you want to! and Click me again! to see the saved list.
        </p>
    }
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-evenly',
                // padding: '10px 10px',
                alignItems: 'center',
                flexFlow: 'column',
                width: '100%'

            }}
        >
            {
                repoList.map(el => <div style={{ display: 'flex', 
                justifyContent: 'space-evenly', backgroundColor:"#fc9cff",
                borderBottom: '1px solid gray', width: '100%', padding: '10px 10px',  }}>
                    <span style={{width: '25%', textAlign: 'left'}}>{el.id}</span>
                    <span style={{width: '25%', textAlign: 'left'}}>{el.full_name}</span>
                    <span style={{width: '25%', textAlign: 'left'}}>{el.description}</span>
                    <span style={{width: '25%', textAlign: 'left'}}>{el.visibility}</span>
                    <span style={{width: '25%', textAlign: 'left'}}><a href={el.html_url}>{el.html_url}</a></span>
                </div>)
            }
        
        </div>
    )
}

export default SavedRepoList


