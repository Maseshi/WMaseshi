import React, { Component } from 'react'

import Welcome from './Welcome'
import Content from './Content'

import './style.css'

export default class ToS extends Component {
    render() {
        document.title = 'เงื่อนไขการให้บริการ | Maseshi'
        
        return (
            <>
                <Welcome />
                <Content />
            </>
        )
    }
}
