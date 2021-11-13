import React,  { useState, useEffect } from 'react';
import styled from 'styled-components';
import Article from './Article';
import EditForm from './EditForm';
import axiosWithAuth from "../utils/axiosWithAuth";
import axios from 'axios';

const View = (props) => {
    const [articles, setArticles] = useState([]);
    const [editing, setEditing] = useState(false);
    const [editId, setEditId] = useState();
    
    
    


        //no reason to have it in another file honestly, dont feel bad about it myself
        //seems better than calling 5 different methods on something just to mount data.
        //granted i need to learn more about using hooks inside of hooks and at the same time getting data from functions

    
        useEffect(() => {
    
            axiosWithAuth()
              .get(`http://localhost:5000/api/articles`)
              .then((res) => {
                setArticles(res.data)
                console.log(res.data)
            })
              .catch((err) => {
                console.log(err)
            });
    
        }, []);
    
    

    const handleDelete = (id) => {
        const validateStatus = localStorage.getItem('token')
        axios.delete(`http://localhost:5000/api/articles/${id}`,{
            headers: {
              Authorization: validateStatus
            },
            })
            .then(res => {
                console.log(res)
                setArticles(res.data)
            })
            .catch(err => console.log(err))
    }

    const handleEdit = (article) => {
    }

    const handleEditSelect = (id)=> {
        setEditing(true);
        setEditId(id);
    }

    const handleEditCancel = ()=>{
        setEditing(false);
    }

    return(<ComponentContainer>
        <HeaderContainer>View Articles</HeaderContainer>
        <ContentContainer flexDirection="row">
            <ArticleContainer>
                {
                    articles.map(article => {
                        return <ArticleDivider key={article.id}>
                            <Article key={article.id} article={article} handleDelete={handleDelete} handleEditSelect={handleEditSelect}/>
                        </ArticleDivider>
                    })
                }
            </ArticleContainer>
            
            {
                editing && <EditForm editId={editId} handleEdit={handleEdit} handleEditCancel={handleEditCancel}/>
            }
        </ContentContainer>
    </ComponentContainer>);
}

export default View;

//Task List:
//1. Build and import axiosWithAuth module in the utils.
//2. When the component mounts, make an http request that adds all articles to state.
//3. Complete handleDelete method. It should make a request that delete the article with the included id.
//4. Complete handleEdit method. It should make a request that updates the article that matches the included article param.


const Container = styled.div`
    padding: 0.5em;
`
const HeaderContainer = styled.h1`
    border-bottom: solid black 2px;
    padding: 1em;
    margin:0;
    font-size: 1.5em;
    background: black;
    color: white;
`

const ArticleDivider = styled.div`
    border-bottom: 1px solid black;
    padding: 1em;
`

const ComponentContainer = styled.div`
    display:flex;
    width: 80%;
    flex-direction: column;
    justify-content: center;
    
`

const ContentContainer = styled.div`
    display: flex;
    flex-direction: ${props => props.flexDirection};
`

const ArticleContainer = styled.div`
    background: grey;
`;