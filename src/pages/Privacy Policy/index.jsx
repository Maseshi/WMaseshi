import React, { Component } from 'react'

import Welcome from './Welcome'
import Content from './Content'

import './style.css'

export default class PP extends Component {
    render() {
        document.title = 'นโยบายความเป็นส่วนตัว | Maseshi'
        return (
            <>
                <Welcome />
                <Content />
            </>
        )
    }
}
