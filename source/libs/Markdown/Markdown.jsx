import PropTypes from 'prop-types'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism'

export default function Markdown({ text, language }) {
    return (
        <ReactMarkdown
            // eslint-disable-next-line react/no-children-prop
            children={text}
            components={{
                code({ inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className ?? '')

                    return (!inline && language) || (!inline && match) ? (
                        <SyntaxHighlighter
                            {...props}
                            // eslint-disable-next-line react/no-children-prop
                            children={String(children).replace(/\n$/, '')}
                            style={dracula}
                            language={language ?? match[1]}
                            PreTag="div"
                        />
                    ) : (
                        <code {...props} className={className}>
                            {children}
                        </code>
                    )
                },
                img({ className, src, alt, ...props }) {
                    return (
                        <img {...props} className={className + ' rounded-4'} src={src} alt={alt} />
                    )
                }
            }}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeSlug, rehypeAutolinkHeadings]}
        />
    )
}
Markdown.propTypes = {
    text: PropTypes.string.isRequired,
    language: PropTypes.string
}
