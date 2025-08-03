import './ContentBox.css'

interface ContentBoxProps {
  title?: string
  children: React.ReactNode
  className?: string
}

export default function ContentBox({ title, children, className = '' }: ContentBoxProps) {
  return (
    <div className={`content-box ${className}`}>
      {title && <h3 className="content-box-title">{title}</h3>}
      <div className="content-box-body">
        {children}
      </div>
    </div>
  )
}
