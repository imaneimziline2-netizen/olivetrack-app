function Card({ title, subtitle, extra, children, className = "" }) {
    return (
        <div className={`bg-white rounded-2xl border border-lime-100 shadow-sm shadow-lime-100/50 p-6 ${className}`}>
            {(title || extra) && (
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-lime-50">
                    <div>
                        {title && <h3 className="text-lg font-bold text-lime-900">{title}</h3>}
                        {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
                    </div>
                    {extra && <div>{extra}</div>}
                </div>
            )}
            {children}
        </div>
    );
}

export default Card;
