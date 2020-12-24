import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

const SearchBox = ({history}) => {
    const [keyword, setKeyword] = useState('')

    const submitHandler=(e)=>{
        e.preventDefault()
        if (keyword.trim()){
            history.push(`/search/${keyword}`)
        }
        else{
            history.push('/')
        }
    }
    return (
        <div>
            <Form onSubmit={submitHandler} inline>
                <Form.Control
                    type='text'
                    name='q'
                    onChange={(e) => { setKeyword(e.target.value) }}
                    placeholder="Search"
                    className=''
                ></Form.Control>
                <Button type='submit' className='p-2'>
                    Search
                </Button>
            </Form>
        </div>
    )
}

export default SearchBox
