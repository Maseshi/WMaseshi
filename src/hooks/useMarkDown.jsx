import { useState, useEffect } from 'react'
import { Remarkable } from 'remarkable';

export default function useMarkDown(file) {
    const [data, setData] = useState()

    useEffect(() => {
        fetch(file)
        .then(response => response.text())
        .then(text => {
            const markdown = new Remarkable({
                html: true,
                breaks: true
            })
            const html = markdown.render(text)
            
            setData(html);
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return data;
}