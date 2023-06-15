import ReactMarkdown from 'react-markdown'
import remarkBreaks from 'remark-breaks'
import cn from 'clsx'

interface FormatMarkdownProps {
	content: string
	size?: 'sm' | 'base' | 'lg' | 'xl' | '2xl'
	className?: string
}

const FormatMarkdown = ({ content, className, size }: FormatMarkdownProps) => (
	<ReactMarkdown
		linkTarget='_blank'
		remarkPlugins={[remarkBreaks]}
		className={cn('prose max-w-full overflow-hidden', size && `prose-${size}`, className)}
	>
		{content}
	</ReactMarkdown>
)

export default FormatMarkdown
