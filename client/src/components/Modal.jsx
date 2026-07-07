const Modal = ({ children, isOpen=null, onClose=null }) => {
    if (!isOpen) return null;

    return (
    <>
        <div 
        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6"
        onClick={onClose}
        >
            <div className="absolute top-100 right-185 bg-yellow-400 text-black text-lg font-black px-6 py-1 border-4 border-black -rotate-15 shadow-md z-10 animate-[popIn_0.5s_backwards]">
            CONFIDENTIAL
            </div>
        <div 
            className="bg-white border-8 border-black shadow-[12px_12px_0_#000] relative max-w-lg w-full animate-[popIn_0.5s_forwards] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
        >
            
            <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black text-white border-4 border-black px-4 py-2 font-black text-xl hover:bg-red-600 hover:border-red-600 active:scale-95 transition-all"
            >
            ✕
            </button>

            <div className="p-10 pt-12">
            {children}
            </div>

            <div className="bg-black text-white text-center py-3 text-sm font-mono tracking-widest border-t-4 border-black">
            EST. 2026 • NO BOOMERS ALLOWED
            </div>
        </div>
        </div>

        <style jsx global>{`
        @keyframes popIn {
            from {
            opacity: 0;
            transform: translateY(40px) scale(0.92);
            }
            to {
            opacity: 1;
            transform: translateY(0) scale(1);
            }
        }
        `}</style>
    </>);
};

export default Modal;