import React from 'react'
import Gists from './Gists'

const GistsList = (props) => {
  return (
    <ul>
      {props.lists.map((element) => {
        return <Gists key= {element.id} id={element.id} url={element.owner.avatar_url} files={element.files}/>
      })}
    </ul>
  )
}

export default GistsList