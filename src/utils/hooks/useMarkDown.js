import { useState, useEffect } from 'react'
import MarkdownIt from 'markdown-it'
import HighlightJs from 'highlight.js'

export default function useMarkDown(file) {
    const [data, setData] = useState()

    useEffect(() => {
        const getData = async () => {
            const markdown = new MarkdownIt({
                html: true,
                xhtmlOut: true,
                breaks: true,
                linkify: true,
                highlight: function (str, lang) {
                    if (lang && HighlightJs.getLanguage(lang)) {
                        try {
                            return HighlightJs.highlight(str, { language: lang }).value
                        } catch (__) { }
                    }

                    return ''
                }
            })

            markdown.renderer.rules.table_open = (tokens, idx) => {
                return '<table class="table">'
            }

            markdown.renderer.rules.blockquote_open = (tokens, idx) => {
                return '<blockquote class="blockquote">'
            }

            const response = await fetch(file)

            if (response.ok) {
                const text = await response.text()
                const xmlString = markdown.render(text)

                return setData(xmlString)
            } else {
                const xmlString = markdown.render(file)

                return setData(xmlString)
            }
        }
        getData()
    }, [file])

    return data
}